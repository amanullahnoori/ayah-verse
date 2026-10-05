"use client";

import Link from "next/link";
import { getDuaById } from "@/lib/duas";
import AsmaUlHusnaSection from "@/components/AsmaUlHusnaSection";

export default function AsmaUlHusnaClient() {
  const asmaData = getDuaById("asma-ul-husna");

  if (!asmaData) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">Names not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative z-10 pt-20 md:pt-32 pb-8 md:pb-12 px-4 mt-14 md:mt-0">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-emerald-100/50 dark:bg-emerald-900/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-teal-100/50 dark:bg-teal-900/20 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30 mb-6">
            <span className="text-2xl">✨</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Allah's{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              99 Beautiful Names
            </span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-8">
            Explore the divine attributes of Allah through His most beautiful names. Each name reflects a unique aspect of His perfection and majesty. Meditate on these names to deepen your spiritual connection.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
            <div className="bg-white dark:bg-slate-800/50 rounded-xl p-3 sm:p-4 border border-slate-100 dark:border-slate-700/50">
              <p className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">99</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Names</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 rounded-xl p-3 sm:p-4 border border-slate-100 dark:border-slate-700/50">
              <p className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">Quranic</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Based</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 rounded-xl p-3 sm:p-4 border border-slate-100 dark:border-slate-700/50">
              <p className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">Divine</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Attributes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <AsmaUlHusnaSection dua={asmaData} />
      </section>

      {/* Authenticity Section */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6">
          <div className="flex gap-3">
            <span className="text-2xl">✓</span>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Authentic Quranic Names</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                All 99 Names of Allah (Asma-ul-Husna) are sourced directly from the Holy Quran and authenticated hadith collections:
              </p>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• <strong>Quranic basis</strong> - Every name appears in the Quran</li>
                <li>• <strong>Traditional hadith</strong> - Referenced in authentic hadith collections</li>
                <li>• <strong>Scholarly consensus</strong> - Recognized by Islamic scholars and Ahlul-Hadith</li>
                <li>• <strong>No innovations</strong> - Only established divine attributes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Benefits of Reflecting on the 99 Names</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl mb-3">🌟</div>
              <h3 className="font-semibold mb-2">Spiritual Growth</h3>
              <p className="text-emerald-100 text-sm">
                Deepen your understanding of Allah's attributes and strengthen your faith
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">💚</div>
              <h3 className="font-semibold mb-2">Heart Healing</h3>
              <p className="text-emerald-100 text-sm">
                Find peace, comfort, and healing by connecting with Allah's divine qualities
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold mb-2">Answered Duas</h3>
              <p className="text-emerald-100 text-sm">
                Call upon Allah using His beautiful names for better acceptance of prayers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">How to Use This Section</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 p-6">
            <div className="flex items-start gap-4">
              <span className="text-2xl">🔍</span>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Search & Filter</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Use the search bar to find names by their transliteration or English meaning
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 p-6">
            <div className="flex items-start gap-4">
              <span className="text-2xl">📋</span>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Copy to Clipboard</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Click the copy button on each name to save it for offline reading or sharing
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 p-6">
            <div className="flex items-start gap-4">
              <span className="text-2xl">📖</span>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Daily Reflection</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Choose one name daily and meditate on its meaning and how it relates to your life
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 p-6">
            <div className="flex items-start gap-4">
              <span className="text-2xl">🤝</span>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Share with Others</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Copy and share these beautiful names with family and friends for spiritual growth
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold transition-all duration-200"
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
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/duas"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-200"
          >
            All Duas & Azkar
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
          <Link
            href="/quran"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all duration-200"
          >
            Read Quran
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
