import type { GlossaryFlag } from "@/lib/ai/glossary";

export function Spinner({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <span
      className={`${className} inline-block rounded-full border-2 border-current border-t-transparent animate-spin`}
      aria-hidden="true"
    />
  );
}

export function ErrorBox({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="mt-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30 px-4 py-3 text-sm text-rose-700 dark:text-rose-300"
    >
      {message}
    </div>
  );
}

export function FlagList({ flags, showOk }: { flags: GlossaryFlag[]; showOk?: boolean }) {
  if (flags.length === 0) {
    return showOk ? (
      <p className="mt-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
        ✓ No meaning-distorting substitution of Shar&apos;i terms detected
      </p>
    ) : null;
  }
  return (
    <ul className="mt-3 space-y-2">
      {flags.map((f) => (
        <li
          key={f.term}
          className="rounded-lg border-s-4 border-rose-500 bg-rose-50 dark:bg-rose-950/30 px-3 py-2 text-xs text-slate-700 dark:text-slate-300"
        >
          <span className="font-semibold">
            <span dir="rtl">{f.term}</span> → replaced with generic word &ldquo;{f.flaggedWord}&rdquo;
          </span>
          <br />
          <span className="opacity-80">
            Expected: {f.expected}. {f.note}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Disclaimer({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 text-center text-xs leading-relaxed text-slate-400 dark:text-slate-500">
      {children}
    </p>
  );
}

export const inputClass =
  "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 px-4 py-3 text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-transparent transition";

export const selectClass =
  "rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/60";

export const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-600/20 transition";

export const cardClass =
  "rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50";
