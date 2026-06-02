import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Session, User } from '@supabase/supabase-js';

type AppRole = 'owner' | 'admin' | 'courier' | 'office';

interface AuthState {
  session: Session | null;
  user: User | null;
  roles: AppRole[];
  loading: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  isCourier: boolean;
  isOffice: boolean;
  isOwnerOrAdmin: boolean;
  login: (password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

const ROLES_CACHE_KEY = 'app_roles_cache';

function readCachedRoles(userId: string): AppRole[] {
  try {
    const raw = localStorage.getItem(ROLES_CACHE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { userId: string; roles: AppRole[] };
    if (parsed.userId === userId && Array.isArray(parsed.roles)) return parsed.roles;
    return [];
  } catch {
    return [];
  }
}

function writeCachedRoles(userId: string, roles: AppRole[]) {
  try {
    localStorage.setItem(ROLES_CACHE_KEY, JSON.stringify({ userId, roles }));
  } catch {
    /* ignore storage errors */
  }
}

function clearCachedRoles() {
  try {
    localStorage.removeItem(ROLES_CACHE_KEY);
  } catch {
    /* ignore */
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);
  const manualLogoutRef = useRef(false);
  const authReadyRef = useRef(false);
  const validatedUserIdRef = useRef<string | null>(null);
  const validationRunRef = useRef(0);

  const fetchRoles = async (userId: string): Promise<AppRole[]> => {
    try {
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);
      return (data?.map(r => r.role as AppRole)) || [];
    } catch {
      return [];
    }
  };

  // Refresh roles from the DB in the background WITHOUT ever downgrading the
  // user on a transient empty/failed fetch. This prevents the owner from being
  // kicked out (or losing access to sections) when a token refresh or slow
  // network returns no rows momentarily.
  const refreshRolesSafely = async (userId: string) => {
    const fresh = await fetchRoles(userId);
    if (fresh.length > 0) {
      setRoles(fresh);
      writeCachedRoles(userId, fresh);
    }
  };

  useEffect(() => {
    let mounted = true;

    const validateSession = (sess: Session, runId: number, attempt = 0) => {
      setTimeout(() => {
        if (!mounted || validationRunRef.current !== runId) return;
        void supabase.auth.getUser().then(({ data: { user: validatedUser } }) => {
          if (!mounted || validationRunRef.current !== runId) return;

          if (validatedUser?.id === sess.user.id) {
            authReadyRef.current = true;
            validatedUserIdRef.current = sess.user.id;
            setLoading(false);
            void refreshRolesSafely(sess.user.id);
            return;
          }

          if (attempt < 4) {
            validateSession(sess, runId, attempt + 1);
            return;
          }

          applySession(null);
        }).catch(() => {
          if (!mounted || validationRunRef.current !== runId) return;
          if (attempt < 4) validateSession(sess, runId, attempt + 1);
          else applySession(null);
        });
      }, attempt === 0 ? 0 : 300);
    };

    // Apply a session coming from Supabase's native (localStorage) persistence.
    // We wait until getUser() validates the restored token before pages mount,
    // so authenticated tables do not briefly query as anon and overwrite data.
    const applySession = (sess: Session | null) => {
      if (!mounted) return;

      if (sess?.user) {
        setSession(sess);
        setUser(sess.user);
        const cached = readCachedRoles(sess.user.id);
        if (cached.length > 0) setRoles(cached);
        if (authReadyRef.current && validatedUserIdRef.current === sess.user.id) {
          setLoading(false);
          void refreshRolesSafely(sess.user.id);
          return;
        }
        setLoading(true);
        const runId = ++validationRunRef.current;
        validateSession(sess, runId);
        return;
      }

      // No session. Only clear app state on a genuine sign-out.
      authReadyRef.current = false;
      validatedUserIdRef.current = null;
      validationRunRef.current += 1;
      setSession(null);
      setUser(null);
      setRoles([]);
      clearCachedRoles();
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, sess) => {
      if (!mounted) return;

      if (event === 'SIGNED_OUT') {
        // Supabase can emit a transient SIGNED_OUT while restoring/refreshing
        // storage on slower desktop browsers. Only clear state on an explicit
        // logout; otherwise confirm storage is truly empty first.
        if (manualLogoutRef.current) {
          applySession(null);
          return;
        }
        setTimeout(() => {
          if (!mounted) return;
          void supabase.auth.getSession().then(({ data: { session: stored } }) => {
            if (!mounted) return;
            if (stored) applySession(stored);
            else applySession(null);
          });
        }, 250);
        return;
      }

      // SIGNED_IN / TOKEN_REFRESHED / INITIAL_SESSION etc.
      if (sess) {
        applySession(sess);
      } else if (event === 'INITIAL_SESSION') {
        applySession(null);
      }
    });

    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      if (!mounted) return;
      applySession(sess);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (password: string): Promise<{ error?: string }> => {
    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/auth-login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({ password }),
        }
      );
      const data = await res.json();
      if (!res.ok) return { error: data.error || 'خطأ في تسجيل الدخول' };

      if (data.session) {
        const userRoles = (data.roles || []) as AppRole[];

        const { data: savedSession, error: setErr } = await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });
        if (setErr) return { error: 'تعذر حفظ الجلسة، حاول مرة أخرى' };

        const nextSession = savedSession.session ?? data.session;
        if (nextSession.user?.id) writeCachedRoles(nextSession.user.id, userRoles);
        setRoles(userRoles);
        setSession(nextSession);
        setUser(nextSession.user ?? null);
        setLoading(false);
      }
      return {};
    } catch {
      return { error: 'خطأ في الاتصال بالخادم' };
    }
  };

  const logout = async () => {
    manualLogoutRef.current = true;
    clearCachedRoles();
    setRoles([]);
    setSession(null);
    setUser(null);
    await supabase.auth.signOut();
    setTimeout(() => {
      manualLogoutRef.current = false;
    }, 500);
  };

  const isOwner = roles.includes('owner');
  const isAdmin = roles.includes('admin');
  const isCourier = roles.includes('courier');
  const isOffice = roles.includes('office');
  const isOwnerOrAdmin = isOwner || isAdmin;

  return (
    <AuthContext.Provider value={{
      session, user, roles, loading,
      isOwner, isAdmin, isCourier, isOffice, isOwnerOrAdmin,
      login, logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
