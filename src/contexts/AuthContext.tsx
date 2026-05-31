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
  const skipNextRoleFetch = useRef(false);

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

  // Refresh roles in the background WITHOUT ever downgrading the user on a
  // transient empty/failed fetch. This prevents the owner from being kicked
  // out when a token refresh or slow network returns no rows momentarily.
  const refreshRolesSafely = async (userId: string) => {
    const fresh = await fetchRoles(userId);
    if (fresh.length > 0) {
      setRoles(fresh);
      writeCachedRoles(userId, fresh);
    }
  };

  useEffect(() => {
    let mounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, sess) => {
      if (!mounted) return;

      if (event === 'SIGNED_OUT') {
        clearCachedRoles();
        setSession(null);
        setUser(null);
        setRoles([]);
        setLoading(false);
        return;
      }

      if (event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        setSession(sess);
        setUser(sess?.user ?? null);

        if (sess?.user) {
          // Use cached roles immediately so we never bounce the user while
          // the network request is in flight.
          const cached = readCachedRoles(sess.user.id);
          if (cached.length > 0) setRoles(cached);
          setLoading(false);

          if (skipNextRoleFetch.current) {
            skipNextRoleFetch.current = false;
            return;
          }
          // Fire-and-forget background refresh (no await inside the callback).
          setTimeout(() => {
            if (mounted) void refreshRolesSafely(sess.user.id);
          }, 0);
        } else {
          setRoles([]);
          setLoading(false);
        }
      }
    });

    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      if (!mounted) return;
      // INITIAL_SESSION already handles state; only resolve loading if there
      // is genuinely no session so the login screen can show.
      if (!sess) setLoading(false);
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
        setRoles(userRoles);
        if (data.session.user?.id) writeCachedRoles(data.session.user.id, userRoles);
        skipNextRoleFetch.current = true;
        
        const { error: setErr } = await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });
        if (setErr) return { error: 'تعذر حفظ الجلسة، حاول مرة أخرى' };
      }
      return {};
    } catch {
      return { error: 'خطأ في الاتصال بالخادم' };
    }
  };

  const logout = async () => {
    clearCachedRoles();
    setRoles([]);
    setSession(null);
    setUser(null);
    await supabase.auth.signOut();
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
