"use client";

import { useState } from "react";
import { type SurahInfo } from "@/lib/quranApi";
import SurahCard from "@/components/SurahCard";
import SearchBar from "@/components/SearchBar";

interface QuranListClientProps {
  surahs: SurahInfo[];
}

type Filter = "all" | "mecca" | "madina";

export default function QuranListClient({ surahs }: QuranListClientProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = surahs.filter((s) => {
    if (filter === "mecca") return s.revelationPlace === "Mecca";
    if (filter === "madina") return s.revelationPlace === "Madina";
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 md:pt-24 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            The Holy Quran
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            114 Surahs • Browse and read the complete Quran
          </p>
        </div>

        {/* Search */}
        <SearchBar surahs={surahs} className="mb-6" />

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {(["all", "mecca", "madina"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              data-analytics="filter_change"
              data-analytics-filter={f}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                filter === f
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700"
              }`}
            >
              {f === "all" ? "All" : f === "mecca" ? "Mecca" : "Madina"}
              <span className="ml-1.5 text-xs opacity-70">
                (
                {f === "all"
                  ? surahs.length
                  : surahs.filter((s) =>
                      f === "mecca"
                        ? s.revelationPlace === "Mecca"
                        : s.revelationPlace === "Madina",
                    ).length}
                )
              </span>
            </button>
          ))}
        </div>

        {/* Surah List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((surah, index) => {
            // Calculate original index for the surah number
            const originalIndex = surahs.indexOf(surah);
            return (
              <SurahCard
                key={originalIndex}
                surah={surah}
                index={originalIndex}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
