"use client";

import { memo } from "react";
import { useBookmarks } from "@/context/BookmarkContext";
import { useAudio } from "@/context/AudioContext";
import { useSettings } from "@/context/SettingsContext";
import { getAudioUrl, type AudioEntry } from "@/lib/quranApi";
import type { ArabicScript } from "@/context/SettingsContext";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

interface QuranVerseProps {
  surahNo: number;
  ayahNo: number;
  arabic: string;
  arabicScript?: ArabicScript;
  transliteration?: string;
  translation: string;
  surahName: string;
  surahNameArabic: string;
  audio: Record<string, AudioEntry>;
  onPlay?: () => void;
}

export default memo(function QuranVerse({
  surahNo,
  ayahNo,
  arabic,
  arabicScript = "uthmani",
  transliteration,
  translation,
  surahName,
  surahNameArabic,
  audio,
  onPlay,
}: QuranVerseProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { play, isPlaying, currentSurah, currentAyah, pause, resume } =
    useAudio();
  const { showTranslation, showTransliteration, fontSizeStyles, reciterId } =
    useSettings();

  const isOnline = useOnlineStatus();
  const bookmarked = isBookmarked(surahNo, ayahNo);
  const isCurrentVerse = currentSurah === surahNo && currentAyah === ayahNo;
  const hasAudio = isOnline && Object.keys(audio).length > 0;

  const handlePlay = () => {
    if (isCurrentVerse && isPlaying) {
      pause();
    } else if (isCurrentVerse && !isPlaying) {
      resume();
    } else {
      const url = getAudioUrl(audio, reciterId);
      if (url) {
        play(url, surahNo, ayahNo);
        onPlay?.();
      }
    }
  };

  const handleBookmark = () => {
    toggleBookmark({
      surahNo,
      ayahNo,
      surahName,
      surahNameArabic,
      arabicText: arabic,
      englishText: translation,
    });
  };

  return (
    <div
      id={`verse-${surahNo}-${ayahNo}`}
      className={`group relative p-5 md:p-6 rounded-2xl border transition-all duration-300 ${
        isCurrentVerse && isPlaying
          ? "verse-playing bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800"
          : "bg-white dark:bg-slate-800/50 border-slate-100 dark:border-slate-700/50 hover:border-emerald-200 dark:hover:border-emerald-800/50 hover:shadow-md hover:shadow-emerald-50 dark:hover:shadow-none"
      }`}
    >
      {/* Verse number badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-bold">
            {ayahNo}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={hasAudio ? handlePlay : undefined}
            disabled={!hasAudio}
            className={`p-2 rounded-xl transition-all duration-200 ${
              !hasAudio
                ? "text-slate-300 dark:text-slate-600 cursor-not-allowed"
                : isCurrentVerse && isPlaying
                  ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600"
                  : "hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-emerald-600"
            }`}
            aria-label={
              !hasAudio
                ? "Audio unavailable offline"
                : isCurrentVerse && isPlaying
                  ? "Pause"
                  : "Play verse"
            }
            title={!hasAudio ? "Audio unavailable offline" : undefined}
            data-analytics="verse_audio"
            data-analytics-action={
              isCurrentVerse && isPlaying ? "pause" : "play"
            }
            data-analytics-surah-id={String(surahNo)}
            data-analytics-ayah={String(ayahNo)}
            data-analytics-surah-name={surahName}
          >
            {isCurrentVerse && isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            onClick={handleBookmark}
            className={`p-2 rounded-xl transition-all duration-200 ${
              bookmarked
                ? "bg-amber-50 dark:bg-amber-900/30 text-amber-500"
                : "hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-amber-500"
            }`}
            aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
            data-analytics="verse_bookmark"
            data-analytics-action={bookmarked ? "remove" : "add"}
            data-analytics-surah-id={String(surahNo)}
            data-analytics-ayah={String(ayahNo)}
            data-analytics-surah-name={surahName}
          >
            <svg
              className="w-5 h-5"
              fill={bookmarked ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Arabic text */}
      <p
        className={`${arabicScript === "indopak" ? "indopak-text" : "arabic-text"} text-slate-900 dark:text-slate-100 mb-4 overflow-wrap-anywhere`}
        style={fontSizeStyles.arabic}
      >
        {arabic}
      </p>

      {/* Transliteration */}
      {showTransliteration && transliteration && (
        <p
          className="text-emerald-700 dark:text-emerald-400 italic mb-3"
          style={fontSizeStyles.transliteration}
        >
          {transliteration}
        </p>
      )}

      {/* Translation */}
      {showTranslation && (
        <p
          className="text-slate-500 dark:text-slate-400"
          style={fontSizeStyles.translation}
        >
          {translation}
        </p>
      )}

      {/* Mobile action buttons - always visible */}
      <div className="flex items-center gap-2 mt-4 md:hidden">
        <button
          onClick={hasAudio ? handlePlay : undefined}
          disabled={!hasAudio}
          data-analytics="verse_audio"
          data-analytics-action={isCurrentVerse && isPlaying ? "pause" : "play"}
          data-analytics-surah-id={String(surahNo)}
          data-analytics-ayah={String(ayahNo)}
          data-analytics-surah-name={surahName}
          data-analytics-device="mobile"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            !hasAudio
              ? "bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed"
              : isCurrentVerse && isPlaying
                ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600"
                : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
          }`}
        >
          {!hasAudio ? (
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
          ) : isCurrentVerse && isPlaying ? (
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
          {!hasAudio
            ? "Offline"
            : isCurrentVerse && isPlaying
              ? "Pause"
              : "Play"}
        </button>
        <button
          onClick={handleBookmark}
          data-analytics="verse_bookmark"
          data-analytics-action={bookmarked ? "remove" : "add"}
          data-analytics-surah-id={String(surahNo)}
          data-analytics-ayah={String(ayahNo)}
          data-analytics-surah-name={surahName}
          data-analytics-device="mobile"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            bookmarked
              ? "bg-amber-50 dark:bg-amber-900/30 text-amber-600"
              : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
          }`}
        >
          <svg
            className="w-3.5 h-3.5"
            fill={bookmarked ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
          {bookmarked ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
});
