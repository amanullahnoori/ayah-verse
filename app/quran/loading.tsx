export default function QuranLoading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 md:pt-24 pb-24 md:pb-8 animate-pulse">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-8 w-56 bg-slate-200 dark:bg-slate-800 rounded-lg mb-2" />
          <div className="h-5 w-72 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        </div>

        {/* Search bar skeleton */}
        <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl mb-6" />

        {/* Filter skeleton */}
        <div className="flex gap-2 mb-6">
          <div className="h-9 w-16 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-9 w-20 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-9 w-20 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        </div>

        {/* Surah cards skeleton */}
        <div className="space-y-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50"
            >
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-xl shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-1.5" />
                <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
              <div className="h-5 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
