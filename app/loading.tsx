export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 animate-pulse">
      {/* Hero skeleton */}
      <section className="pt-24 md:pt-32 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-200 dark:bg-slate-800 mx-auto mb-6" />
          <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg mx-auto mb-4" />
          <div className="h-5 w-96 max-w-full bg-slate-200 dark:bg-slate-800 rounded-lg mx-auto mb-8" />
          <div className="h-12 w-40 bg-slate-200 dark:bg-slate-800 rounded-2xl mx-auto" />
        </div>
      </section>

      {/* Featured surahs skeleton */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="h-7 w-40 bg-slate-200 dark:bg-slate-800 rounded-lg mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
