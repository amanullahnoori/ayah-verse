"use client";

import Link from "next/link";
import { getAllUmrahStages } from "@/lib/umrah";
import UmrahStageSection from "@/components/UmrahStageSection";

export default function UmrahClient() {
  const allStages = getAllUmrahStages();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative z-10 pt-24 md:pt-32 pb-12 px-4">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-amber-100/50 dark:bg-amber-900/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-orange-100/50 dark:bg-orange-900/20 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30 mb-6">
            <span className="text-2xl">🕌</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Complete{" "}
            <span className="text-amber-600 dark:text-amber-400">
              Umrah Guide
            </span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-8">
            A comprehensive step-by-step guide to the sacred pilgrimage with authentic duas and supplications for every stage. Learn the proper rites and prayers with Arabic text, transliteration, and English translation.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
            <div className="bg-white dark:bg-slate-800/50 rounded-xl p-3 sm:p-4 border border-slate-100 dark:border-slate-700/50">
              <p className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400">{allStages.length}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Stages</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 rounded-xl p-3 sm:p-4 border border-slate-100 dark:border-slate-700/50">
              <p className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400">Authentic</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Duas</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 rounded-xl p-3 sm:p-4 border border-slate-100 dark:border-slate-700/50">
              <p className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400">Sacred</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* Umrah Stages */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="space-y-8">
          {allStages.map((stage, index) => (
            <div key={stage.id} id={stage.id} className="scroll-mt-24">
              <UmrahStageSection stage={stage} stageNumber={index + 1} />
            </div>
          ))}
        </div>
      </section>

      {/* Authenticity Section */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6">
          <div className="flex gap-3">
            <span className="text-2xl">✓</span>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Authentic Umrah Guide</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                This Umrah guide and all supplications are sourced from authentic Islamic texts and verified sources:
              </p>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• <strong>Quranic verses</strong> - Direct from the Holy Quran</li>
                <li>• <strong>Authentic hadith</strong> - From verified Islamic collections</li>
                <li>• <strong>Scholarly guidance</strong> - Based on established Islamic jurisprudence</li>
                <li>• <strong>Complete rites</strong> - All essential steps and supplications included</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <div className="rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">The Significance of Umrah</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl mb-3">🕌</div>
              <h3 className="font-semibold mb-2">The Lesser Pilgrimage</h3>
              <p className="text-amber-100 text-sm">
                Umrah is a pilgrimage to Mecca that can be performed at any time of the year, unlike Hajj
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">💚</div>
              <h3 className="font-semibold mb-2">Spiritual Cleansing</h3>
              <p className="text-amber-100 text-sm">
                An opportunity to seek forgiveness, purify the soul, and strengthen connection with Allah
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">📖</div>
              <h3 className="font-semibold mb-2">Following the Sunnah</h3>
              <p className="text-amber-100 text-sm">
                Perform Umrah following the teachings and example of Prophet Muhammad (peace be upon him)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">How to Use This Guide</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 p-6">
            <div className="flex items-start gap-4">
              <span className="text-2xl">📱</span>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Prepare Before Travel</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Save this guide and learn the duas and rites for each stage before your journey
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
                  Click the copy button on each dua to save it for offline reading or sharing with others
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 p-6">
            <div className="flex items-start gap-4">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Follow Each Stage</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Go through each stage in order and recite the prescribed duas with proper intention
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 p-6">
            <div className="flex items-start gap-4">
              <span className="text-2xl">🤝</span>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Share with Pilgrims</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Share this guide with friends and family planning their Umrah journey
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
            Duas & Azkar
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
            href="/asma-ul-husna"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all duration-200"
          >
            99 Names
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
