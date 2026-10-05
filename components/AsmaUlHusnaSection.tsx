"use client";

import { useState } from "react";
import type { Dua } from "@/lib/duas";
import NameCard from "./NameCard";

interface AsmaUlHusnaSectionProps {
  dua: Dua;
}

export default function AsmaUlHusnaSection({
  dua,
}: AsmaUlHusnaSectionProps) {
  const [expanded, setExpanded] = useState(true);
  const [filter, setFilter] = useState("");

  const filteredNames = dua.duas.filter(
    (name) =>
      name.transliteration.toLowerCase().includes(filter.toLowerCase()) ||
      name.englishTranslation.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white blur-3xl" />
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="relative w-full text-left group"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <span className="text-4xl mb-3 block">✨</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {dua.title}
              </h2>
              <p className="dua-arabic text-lg text-white/90 mb-3">
                {dua.titleArabic}
              </p>
              <p className="text-white/80 max-w-2xl">{dua.description}</p>
            </div>
            <svg
              className={`w-6 h-6 text-white transition-transform duration-300 shrink-0 ml-4 ${
                expanded ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7-7m0 0L5 14m7-7v12"
              />
            </svg>
          </div>
        </button>
      </div>

      {/* Content */}
      {expanded && (
        <div className="p-8">
          {/* Search Filter */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search by name or meaning..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Showing {filteredNames.length} of {dua.duas.length} names
            </p>
          </div>

          {/* Names Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNames.map((name, index) => (
              <NameCard
                key={name.id}
                number={parseInt(name.id)}
                arabicText={name.arabicText}
                transliteration={name.transliteration}
                meaning={name.englishTranslation}
              />
            ))}
          </div>

          {filteredNames.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400 text-lg">
                No names found matching your search
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
