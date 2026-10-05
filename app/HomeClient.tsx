"use client";

import Link from "next/link";
import { type SurahInfo } from "@/lib/quranApi";
import { useBookmarks } from "@/context/BookmarkContext";
import SearchBar from "@/components/SearchBar";

interface FeaturedSurah extends SurahInfo {
  surahNo: number;
}

interface HomeClientProps {
  surahs: SurahInfo[];
  featuredSurahs: FeaturedSurah[];
}

const gradients = [
  "from-emerald-500 to-teal-600",
  "from-teal-500 to-cyan-600",
  "from-emerald-600 to-green-700",
  "from-cyan-500 to-blue-600",
  "from-green-500 to-emerald-600",
  "from-teal-600 to-emerald-700",
];

export default function HomeClient({
  surahs,
  featuredSurahs,
}: HomeClientProps) {
  const { bookmarks } = useBookmarks();
  const recentBookmarks = bookmarks.slice(-3).reverse();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative z-10 pt-24 md:pt-32 pb-12 px-4">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-emerald-100/50 dark:bg-emerald-900/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-teal-100/50 dark:bg-teal-900/20 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30 mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Read the{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Holy Quran
            </span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-8">
            Read, listen, and bookmark your favorite verses. A beautiful, modern
            Quran experience.
          </p>

          {/* Search Bar */}
          <SearchBar surahs={surahs} className="max-w-xl mx-auto" />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            href="/duas"
            data-analytics="quick_action"
            data-analytics-action="duas"
            className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:border-purple-200 dark:hover:border-purple-800 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
              <span className="text-lg">🤲</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Duas
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                & Azkar
              </p>
            </div>
          </Link>

          <Link
            href="/asma-ul-husna"
            data-analytics="quick_action"
            data-analytics-action="asma_ul_husna"
            className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:border-pink-200 dark:hover:border-pink-800 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-900/30 flex items-center justify-center">
              <span className="text-lg">✨</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                99 Names
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Of Allah
              </p>
            </div>
          </Link>

          <Link
            href="/umrah"
            data-analytics="quick_action"
            data-analytics-action="umrah"
            className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:border-orange-200 dark:hover:border-orange-800 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center">
              <span className="text-lg">🕌</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                Umrah
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Guide
              </p>
            </div>
          </Link>

          <Link
            href="/quran"
            data-analytics="quick_action"
            data-analytics-action="quran"
            className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Quran
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                114 Surahs
              </p>
            </div>
          </Link>

        </div>
      </section>

      {/* Featured Surahs */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Featured Surahs
          </h2>
          <Link
            href="/quran"
            data-analytics="view_all_click"
            data-analytics-section="featured_surahs"
            className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {featuredSurahs.map((surah, i) => (
            <Link
              key={surah.surahNo}
              href={`/quran/${surah.surahNo}`}
              data-analytics="featured_surah_click"
              data-analytics-surah-id={String(surah.surahNo)}
              data-analytics-surah-name={surah.surahName}
              className="group relative overflow-hidden rounded-2xl p-6 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  gradients[i % gradients.length]
                } opacity-90`}
              />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%20opacity%3D%220.08%22%2F%3E%3C%2Fsvg%3E')] opacity-30" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 text-sm font-bold">
                    {surah.surahNo}
                  </span>
                  <span className="text-2xl arabic-text opacity-80">
                    {surah.surahNameArabic}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1">{surah.surahName}</h3>
                <p className="text-sm opacity-80">
                  {surah.surahNameTranslation}
                </p>
                <div className="flex items-center gap-3 mt-3 text-xs opacity-70">
                  <span>{surah.totalAyah} verses</span>
                  <span>•</span>
                  <span>{surah.revelationPlace}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Bookmarks */}
      {recentBookmarks.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Recent Bookmarks
            </h2>
            <Link
              href="/bookmarks"
              data-analytics="view_all_click"
              data-analytics-section="recent_bookmarks"
              className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {recentBookmarks.map((bm) => (
              <Link
                key={bm.id}
                href={`/quran/${bm.surahNo}#verse-${bm.surahNo}-${bm.ayahNo}`}
                data-analytics="bookmark_click"
                data-analytics-surah-id={String(bm.surahNo)}
                data-analytics-surah-name={bm.surahName}
                data-analytics-ayah={String(bm.ayahNo)}
                data-analytics-location="home_recent"
                className="block p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-amber-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {bm.surahName} — Verse {bm.ayahNo}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {bm.englishText}
                    </p>
                  </div>
                  <span className="text-lg arabic-text text-slate-400 dark:text-slate-500 flex-shrink-0">
                    {bm.surahNameArabic}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">The Holy Quran</h2>
          <p className="text-emerald-100 mb-6">
            114 Surahs • 6,236 Verses • Complete Audio
          </p>
          <Link
            href="/quran"
            data-analytics="cta_click"
            data-analytics-cta="start_reading"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-semibold transition-all duration-200 backdrop-blur-sm"
          >
            Start Reading
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
