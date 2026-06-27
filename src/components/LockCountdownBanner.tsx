import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

const DEADLINE_KEY = 'system_lock_deadline';
const DURATION_MS = 3 * 60 * 60 * 1000; // 3 hours

function getDeadline(): number {
  try {
    const raw = localStorage.getItem(DEADLINE_KEY);
    if (raw) {
      const parsed = Number(raw);
      if (!Number.isNaN(parsed) && parsed > Date.now()) return parsed;
    }
  } catch {
    /* ignore */
  }
  const deadline = Date.now() + DURATION_MS;
  try {
    localStorage.setItem(DEADLINE_KEY, String(deadline));
  } catch {
    /* ignore */
  }
  return deadline;
}

function format(ms: number): string {
  if (ms < 0) ms = 0;
  const totalSeconds = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const s = String(totalSeconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default function LockCountdownBanner() {
  const [deadline] = useState<number>(getDeadline);
  const [remaining, setRemaining] = useState<number>(deadline - Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(deadline - Date.now());
    }, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  return (
    <div className="flex items-center justify-center gap-2 bg-destructive/10 border-b border-destructive/30 px-3 py-2 text-center">
      <AlertTriangle className="h-4 w-4 text-destructive shrink-0 animate-pulse" />
      <p className="text-xs sm:text-sm font-medium text-destructive">
        سيتم غلق السيستم في حال عدم التواصل مع الإدارة خلال
        <span className="mx-1 font-mono-neon font-bold tabular-nums" dir="ltr">
          {format(remaining)}
        </span>
      </p>
    </div>
  );
}
