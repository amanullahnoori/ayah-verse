"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[AyahVerse Error]", error);
  }, [error]);

  const isOffline = typeof navigator !== "undefined" && !navigator.onLine;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-400 dark:text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
          {isOffline ? "You\u2019re Offline" : "Something Went Wrong"}
        </h1>

        <p className="text-base text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
          {isOffline
            ? "This page isn\u2019t available offline yet. Connect to the internet and try again."
            : "We couldn\u2019t load this page. Please try again or go back home."}
        </p>

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="block w-full py-3 px-6 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
