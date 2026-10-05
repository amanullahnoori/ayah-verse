"use client";

import { useState } from "react";
import { useSettings } from "@/context/SettingsContext";

interface DuaItem {
  id: string;
  arabicText: string;
  transliteration: string;
  englishTranslation: string;
  timing?: string;
  source?: string;
  reference?: string;
}

interface DuaCardProps {
  dua: DuaItem;
  index: number;
}

export default function DuaCard({ dua, index }: DuaCardProps) {
  const [copied, setCopied] = useState(false);
  const { showTranslation, showTransliteration, zoomLevel } = useSettings();

  const handleCopy = async () => {
    const text = `${dua.arabicText}\n\n${dua.transliteration}\n\n${dua.englishTranslation}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy");
    }
  };

  return (
    <div className="group relative rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 p-6 hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300">
      {/* Index badge - bottom left */}
      <div className="absolute bottom-6 left-6 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30">
        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
          {index}
        </span>
      </div>

      {/* Copy button - bottom right, appears on hover */}
      <button
        onClick={handleCopy}
        title={copied ? "Copied!" : "Copy"}
        className={`absolute bottom-6 right-6 inline-flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 ${
          copied
            ? "bg-emerald-100 dark:bg-emerald-900/30"
            : "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600"
        }`}
      >
        <svg
          className={`w-4 h-4 ${
            copied
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-slate-600 dark:text-slate-300"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          {copied ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          )}
        </svg>
      </button>

      {/* Arabic Text */}
      <div className="mb-6">
        <p
          className="dua-arabic text-slate-900 dark:text-white"
          style={{ fontSize: `${1.25 * (zoomLevel / 100)}rem` }}
        >
          {dua.arabicText}
        </p>
      </div>

      {/* Transliteration */}
      {showTransliteration && (
        <div className={`pb-4 ${showTranslation ? "border-b border-slate-200 dark:border-slate-700" : "mb-4"}`}>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
            Transliteration
          </p>
          <p
            className="text-slate-700 dark:text-slate-300 italic"
            style={{ fontSize: `${1 * (zoomLevel / 100)}rem` }}
          >
            {dua.transliteration}
          </p>
        </div>
      )}

      {/* English Translation / Meaning */}
      {showTranslation && (
        <div className="mb-4">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
            {dua.timing?.includes("Name") || dua.id?.match(/^\d+$/) ? "Meaning" : "Translation"}
          </p>
          <p
            className="text-slate-700 dark:text-slate-300 leading-relaxed"
            style={{ fontSize: `${1 * (zoomLevel / 100)}rem` }}
          >
            {dua.englishTranslation}
          </p>
        </div>
      )}

      {/* Source and Authentication Badge */}
      {dua.source && (
        <div className="mb-4 pt-2 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1">
            📚 Authentic Source
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <span className="font-semibold">{dua.source}</span>
            {dua.reference && <span className="text-slate-600 dark:text-slate-400"> — {dua.reference}</span>}
          </p>
        </div>
      )}

      {/* Timing Badge */}
      {dua.timing && (
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
          <span className="inline-flex items-center px-3 py-1 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-sm font-medium text-amber-700 dark:text-amber-400">
            {dua.timing}
          </span>
        </div>
      )}
    </div>
  );
}
