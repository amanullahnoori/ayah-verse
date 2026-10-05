export default function SurahDetailLoading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 md:pt-24 pb-24 md:pb-24 animate-pulse">
      <div className="max-w-3xl mx-auto px-4">
        {/* Back button skeleton */}
        <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded mb-6" />

        {/* Surah header skeleton */}
        <div className="rounded-3xl bg-gradient-to-br from-emerald-600/30 to-teal-700/30 dark:from-emerald-800/30 dark:to-teal-900/30 p-8 mb-8">
          <div className="text-center space-y-3">
            <div className="h-10 w-48 bg-white/20 rounded-lg mx-auto" />
            <div className="h-7 w-36 bg-white/20 rounded-lg mx-auto" />
            <div className="h-5 w-28 bg-white/20 rounded-lg mx-auto" />
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="h-4 w-16 bg-white/20 rounded" />
              <div className="h-4 w-20 bg-white/20 rounded" />
              <div className="h-4 w-16 bg-white/20 rounded" />
            </div>
          </div>
        </div>

        {/* Toolbar skeleton */}
        <div className="flex items-center justify-between gap-2 mb-6 py-2.5">
          <div className="h-8 w-28 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-8 w-20 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        </div>

        {/* Verses skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="p-5 md:p-6 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-xl" />
                <div className="flex gap-1">
                  <div className="w-9 h-9 bg-slate-200 dark:bg-slate-700 rounded-xl" />
                  <div className="w-9 h-9 bg-slate-200 dark:bg-slate-700 rounded-xl" />
                </div>
              </div>
              {/* Arabic text */}
              <div className="h-8 w-full bg-slate-200 dark:bg-slate-700 rounded-lg mb-4" />
              {/* Transliteration */}
              <div className="h-5 w-4/5 bg-slate-200 dark:bg-slate-700 rounded mb-3" />
              {/* Translation */}
              <div className="space-y-1.5">
                <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
