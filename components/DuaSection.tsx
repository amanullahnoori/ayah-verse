"use client";

import { useState } from "react";
import type { Dua } from "@/lib/duas";
import DuaCard from "./DuaCard";

interface DuaSectionProps {
  dua: Dua;
}

const colorSchemes: Record<
  string,
  { gradient: string; icon: string; bgLight: string; bgDark: string }
> = {
  "prayer-after": {
    gradient: "from-blue-500 to-cyan-600",
    icon: "🤲",
    bgLight: "bg-blue-50",
    bgDark: "dark:bg-blue-900/30",
  },
  "morning-evening": {
    gradient: "from-amber-500 to-orange-600",
    icon: "☀️",
    bgLight: "bg-amber-50",
    bgDark: "dark:bg-amber-900/30",
  },
  "prayer-duas": {
    gradient: "from-purple-500 to-pink-600",
    icon: "🕌",
    bgLight: "bg-purple-50",
    bgDark: "dark:bg-purple-900/30",
  },
  "sleep-azkar": {
    gradient: "from-indigo-500 to-blue-600",
    icon: "🌙",
    bgLight: "bg-indigo-50",
    bgDark: "dark:bg-indigo-900/30",
  },
  "asma-ul-husna": {
    gradient: "from-emerald-500 to-teal-600",
    icon: "✨",
    bgLight: "bg-emerald-50",
    bgDark: "dark:bg-emerald-900/30",
  },
};

export default function DuaSection({ dua }: DuaSectionProps) {
  const [expanded, setExpanded] = useState(true);
  const scheme = colorSchemes[dua.id] || colorSchemes["asma-ul-husna"];

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div
        className={`dua-section-header bg-gradient-to-r ${scheme.gradient} p-8 relative overflow-hidden`}
      >
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
              <span className="text-4xl mb-3 block">{scheme.icon}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {dua.title}
              </h2>
              <p className="dua-arabic text-lg text-white/90 mb-3">
                {dua.titleArabic}
              </p>
              <p className="text-white/80 max-w-2xl">{dua.description}</p>
            </div>
            <svg
              className={`w-6 h-6 text-white transition-transform duration-300 flex-shrink-0 ml-4 ${
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
          <div className="space-y-6">
            {dua.duas.map((item, index) => (
              <DuaCard
                key={item.id}
                dua={item}
                index={index + 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
