import { Lock } from 'lucide-react';
import { SYSTEM_LOCK_MESSAGE } from '@/config/systemLock';

export default function SystemLocked() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6" dir="rtl">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Lock className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-foreground">{SYSTEM_LOCK_MESSAGE}</h1>
        <p className="text-sm text-muted-foreground">
          تم إيقاف الدخول إلى النظام مؤقتاً. برجاء التواصل مع الإدارة.
        </p>
      </div>
    </div>
  );
}
