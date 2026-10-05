"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCachedSurah } from "@/lib/surahCache";

import SurahDetailClient from "./SurahDetailClient";

export default function SurahDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();

  // Compute cached data synchronously via lazy initializer — no effect needed
  const [cachedData] = useState(() => {
    const segments = pathname.split("/");
    const idStr = segments[segments.length - 1];
    const surahNo = parseInt(idStr, 10);
    if (!isNaN(surahNo) && surahNo >= 1 && surahNo <= 114) {
      return getCachedSurah(surahNo);
    }
    return null;
  });

  useEffect(() => {
    console.error("[AyahVerse Surah Error]", error);
  }, [error]);

  // If we have cached data, render the full surah page offline
  if (cachedData) {
    return (
      <>
        {/* Offline banner */}
        <div className="fixed top-0 inset-x-0 z-50 bg-amber-500 text-white text-center text-sm py-1.5 font-medium">
          You\u2019re viewing a cached version (offline)
        </div>
        <SurahDetailClient
          surah={cachedData.surah}
          indopakAyahs={cachedData.indopakAyahs}
        />
      </>
    );
  }

  const isOffline = typeof navigator !== "undefined" && !navigator.onLine;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-amber-400 dark:text-amber-500"
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
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
          {isOffline
            ? "Surah Unavailable Offline"
            : "Couldn\u2019t Load This Surah"}
        </h1>

        <p className="text-base text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
          {isOffline
            ? "This surah hasn\u2019t been cached yet. Connect to the internet, open the surah once, and it will be available offline next time."
            : "We had trouble loading this surah. The server might be temporarily unavailable."}
        </p>

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            Try Again
          </button>

          <Link
            href="/quran"
            className="block w-full py-3 px-6 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            Browse All Surahs
          </Link>

          <Link
            href="/"
            className="block text-sm text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
