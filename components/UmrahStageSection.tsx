"use client";

import { useState } from "react";
import type { UmrahStage } from "@/lib/umrah";
import UmrahCard from "./UmrahCard";

interface UmrahStageSectionProps {
  stage: UmrahStage;
  stageNumber: number;
}

const colorSchemes: Record<
  string,
  { gradient: string; bgLight: string; bgDark: string }
> = {
  "before-miqat": {
    gradient: "from-purple-500 to-pink-600",
    bgLight: "bg-purple-50",
    bgDark: "dark:bg-purple-900/30",
  },
  miqat: {
    gradient: "from-blue-500 to-cyan-600",
    bgLight: "bg-blue-50",
    bgDark: "dark:bg-blue-900/30",
  },
  talbiyah: {
    gradient: "from-green-500 to-emerald-600",
    bgLight: "bg-green-50",
    bgDark: "dark:bg-green-900/30",
  },
  "entering-mosque": {
    gradient: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
    bgDark: "dark:bg-amber-900/30",
  },
  "first-sight": {
    gradient: "from-rose-500 to-red-600",
    bgLight: "bg-rose-50",
    bgDark: "dark:bg-rose-900/30",
  },
  tawaf: {
    gradient: "from-indigo-500 to-purple-600",
    bgLight: "bg-indigo-50",
    bgDark: "dark:bg-indigo-900/30",
  },
  "maqam-ibrahim": {
    gradient: "from-teal-500 to-cyan-600",
    bgLight: "bg-teal-50",
    bgDark: "dark:bg-teal-900/30",
  },
  zamzam: {
    gradient: "from-cyan-500 to-blue-600",
    bgLight: "bg-cyan-50",
    bgDark: "dark:bg-cyan-900/30",
  },
  safa: {
    gradient: "from-orange-500 to-red-600",
    bgLight: "bg-orange-50",
    bgDark: "dark:bg-orange-900/30",
  },
  "safi-marwah-dhikr": {
    gradient: "from-yellow-500 to-amber-600",
    bgLight: "bg-yellow-50",
    bgDark: "dark:bg-yellow-900/30",
  },
  sai: {
    gradient: "from-lime-500 to-green-600",
    bgLight: "bg-lime-50",
    bgDark: "dark:bg-lime-900/30",
  },
  "halq-qasr": {
    gradient: "from-violet-500 to-purple-600",
    bgLight: "bg-violet-50",
    bgDark: "dark:bg-violet-900/30",
  },
  "personal-duas": {
    gradient: "from-pink-500 to-rose-600",
    bgLight: "bg-pink-50",
    bgDark: "dark:bg-pink-900/30",
  },
};

export default function UmrahStageSection({
  stage,
  stageNumber,
}: UmrahStageSectionProps) {
  const [expanded, setExpanded] = useState(true);
  const scheme = colorSchemes[stage.id] || colorSchemes["talbiyah"];

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div
        className={`bg-gradient-to-r ${scheme.gradient} p-8 relative overflow-hidden`}
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
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 text-white font-bold text-lg mb-3">
                {stageNumber}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stage.title}
              </h2>
              <p className="dua-arabic text-lg text-white/90 mb-3">
                {stage.titleArabic}
              </p>
              <p className="text-white/80 max-w-2xl">{stage.description}</p>
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
          <div className="space-y-6">
            {stage.duas.map((dua, index) => (
              <UmrahCard key={dua.id} dua={dua} index={index + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
