import { Card, CardContent } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import logo from '@/assets/logo.png';

export default function SystemLocked() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Decorative orbs */}
      <div className="absolute top-[-15%] right-[-10%] w-[520px] h-[520px] rounded-full bg-destructive/25 blur-[130px]" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[460px] h-[460px] rounded-full bg-primary/25 blur-[120px]" />

      <Card className="w-full max-w-md glass-effect border-destructive/30 shadow-glow relative z-10 overflow-hidden">
        <div className="h-1 w-full bg-destructive" />
        <CardContent className="pt-10 pb-8 px-6 text-center">
          <div className="relative mx-auto w-24 h-24 mb-6">
            <div className="absolute inset-0 rounded-2xl bg-destructive/40 blur-2xl opacity-70 animate-pulse" />
            <img
              src={logo}
              alt="امريكا اكسبريس"
              className="relative h-24 w-24 rounded-2xl object-contain opacity-50 grayscale"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Lock className="h-10 w-10 text-destructive drop-shadow-lg" />
            </div>
          </div>

          <h1 className="text-3xl font-display font-extrabold text-foreground mb-4">
            صبرنا كتير ومفيش تقدير
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            تم إيقاف السيستم بالكامل.
            <br />
            لفتح النسخة برجاء التواصل عبر واتساب
          </p>

          <a
            href="https://wa.me/201061067966"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-primary text-primary-foreground font-display font-bold text-lg tracking-widest shadow-glow hover:opacity-90 transition-opacity"
            dir="ltr"
          >
            01061067966
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
