"use client";

import { useState } from "react";
import { useSettings } from "@/context/SettingsContext";

interface NameCardProps {
  number: number;
  arabicText: string;
  transliteration: string;
  meaning: string;
}

export default function NameCard({
  number,
  arabicText,
  transliteration,
  meaning,
}: NameCardProps) {
  const [copied, setCopied] = useState(false);
  const { showTranslation, showTransliteration, zoomLevel } = useSettings();

  const handleCopy = async () => {
    const text = `${arabicText}\n${transliteration}\n${meaning}`;
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
      {/* Copy button - appears on hover at bottom right */}
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

      <div className="space-y-5">
        {/* Arabic Name */}
        <div>
          <p
            className="dua-arabic text-slate-900 dark:text-white font-bold"
            style={{ fontSize: `${3.75 * (zoomLevel / 100)}rem` }}
          >
            {arabicText}
          </p>
        </div>

        {/* Number badge - bottom left */}
        <div className="absolute bottom-6 left-6 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/30">
          {number}
        </div>

        {/* Transliteration */}
        {showTransliteration && (
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
              Name
            </p>
            <p
              className="font-semibold text-emerald-600 dark:text-emerald-400"
              style={{ fontSize: `${1.125 * (zoomLevel / 100)}rem` }}
            >
              {transliteration}
            </p>
          </div>
        )}

        {/* Meaning */}
        {showTranslation && (
          <div className={`${showTransliteration ? "pt-2 border-t border-slate-200 dark:border-slate-700" : ""}`}>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
              Meaning
            </p>
            <p
              className="text-slate-700 dark:text-slate-300 leading-relaxed"
              style={{ fontSize: `${1 * (zoomLevel / 100)}rem` }}
            >
              {meaning}
            </p>
          </div>
        )}

        {/* Quranic Source Badge */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-xs font-medium text-emerald-700 dark:text-emerald-400">
            <span>📖</span> Quranic Name
          </span>
        </div>
      </div>
    </div>
  );
}
