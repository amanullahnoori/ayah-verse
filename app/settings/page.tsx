"use client";

import React, { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import {
  useSettings,
  type Theme,
  type TranslationLang,
  type TransliterationLang,
  type ArabicScript,
  type ReadingMode,
  ZOOM_MIN,
  ZOOM_MAX,
  ZOOM_STEP,
  ZOOM_DEFAULT,
} from "@/context/SettingsContext";

/* ─── Static data ──────────────────────────────────────────────────────────── */

const themeOptions: { value: Theme; label: string; icon: React.ReactNode }[] = [
  {
    value: "light",
    label: "Light",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>
    ),
  },
  {
    value: "dark",
    label: "Dark",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      </svg>
    ),
  },
  {
    value: "system",
    label: "Auto",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
        />
      </svg>
    ),
  },
];

const translationOptions: {
  value: TranslationLang;
  label: string;
  flag: string;
}[] = [
  { value: "english", label: "English", flag: "🇬🇧" },
  { value: "urdu", label: "اردو", flag: "🇵🇰" },
  { value: "bengali", label: "বাংলা", flag: "🇧🇩" },
  { value: "hindi", label: "हिन्दी", flag: "🇮🇳" },
];

const transliterationOptions: { value: TransliterationLang; label: string }[] =
  [
    { value: "english", label: "English" },
    { value: "hindi", label: "Hindi" },
  ];

const reciterOptions = [
  { id: "1", name: "Mishary Rashid Al Afasy" },
  { id: "2", name: "Abu Bakr Al Shatri" },
  { id: "3", name: "Nasser Al Qatami" },
  { id: "4", name: "Yasser Al Dosari" },
  { id: "5", name: "Hani Ar Rifai" },
];

const arabicScriptOptions: {
  value: ArabicScript;
  label: string;
  description: string;
  sample: string;
}[] = [
  {
    value: "uthmani",
    label: "Uthmani",
    description: "Standard script used in most printed Qurans",
    sample: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
  },
  {
    value: "indopak",
    label: "Indopak",
    description: "Nastaleeq script used in South Asian Qurans",
    sample: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِیْمِ",
  },
];

/* ─── Reusable components ──────────────────────────────────────────────────── */

function Toggle({
  checked,
  onChange,
  label,
  ...rest
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      {...rest}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onChange();
        }
      }}
      className={`relative shrink-0 w-12 h-7 rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
        checked ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"
      }`}
    >
      <span
        className="pointer-events-none absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md ring-0 transition-all duration-200 ease-in-out"
        style={{ transform: checked ? "translateX(20px)" : "translateX(0)" }}
      />
    </button>
  );
}

