"use client";

import Link from "next/link";
import { useBookmarks } from "@/context/BookmarkContext";

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks();

  // Sort by most recently bookmarked first
  const sortedBookmarks = [...bookmarks].sort(
    (a, b) => b.timestamp - a.timestamp
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 md:pt-24 pb-24 md:pb-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Bookmarks
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {bookmarks.length} saved verse{bookmarks.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Empty state */}
        {bookmarks.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-900/20 mb-4">
              <svg
                className="w-8 h-8 text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              No bookmarks yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
              Tap the bookmark icon on any verse while reading the Quran to save
              it here.
            </p>
            <Link
              href="/quran"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-md shadow-emerald-600/30"
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
        )}

        {/* Bookmark list */}
        <div className="space-y-3">
          {sortedBookmarks.map((bm, index) => (
            <div
              key={bm.id}
              className="group relative p-5 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-md transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start gap-4">
                {/* Bookmark icon */}
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-amber-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Link
                      href={`/quran/${bm.surahNo}#verse-${bm.surahNo}-${bm.ayahNo}`}
                      className="text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                      {bm.surahName} — Verse {bm.ayahNo}
                    </Link>
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      {bm.surahNameArabic}
                    </span>
                  </div>

                  {/* Arabic text preview */}
                  <p className="text-lg arabic-text text-slate-700 dark:text-slate-300 mb-2 line-clamp-2">
                    {bm.arabicText}
                  </p>

                  {/* Translation preview */}
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                    {bm.englishText}
                  </p>

                  {/* Timestamp */}
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 uppercase tracking-wider">
                    Saved{" "}
                    {new Date(bm.timestamp).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/quran/${bm.surahNo}#verse-${bm.surahNo}-${bm.ayahNo}`}
                    className="p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-slate-400 hover:text-emerald-600 transition-all"
                    title="Go to verse"
                  >
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
                  <button
                    onClick={() => removeBookmark(bm.id)}
                    className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-400 hover:text-red-500 transition-all"
                    title="Remove bookmark"
                  >
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
