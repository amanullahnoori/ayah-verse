"use client";

import Link from "next/link";
import {
  type SurahDetail,
  getTransliteration,
  fetchAlQuranTranslation,
  getAudioUrl,
} from "@/lib/quranApi";
import { toDevanagari } from "@/lib/transliterate";
import { useSettings } from "@/context/SettingsContext";
import QuranVerse from "@/components/QuranVerse";
import MushafPageView from "@/components/MushafPageView";
import ZoomControls from "@/components/ZoomControls";
import { useEffect, useState, useCallback, useRef } from "react";
import { useAudio } from "@/context/AudioContext";
import { cacheSurah } from "@/lib/surahCache";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

interface SurahDetailClientProps {
  surah: SurahDetail;
  indopakAyahs: string[];
}

export default function SurahDetailClient({
  surah,
  indopakAyahs,
}: SurahDetailClientProps) {
  const isOnline = useOnlineStatus();

  // Cache surah data for offline access
  useEffect(() => {
    cacheSurah(surah.surahNo, surah, indopakAyahs);
  }, [surah, indopakAyahs]);
  const {
    showTranslation,
    setShowTranslation,
    showTransliteration,
    setShowTransliteration,
    transliterationLang,
    translationLang,
    reciterId,
    arabicScript,
    readingMode,
    setReadingMode,
  } = useSettings();
  const { currentAyah, currentSurah, isPlaying, play, stop, onEnded } =
    useAudio();
  const transliterations = getTransliteration(surah.surahNo, surah.totalAyah);
  const [isContinuousPlay, setIsContinuousPlay] = useState(false);
  const audioPerVerseRef = useRef<
    Record<
      number,
      Record<string, { reciter: string; url: string; originalUrl: string }>
    >
  >({});
  const [audioPerVerse, setAudioPerVerse] = useState<
    Record<
      number,
      Record<string, { reciter: string; url: string; originalUrl: string }>
    >
  >({});

  // Fetch audio for each verse lazily
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const loadAudio = async () => {
      const audioMap: typeof audioPerVerse = {};
      const promises = Array.from({ length: surah.totalAyah }, (_, i) => {
        const ayahNo = i + 1;
        return fetch(
          `https://quranapi.pages.dev/api/audio/${surah.surahNo}/${ayahNo}.json`,
          { signal },
        )
          .then((r) => r.json())
          .then((data) => {
            audioMap[ayahNo] = data;
          })
          .catch(() => {});
      });

      // Load in chunks of 20 to balance speed and network pressure
      for (let i = 0; i < promises.length; i += 20) {
        if (signal.aborted) return;
        await Promise.all(promises.slice(i, i + 20));
        // Yield intermediate results so first verses become playable faster
        if (!signal.aborted) {
          setAudioPerVerse((prev) => ({ ...prev, ...audioMap }));
        }
      }
    };

    loadAudio();
    return () => controller.abort();
  }, [surah.surahNo, surah.totalAyah]);

  // Fetch external translations (Hindi) from AlQuran Cloud
  const needsExternalTranslation = translationLang === "hindi";
  const [externalTranslation, setExternalTranslation] = useState<string[]>([]);
  useEffect(() => {
    if (!needsExternalTranslation) return;
    let cancelled = false;
    fetchAlQuranTranslation(surah.surahNo, translationLang).then((data) => {
      if (!cancelled) setExternalTranslation(data);
    });
    return () => {
      cancelled = true;
    };
  }, [surah.surahNo, translationLang, needsExternalTranslation]);

  // Auto-scroll to playing verse
  useEffect(() => {
    if (isPlaying && currentSurah === surah.surahNo && currentAyah) {
      const el = document.getElementById(
        `verse-${surah.surahNo}-${currentAyah}`,
      );
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [currentAyah, currentSurah, isPlaying, surah.surahNo]);

  // Keep audioPerVerseRef in sync
  useEffect(() => {
    audioPerVerseRef.current = audioPerVerse;
  }, [audioPerVerse]);

  // Auto-play next verse when current verse ends
  const playNextVerse = useCallback(() => {
    if (!isContinuousPlay) return;
    if (currentSurah !== surah.surahNo) return;
    if (currentAyah === null) return;

    const nextAyah = currentAyah + 1;
    if (nextAyah > surah.totalAyah) {
      // Reached end of surah
      setIsContinuousPlay(false);
      return;
    }

    const nextAudio = audioPerVerseRef.current[nextAyah];
    if (nextAudio) {
      const url = getAudioUrl(nextAudio, reciterId);
      if (url) {
        play(url, surah.surahNo, nextAyah);
      }
    }
  }, [
    isContinuousPlay,
    currentSurah,
    currentAyah,
    surah.surahNo,
    surah.totalAyah,
    reciterId,
    play,
  ]);

  // Register onEnded callback
  useEffect(() => {
    onEnded(playNextVerse);
    return () => onEnded(null);
  }, [playNextVerse, onEnded]);

  // Play entire surah from verse 1
  const playSurah = useCallback(() => {
    setIsContinuousPlay(true);
    const firstAudio = audioPerVerse[1];
    if (firstAudio) {
      const url = getAudioUrl(firstAudio, reciterId);
      if (url) {
        play(url, surah.surahNo, 1);
      }
    }
  }, [audioPerVerse, reciterId, play, surah.surahNo]);

  const stopSurah = useCallback(() => {
    setIsContinuousPlay(false);
    stop();
  }, [stop]);

  const getTranslation = (index: number): string => {
    switch (translationLang) {
      case "urdu":
        return surah.urdu?.[index] || surah.english[index];
      case "bengali":
        return surah.bengali?.[index] || surah.english[index];
      case "hindi":
        return (
          (needsExternalTranslation && externalTranslation[index]) ||
          surah.english[index]
        );
      default:
        return surah.english[index];
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 md:pt-24 pb-24 md:pb-24">
      <div className="max-w-3xl mx-auto px-4">
        {/* Back button */}
        <Link
          href="/quran"
          data-analytics="nav_click"
          data-analytics-destination="/quran"
          data-analytics-label="back_to_surahs"
          data-analytics-from-surah={String(surah.surahNo)}
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mb-6"
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
          Back to Surahs
        </Link>

        {/* Surah Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white mb-8">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 text-center">
            <p className="text-4xl arabic-text mb-3 opacity-90">
              {surah.surahNameArabicLong}
            </p>
            <h1 className="text-2xl font-bold mb-1">{surah.surahName}</h1>
            <p className="text-emerald-100 mb-4">
              {surah.surahNameTranslation}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-emerald-200">
              <span>{surah.revelationPlace}</span>
              <span>•</span>
              <span>{surah.totalAyah} Verses</span>
              <span>•</span>
              <span>Surah {surah.surahNo}</span>
            </div>
          </div>

          {/* Navigation between surahs */}
          <div className="relative z-10 flex items-center justify-between mt-6">
            {surah.surahNo > 1 ? (
              <Link
                href={`/quran/${surah.surahNo - 1}`}
                className="flex items-center gap-1 text-sm text-emerald-200 hover:text-white transition-colors"
                data-analytics="surah_navigate"
                data-analytics-direction="previous"
                data-analytics-from-surah={String(surah.surahNo)}
                data-analytics-to-surah={String(surah.surahNo - 1)}
                data-analytics-surah-name={surah.surahName}
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
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
                Previous
              </Link>
            ) : (
              <div />
            )}
            {surah.surahNo < 114 && (
              <Link
                href={`/quran/${surah.surahNo + 1}`}
                className="flex items-center gap-1 text-sm text-emerald-200 hover:text-white transition-colors"
                data-analytics="surah_navigate"
                data-analytics-direction="next"
                data-analytics-from-surah={String(surah.surahNo)}
                data-analytics-to-surah={String(surah.surahNo + 1)}
                data-analytics-surah-name={surah.surahName}
              >
                Next
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
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* ── Controls Toolbar ─────────────────────────────────── */}
        <div className="sticky top-16 md:top-20 z-20 -mx-4 px-4 py-2.5 mb-6 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60">
          {/* Row 1: View toggle + Zoom + Audio */}
          <div className="flex items-center justify-between gap-2">
            {/* Left group: View mode toggle */}
            <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800/80 p-0.5">
              <button
                onClick={() => setReadingMode("verse")}
                role="radio"
                aria-checked={readingMode === "verse"}
                data-analytics="reading_mode_switch"
                data-analytics-value="verse"
                data-analytics-surah-id={String(surah.surahNo)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-medium transition-all duration-200 ${
                  readingMode === "verse"
                    ? "bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
                aria-label="Verse by verse view"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <span className="hidden xs:inline">Verse</span>
              </button>
              <button
                onClick={() => setReadingMode("page")}
                role="radio"
                aria-checked={readingMode === "page"}
                data-analytics="reading_mode_switch"
                data-analytics-value="page"
                data-analytics-surah-id={String(surah.surahNo)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-medium transition-all duration-200 ${
                  readingMode === "page"
                    ? "bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
                aria-label="Page view like Quran"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
                <span className="hidden xs:inline">Page</span>
              </button>
            </div>

            {/* Center: Zoom controls */}
            <ZoomControls />

            {/* Right group: Audio + Text toggles */}
            <div className="flex items-center gap-1.5">
              {/* Play/Stop Surah */}
              <button
                onClick={
                  !isOnline
                    ? undefined
                    : isContinuousPlay &&
                        isPlaying &&
                        currentSurah === surah.surahNo
                      ? stopSurah
                      : playSurah
                }
                disabled={!isOnline}
                data-analytics="surah_details_audio_control"
                data-analytics-action={
                  isContinuousPlay &&
                  isPlaying &&
                  currentSurah === surah.surahNo
                    ? "stop_surah"
                    : "play_surah"
                }
                data-analytics-surah-id={String(surah.surahNo)}
                data-analytics-surah-name={surah.surahName}
                title={
                  !isOnline
                    ? "Audio unavailable offline"
                    : isContinuousPlay &&
                        isPlaying &&
                        currentSurah === surah.surahNo
                      ? "Stop Surah"
                      : "Play Surah"
                }
                className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  !isOnline
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 border border-slate-200 dark:border-slate-700 cursor-not-allowed"
                    : isContinuousPlay &&
                        isPlaying &&
                        currentSurah === surah.surahNo
                      ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800"
                      : "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                }`}
              >
                {!isOnline ? (
                  <>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                      />
                    </svg>
                    <span className="hidden sm:inline">Offline</span>
                  </>
                ) : isContinuousPlay &&
                  isPlaying &&
                  currentSurah === surah.surahNo ? (
                  <>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 6h12v12H6z" />
                    </svg>
                    <span className="hidden sm:inline">Stop</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span className="hidden sm:inline">Play</span>
                  </>
                )}
              </button>

              {/* Divider + Transliteration/Translation toggles — verse mode only */}
              {readingMode === "verse" && (
                <>
                  {/* Divider */}
                  <div className="hidden sm:block w-px h-5 bg-slate-200 dark:bg-slate-700" />

                  {/* Transliteration toggle */}
                  <button
                    onClick={() => setShowTransliteration(!showTransliteration)}
                    data-analytics="toggle_control"
                    data-analytics-setting="transliteration"
                    data-analytics-value={showTransliteration ? "hide" : "show"}
                    data-analytics-surah-id={String(surah.surahNo)}
                    title={`${showTransliteration ? "Hide" : "Show"} Transliteration`}
                    className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                      showTransliteration
                        ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                        : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
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
                    <span className="hidden md:inline">
                      {showTransliteration ? "Hide" : ""} Translit.
                    </span>
                  </button>

                  {/* Translation toggle */}
                  <button
                    onClick={() => setShowTranslation(!showTranslation)}
                    data-analytics="toggle_control"
                    data-analytics-setting="translation"
                    data-analytics-value={showTranslation ? "hide" : "show"}
                    data-analytics-surah-id={String(surah.surahNo)}
                    title={`${showTranslation ? "Hide" : "Show"} Translation`}
                    className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                      showTranslation
                        ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                        : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
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
                    <span className="hidden md:inline">
                      {showTranslation ? "Hide" : ""} Transl.
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Conditional rendering based on reading mode */}
        {readingMode === "page" ? (
          <MushafPageView
            ayahs={
              arabicScript === "indopak" && indopakAyahs.length > 0
                ? indopakAyahs
                : surah.arabic1
            }
            surahNo={surah.surahNo}
            surahName={surah.surahName}
            surahNameArabic={surah.surahNameArabicLong}
          />
        ) : (
          <>
            {/* Verses */}
            <div className="space-y-4">
              {surah.arabic1.map((arabic, index) => {
                const ayahNo = index + 1;
                let displayArabic =
                  arabicScript === "indopak" && indopakAyahs[index]
                    ? indopakAyahs[index]
                    : arabic;
                // Strip Bismillah from ayah 1 for non-Fatiha, non-Tawbah surahs
                if (
                  ayahNo === 1 &&
                  surah.surahNo !== 1 &&
                  surah.surahNo !== 9
                ) {
                  const uthmani = "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ";
                  if (displayArabic.startsWith(uthmani)) {
                    displayArabic = displayArabic.slice(uthmani.length).trim();
                  }
                }
                return (
                  <QuranVerse
                    key={ayahNo}
                    surahNo={surah.surahNo}
                    ayahNo={ayahNo}
                    arabic={displayArabic}
                    arabicScript={arabicScript}
                    transliteration={
                      transliterationLang === "hindi"
                        ? toDevanagari(transliterations[index] || "")
                        : transliterations[index]
                    }
                    translation={getTranslation(index)}
                    surahName={surah.surahName}
                    surahNameArabic={surah.surahNameArabic}
                    audio={audioPerVerse[ayahNo] || {}}
                    onPlay={() => setIsContinuousPlay(true)}
                  />
                );
              })}
            </div>
          </>
        )}

        {/* End of Surah — only in verse mode (page mode handles it internally) */}
        {readingMode !== "page" && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 text-slate-400 dark:text-slate-500">
              <div className="w-16 h-px bg-slate-200 dark:bg-slate-700" />
              <span className="text-sm font-medium">
                End of {surah.surahName}
              </span>
              <div className="w-16 h-px bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
        )}

        {/* Prev / Next Surah navigation — always visible */}
        <div className="mt-6 flex items-center justify-center gap-4">
          {surah.surahNo > 1 && (
            <Link
              href={`/quran/${surah.surahNo - 1}`}
              data-analytics="surah_navigate"
              data-analytics-direction="previous"
              data-analytics-from-surah={String(surah.surahNo)}
              data-analytics-to-surah={String(surah.surahNo - 1)}
              data-analytics-location="bottom"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
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
              Previous Surah
            </Link>
          )}
          {surah.surahNo < 114 && (
            <Link
              href={`/quran/${surah.surahNo + 1}`}
              data-analytics="surah_navigate"
              data-analytics-direction="next"
              data-analytics-from-surah={String(surah.surahNo)}
              data-analytics-to-surah={String(surah.surahNo + 1)}
              data-analytics-location="bottom"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-md shadow-emerald-600/30 hover:shadow-lg"
            >
              Next Surah
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
          )}
        </div>
      </div>
    </div>
  );
}