function SectionHeading({
  id,
  icon,
  iconBg,
  title,
  subtitle,
}: {
  id?: string;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div
        className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}
      >
        {icon}
      </div>
      <div>
        <h2
          id={id}
          className="text-lg font-semibold text-slate-900 dark:text-white"
        >
          {title}
        </h2>
        <p className="text-sm text-slate-400 dark:text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

/* ─── Main page ────────────────────────────────────────────────────────────── */

export default function SettingsPage() {
  const {
    zoomLevel,
    setZoomLevel,
    theme,
    setTheme,
    showTranslation,
    setShowTranslation,
    showTransliteration,
    setShowTransliteration,
    transliterationLang,
    setTransliterationLang,
    translationLang,
    setTranslationLang,
    reciterId,
    setReciterId,
    arabicScript,
    setArabicScript,
    readingMode,
    setReadingMode,
  } = useSettings();

  /* Keyboard: arrow keys inside radio-groups */
  const themeGroupRef = useRef<HTMLDivElement>(null);
  const langGroupRef = useRef<HTMLDivElement>(null);
  const reciterGroupRef = useRef<HTMLDivElement>(null);

  const handleRadioKeyboard = useCallback(
    (e: React.KeyboardEvent, items: HTMLElement[]) => {
      const idx = items.findIndex((el) => el === document.activeElement);
      if (idx < 0) return;
      let next = idx;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        next = (idx + 1) % items.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        next = (idx - 1 + items.length) % items.length;
      }
      if (next !== idx) {
        items[next].focus();
        items[next].click();
      }
    },
    [],
  );

  /* Keyboard: zoom with +/- keys while slider focused */
  const handleZoomKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        setZoomLevel(Math.min(zoomLevel + ZOOM_STEP, ZOOM_MAX));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        setZoomLevel(Math.max(zoomLevel - ZOOM_STEP, ZOOM_MIN));
      } else if (e.key === "Home") {
        e.preventDefault();
        setZoomLevel(ZOOM_MIN);
      } else if (e.key === "End") {
        e.preventDefault();
        setZoomLevel(ZOOM_MAX);
      }
    },
    [zoomLevel, setZoomLevel],
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 md:pt-24 pb-28 md:pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* ── Page title ── */}
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Settings
          </h1>
          <p className="mt-1 text-base text-slate-500 dark:text-slate-400">
            Customize your reading experience
          </p>
        </header>

        <div className="space-y-8">
          {/* ───────────────────────── Appearance ───────────────────────── */}
          <section
            className="rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 sm:p-8"
            aria-labelledby="section-appearance"
          >
            <SectionHeading
              id="section-appearance"
              icon={
                <svg
                  className="w-5 h-5 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                </svg>
              }
              iconBg="bg-amber-50 dark:bg-amber-900/30"
              title="Appearance"
              subtitle="Switch between light, dark, or system theme"
            />

            <div
              ref={themeGroupRef}
              role="radiogroup"
              aria-label="Theme selection"
              className="grid grid-cols-3 gap-3"
              onKeyDown={(e) => {
                const btns = Array.from(
                  themeGroupRef.current?.querySelectorAll<HTMLElement>(
                    "[role=radio]",
                  ) ?? [],
                );
                handleRadioKeyboard(e, btns);
              }}
            >
              {themeOptions.map((opt, i) => {
                const active = theme === opt.value;
                return (
                  <button
                    key={opt.value}
                    role="radio"
                    aria-checked={active}
                    tabIndex={active ? 0 : -1}
                    onClick={() => setTheme(opt.value)}
                    data-analytics="setting_change"
                    data-analytics-setting="theme"
                    data-analytics-value={opt.value}
                    className={`flex flex-col items-center gap-2.5 py-5 px-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
                      active
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                        : "border-transparent bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span
                      className={
                        active
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-slate-400 dark:text-slate-500"
                      }
                    >
                      {opt.icon}
                    </span>
                    <span
                      className={`text-sm font-medium ${active ? "text-emerald-700 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400"}`}
                    >
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* ───────────────────────── Text Zoom ────────────────────────── */}
          <section
            className="rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 sm:p-8"
            aria-labelledby="section-zoom"
          >
            <SectionHeading
              id="section-zoom"
              icon={
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                  />
                </svg>
              }
              iconBg="bg-blue-50 dark:bg-blue-900/30"
              title="Text Zoom"
              subtitle="Adjust text size for comfortable reading"
            />

            {/* Slider row */}
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  setZoomLevel(Math.max(zoomLevel - ZOOM_STEP, ZOOM_MIN))
                }
                disabled={zoomLevel <= ZOOM_MIN}
                aria-label="Decrease zoom"
                data-analytics="setting_change"
                data-analytics-setting="zoom"
                data-analytics-action="decrease"
                data-analytics-page="settings"
                className="w-10 h-10 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-lg font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                −
              </button>

              <div className="flex-1 flex flex-col">
                <input
                  type="range"
                  min={ZOOM_MIN}
                  max={ZOOM_MAX}
                  step={ZOOM_STEP}
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(Number(e.target.value))}
                  onKeyDown={handleZoomKey}
                  aria-label={`Zoom level: ${zoomLevel}%`}
                  aria-valuemin={ZOOM_MIN}
                  aria-valuemax={ZOOM_MAX}
                  aria-valuenow={zoomLevel}
                  aria-valuetext={`${zoomLevel} percent`}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200 dark:bg-slate-700 accent-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500"
                />
                <div className="flex justify-between mt-1.5 text-[10px] text-slate-400 dark:text-slate-500 select-none">
                  <span>{ZOOM_MIN}%</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-xs">
                    {zoomLevel}%
                  </span>
                  <span>{ZOOM_MAX}%</span>
                </div>
              </div>

              <button
                onClick={() =>
                  setZoomLevel(Math.min(zoomLevel + ZOOM_STEP, ZOOM_MAX))
                }
                disabled={zoomLevel >= ZOOM_MAX}
                aria-label="Increase zoom"
                data-analytics="setting_change"
                data-analytics-setting="zoom"
                data-analytics-action="increase"
                data-analytics-page="settings"
                className="w-10 h-10 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-lg font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                +
              </button>
            </div>

            {zoomLevel !== ZOOM_DEFAULT && (
              <div className="mt-3 text-center">
                <button
                  onClick={() => setZoomLevel(ZOOM_DEFAULT)}
                  data-analytics="setting_change"
                  data-analytics-setting="zoom"
                  data-analytics-action="reset"
                  data-analytics-page="settings"
                  className="text-xs text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                >
                  Reset to {ZOOM_DEFAULT}%
                </button>
              </div>
            )}

            {/* Live preview */}
            <div
              className="mt-6 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/40"
              aria-live="polite"
            >
              <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold mb-3">
                Live Preview
              </p>
              <p
                className="arabic-text text-slate-900 dark:text-slate-100"
                style={{
                  fontSize: `${1.875 * (zoomLevel / 100)}rem`,
                  lineHeight: 1.8,
                }}
              >
                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
              </p>
              <p
                className="text-emerald-700 dark:text-emerald-400 italic mt-2"
                style={{
                  fontSize: `${1.125 * (zoomLevel / 100)}rem`,
                  lineHeight: 1.6,
                }}
              >
                Bismillaahir Rahmaanir Raheem
              </p>
              <p
                className="text-slate-500 dark:text-slate-400 mt-2"
                style={{
                  fontSize: `${1 * (zoomLevel / 100)}rem`,
                  lineHeight: 1.6,
                }}
              >
                In the name of Allah, the Most Gracious, the Most Merciful
              </p>
            </div>
          </section>

          {/* ───────────────────── Reading Mode ───────────────────── */}
          <section
            className="rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 sm:p-8"
            aria-labelledby="section-reading-mode"
          >
            <SectionHeading
              id="section-reading-mode"
              icon={
                <svg
                  className="w-5 h-5 text-sky-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              }
              iconBg="bg-sky-50 dark:bg-sky-900/30"
              title="Reading Mode"
              subtitle="Choose how Quran text is displayed"
            />

            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              role="radiogroup"
              aria-label="Reading mode selection"
            >
              {/* Verse Mode */}
              <button
                role="radio"
                aria-checked={readingMode === "verse"}
                onClick={() => setReadingMode("verse")}
                data-analytics="setting_change"
                data-analytics-setting="reading_mode"
                data-analytics-value="verse"
                className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
                  readingMode === "verse"
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                    : "border-transparent bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="mt-0.5">
                  <svg
                    className="w-8 h-8 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </div>
                <div>
                  <span
                    className={`text-sm font-semibold ${
                      readingMode === "verse"
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    Verse by Verse
                  </span>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    Each verse shown as a card with translation, transliteration
                    &amp; audio
                  </p>
                </div>
              </button>

              {/* Page Mode */}
              <button
                role="radio"
                aria-checked={readingMode === "page"}
                onClick={() => setReadingMode("page")}
                data-analytics="setting_change"
                data-analytics-setting="reading_mode"
                data-analytics-value="page"
                className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
                  readingMode === "page"
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                    : "border-transparent bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="mt-0.5">
                  <svg
                    className="w-8 h-8 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </div>
                <div>
                  <span
                    className={`text-sm font-semibold ${
                      readingMode === "page"
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    Quran Page
                  </span>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    Flowing Arabic text like a real Quran page with verse
                    markers
                  </p>
                </div>
              </button>
            </div>
          </section>

          {/* ───────────────────── Arabic Script ───────────────────── */}
          <section
            className="rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 sm:p-8"
            aria-labelledby="section-arabic-script"
          >
            <SectionHeading
              id="section-arabic-script"
              icon={
                <svg
                  className="w-5 h-5 text-teal-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              }
              iconBg="bg-teal-50 dark:bg-teal-900/30"
              title="Arabic Script"
              subtitle="Choose the Arabic script style for Quran text"
            />

            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              role="radiogroup"
              aria-label="Arabic script selection"
            >
              {arabicScriptOptions.map((opt) => {
                const active = arabicScript === opt.value;
                return (
                  <button
                    key={opt.value}
                    role="radio"
                    aria-checked={active}
                    onClick={() => setArabicScript(opt.value)}
                    data-analytics="setting_change"
                    data-analytics-setting="arabic_script"
                    data-analytics-value={opt.value}
                    className={`flex flex-col gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
                      active
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                        : "border-transparent bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <div>
                      <span
                        className={`text-sm font-semibold ${
                          active
                            ? "text-emerald-700 dark:text-emerald-400"
                            : "text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {opt.label}
                      </span>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                        {opt.description}
                      </p>
                    </div>
                    <p
                      className={`${
                        opt.value === "indopak" ? "indopak-text" : "arabic-text"
                      } text-lg text-slate-800 dark:text-slate-200`}
                    >
                      {opt.sample}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* ───────────────────── Transliteration ──────────────────────── */}
          <section
            className="rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 sm:p-8"
            aria-labelledby="section-transliteration"
          >
            <SectionHeading
              id="section-transliteration"
              icon={
                <svg
                  className="w-5 h-5 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
              }
              iconBg="bg-emerald-50 dark:bg-emerald-900/30"
              title="Transliteration"
              subtitle="Pronunciation guide alongside Arabic text"
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Show transliteration
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  Displays phonetic text under each verse
                </p>
              </div>
              <Toggle
                checked={showTransliteration}
                onChange={() => setShowTransliteration(!showTransliteration)}
                label="Toggle transliteration"
                data-analytics="setting_change"
                data-analytics-setting="transliteration_toggle"
                data-analytics-value={showTransliteration ? "off" : "on"}
              />
            </div>

            {showTransliteration && (
              <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">
                  Script
                </p>
                <div
                  className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1"
                  role="radiogroup"
                  aria-label="Transliteration script"
                >
                  {transliterationOptions.map((opt) => {
                    const active = transliterationLang === opt.value;
                    return (
                      <button
                        key={opt.value}
                        role="radio"
                        aria-checked={active}
                        onClick={() => setTransliterationLang(opt.value)}
                        data-analytics="setting_change"
                        data-analytics-setting="transliteration_script"
                        data-analytics-value={opt.value}
                        className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
                          active
                            ? "bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-sm"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          {/* ───────────────────── Translation ──────────────────────────── */}
          <section
            className="rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 sm:p-8"
            aria-labelledby="section-translation"
          >
            <SectionHeading
              id="section-translation"
              icon={
                <svg
                  className="w-5 h-5 text-violet-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
                  />
                </svg>
              }
              iconBg="bg-violet-50 dark:bg-violet-900/30"
              title="Translation"
              subtitle="Verse meanings in your preferred language"
            />

            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Show translation
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  Display translation below each verse
                </p>
              </div>
              <Toggle
                checked={showTranslation}
                onChange={() => setShowTranslation(!showTranslation)}
                label="Toggle translation"
                data-analytics="setting_change"
                data-analytics-setting="translation_toggle"
                data-analytics-value={showTranslation ? "off" : "on"}
              />
            </div>

            {showTranslation && (
              <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">
                  Language
                </p>
                <div
                  ref={langGroupRef}
                  role="radiogroup"
                  aria-label="Translation language"
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                  onKeyDown={(e) => {
                    const btns = Array.from(
                      langGroupRef.current?.querySelectorAll<HTMLElement>(
                        "[role=radio]",
                      ) ?? [],
                    );
                    handleRadioKeyboard(e, btns);
                  }}
                >
                  {translationOptions.map((opt) => {
                    const active = translationLang === opt.value;
                    return (
                      <button
                        key={opt.value}
                        role="radio"
                        aria-checked={active}
                        tabIndex={active ? 0 : -1}
                        onClick={() => setTranslationLang(opt.value)}
                        data-analytics="setting_change"
                        data-analytics-setting="translation_language"
                        data-analytics-value={opt.value}
                        className={`flex items-center gap-2.5 p-3.5 rounded-xl border-2 transition-all duration-200 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
                          active
                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                            : "border-transparent bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <span className="text-lg" aria-hidden="true">
                          {opt.flag}
                        </span>
                        <span
                          className={`text-sm font-medium ${active ? "text-emerald-700 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400"}`}
                        >
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          {/* ─────────────────────── Reciter ────────────────────────────── */}
          <section
            className="rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 sm:p-8"
            aria-labelledby="section-reciter"
          >
            <SectionHeading
              id="section-reciter"
              icon={
                <svg
                  className="w-5 h-5 text-rose-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                  />
                </svg>
              }
              iconBg="bg-rose-50 dark:bg-rose-900/30"
              title="Reciter"
              subtitle="Select voice for audio playback"
            />

            <div
              ref={reciterGroupRef}
              role="radiogroup"
              aria-label="Reciter selection"
              className="space-y-2"
              onKeyDown={(e) => {
                const btns = Array.from(
                  reciterGroupRef.current?.querySelectorAll<HTMLElement>(
                    "[role=radio]",
                  ) ?? [],
                );
                handleRadioKeyboard(e, btns);
              }}
            >
              {reciterOptions.map((rec) => {
                const active = reciterId === rec.id;
                return (
                  <button
                    key={rec.id}
                    role="radio"
                    aria-checked={active}
                    tabIndex={active ? 0 : -1}
                    onClick={() => setReciterId(rec.id)}
                    data-analytics="setting_change"
                    data-analytics-setting="reciter"
                    data-analytics-value={rec.id}
                    data-analytics-reciter-name={rec.name}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
                      active
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                        : "border-transparent bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
                        active
                          ? "border-emerald-500 bg-emerald-500"
                          : "border-slate-300 dark:border-slate-600"
                      }`}
                    >
                      {active && (
                        <span className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium ${active ? "text-emerald-700 dark:text-emerald-400" : "text-slate-700 dark:text-slate-300"}`}
                    >
                      {rec.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* ─────────────────────── About ──────────────────────────────── */}
        </div>
      </div>
    </div>
  );
}
