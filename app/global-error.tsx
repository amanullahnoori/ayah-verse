"use client";

import Link from "next/link";
import "./globals.css";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en" dir="ltr">
      <body className="m-0 font-sans">
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-red-500/15 flex items-center justify-center text-5xl">
              ⚠️
            </div>

            <h1 className="text-2xl font-bold text-slate-50 mb-3">
              Something Went Wrong
            </h1>

            <p className="text-base text-slate-400 mb-8 leading-relaxed">
              A critical error occurred. Please try reloading the page.
            </p>

            <button
              onClick={reset}
              className="w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-base border-none cursor-pointer mb-3 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            >
              Try Again
            </button>

            <Link
              href="/"
              className="block w-full py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-base no-underline box-border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
