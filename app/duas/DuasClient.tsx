"use client";

import Link from "next/link";
import { getAllDuas } from "@/lib/duas";
import DuaSection from "@/components/DuaSection";
import AsmaUlHusnaSection from "@/components/AsmaUlHusnaSection";

export default function DuasClient() {
  const allDuas = getAllDuas();
  // Filter out Asma-ul-Husna since it has its own dedicated page
  const duas = allDuas.filter(dua => dua.id !== "asma-ul-husna");

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
            <span className="text-2xl">🤲</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Islamic{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Duas & Azkar
            </span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            A comprehensive collection of authentic Islamic supplications, remembrances, and the
            beautiful names of Allah. Learn and recite with Arabic text, transliteration, and
            English translation.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {duas.map((dua) => (
            <a
              key={dua.id}
              href={`#${dua.id}`}
              className="flex items-center gap-2 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-md transition-all duration-300 group text-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              <span className="w-full">{dua.title}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Duas */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="space-y-8">
          {duas.map((dua) => (
            <div key={dua.id} id={dua.id} className="scroll-mt-24">
              {dua.id === "asma-ul-husna" ? (
                <AsmaUlHusnaSection dua={dua} />
              ) : (
                <DuaSection dua={dua} />
              )}
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
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Authentic & Verified Content</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                All duas and azkar are sourced from authentic Islamic texts following Ahlul-Hadith standards:
              </p>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• <strong>Quranic verses</strong> - Direct from the Holy Quran</li>
                <li>• <strong>Sahih collections</strong> - Sahih Bukhari, Sahih Muslim</li>
                <li>• <strong>Authentic hadith</strong> - Tirmidhi, Abu Dawud, An-Nasai</li>
                <li>• <strong>Verified by scholars</strong> - No unverified or trending content</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Benefits of Duas & Azkar</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Spiritual Benefits</h3>
              <ul className="text-emerald-100 space-y-2 text-sm">
                <li>✓ Increases closeness to Allah</li>
                <li>✓ Brings peace and tranquility to the heart</li>
                <li>✓ Strengthens faith and belief</li>
                <li>✓ Provides spiritual protection</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Daily Benefits</h3>
              <ul className="text-emerald-100 space-y-2 text-sm">
                <li>✓ Morning and evening protection</li>
                <li>✓ Peaceful sleep</li>
                <li>✓ Mindfulness throughout the day</li>
                <li>✓ Connection with the Divine</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between">
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
