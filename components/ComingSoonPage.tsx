'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Clock3, Mail, Rocket, ShieldAlert } from 'lucide-react';

const LAUNCH_DATE = new Date('2026-06-15T09:00:00Z').getTime();

function getCountdownParts(targetTime: number, currentTime: number) {
  const diff = Math.max(0, targetTime - currentTime);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const countdown = useMemo(() => getCountdownParts(LAUNCH_DATE, now), [now]);
  const hasLaunched = LAUNCH_DATE <= now;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) return;
    setIsSubscribed(true);
    setEmail('');
  }

  return (
    <main className="min-h-screen overflow-hidden bg-linear-to-b from-slate-50 via-white to-sky-50 text-slate-900 transition-colors dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-slate-100">
      <section className="relative mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-72 w-72 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-500/10" />
        <div className="pointer-events-none absolute bottom-0 right-6 h-40 w-40 rounded-full bg-cyan-200/20 blur-3xl dark:bg-cyan-500/10" />

        <div className="relative w-full max-w-2xl rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/80 sm:p-10 fade-in-up">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20 float-soft">
            <Rocket size={28} aria-hidden="true" />
          </div>

          <div className="text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300">
              <ShieldAlert size={14} aria-hidden="true" />
              Coming soon
            </div>

            <h1 id="coming-soon-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
              This page is coming soon 🚀
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
              We&apos;re working hard to bring this feature to you. Stay tuned!
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Launch countdown">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Minutes', value: countdown.minutes },
              { label: 'Seconds', value: countdown.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-black/10 bg-slate-50 px-3 py-4 text-center dark:border-white/10 dark:bg-slate-800"
              >
                <p className="text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
                  {String(item.value).padStart(2, '0')}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Clock3 size={14} aria-hidden="true" />
            <span>{hasLaunched ? 'Launching now' : 'Preparing the release'} </span>
            <span className="inline-flex items-center gap-1" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 pulse-dot" />
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 pulse-dot delay-150" />
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 pulse-dot delay-300" />
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
            aria-label="Email notification signup"
          >
            <label htmlFor="coming-soon-email" className="sr-only">
              Email address
            </label>
            <div className="flex flex-1 items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-slate-950">
              <Mail size={16} className="shrink-0 text-slate-400" aria-hidden="true" />
              <input
                id="coming-soon-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Get notified by email"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                aria-label="Email address"
                autoComplete="email"
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-blue-600 px-5 text-sm font-medium text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              aria-label="Notify me"
            >
              Notify me
            </button>
          </form>

          {isSubscribed && (
            <p className="mt-3 text-center text-xs text-emerald-600 dark:text-emerald-400" role="status" aria-live="polite">
              Thanks. We&apos;ll let you know when this launches.
            </p>
          )}

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-black/10 px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 dark:border-white/10 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label="Back to homepage"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
