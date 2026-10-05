"use client";

import { useState, useCallback, useEffect } from "react";
import { useSettings } from "@/context/SettingsContext";

interface MushafPageViewProps {
  /** 0-indexed array of ayah texts (either Uthmani or Indopak) */
  ayahs: string[];
  surahNo: number;
  surahName: string;
  surahNameArabic: string;
}

/**
 * Renders Quran text in a beautiful single-page mushaf layout with
 * page-by-page navigation, ornamental borders, verse medallions,
 * and a warm parchment aesthetic. Fully responsive.
 */
export default function MushafPageView({
  ayahs,
  surahNo,
  surahName,
  surahNameArabic,
}: MushafPageViewProps) {
  const { arabicScript, zoomLevel } = useSettings();
  const isIndopak = arabicScript === "indopak";
  const scale = zoomLevel / 100;

  const AYAHS_PER_PAGE = 15;
  const [currentPage, setCurrentPage] = useState(0);

  // Track surah changes to reset page
  const [prevSurahNo, setPrevSurahNo] = useState(surahNo);
  if (prevSurahNo !== surahNo) {
    setPrevSurahNo(surahNo);
    setCurrentPage(0);
  }

  // Bismillah detection & stripping for Uthmani
  const UTHMANI_BISMILLAH = "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ";
  // Show Bismillah for all surahs except At-Tawbah (9)
  const shouldShowBismillah = surahNo !== 9;

  // For Uthmani (non-surah-1), strip Bismillah from the first ayah if present
  // For surah 1, Bismillah IS ayah 1 — show header but keep the ayah intact
  const processedAyahs = (() => {
    if (
      !shouldShowBismillah ||
      isIndopak ||
      ayahs.length === 0 ||
      surahNo === 1
    )
      return ayahs;
    const first = ayahs[0];
    if (first.startsWith(UTHMANI_BISMILLAH)) {
      const stripped = first.slice(UTHMANI_BISMILLAH.length).trim();
      return [stripped, ...ayahs.slice(1)];
    }
    return ayahs;
  })();

  // Build pages
  const pages: {
    startAyah: number;
    endAyah: number;
    ayahData: { text: string; no: number }[];
  }[] = [];
  for (let i = 0; i < processedAyahs.length; i += AYAHS_PER_PAGE) {
    const chunk = processedAyahs.slice(i, i + AYAHS_PER_PAGE);
    pages.push({
      startAyah: i + 1,
      endAyah: Math.min(i + AYAHS_PER_PAGE, processedAyahs.length),
      ayahData: chunk.map((text, idx) => ({ text, no: i + idx + 1 })),
    });
  }

  const totalPages = pages.length;
  const page = pages[currentPage];

  const goNext = useCallback(() => {
    setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
  }, [totalPages]);

  const goPrev = useCallback(() => {
    setCurrentPage((p) => Math.max(p - 1, 0));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goNext(); // RTL: left = next
      if (e.key === "ArrowRight") goPrev(); // RTL: right = prev
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  // Scroll to top when page or surah changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, surahNo]);

  // Build continuous text with inline verse markers
  const showBismillah = currentPage === 0 && shouldShowBismillah;

  // Font class for mushaf body text
  const fontClass = isIndopak ? "indopak-text" : "arabic-text";

  return (
    <div
      className="mushaf-wrapper"
      role="region"
      aria-label={`Mushaf view of Surah ${surahName}`}
    >
      {/* ── The Page ───────────────────────────────────────────── */}
      <div
        className="mushaf-page relative mx-auto overflow-hidden bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800"
        role="article"
        aria-label={`Page ${currentPage + 1} of ${totalPages}, verses ${page.startAyah} to ${page.endAyah}`}
        aria-live="polite"
      >
        {/* Outer ornamental border */}
        <div
          className="mushaf-border-outer absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />
        {/* Inner ornamental border */}
        <div
          className="mushaf-border-inner absolute inset-[6px] sm:inset-[10px] pointer-events-none"
          aria-hidden="true"
        />
        {/* Corner ornaments */}
        <div className="mushaf-corner mushaf-corner-tl" aria-hidden="true" />
        <div className="mushaf-corner mushaf-corner-tr" aria-hidden="true" />
        <div className="mushaf-corner mushaf-corner-bl" aria-hidden="true" />
        <div className="mushaf-corner mushaf-corner-br" aria-hidden="true" />

        {/* Content area */}
        <div className="relative z-10 flex flex-col h-full min-h-[65vh] sm:min-h-[72vh]">
          {/* Bismillah — centered on the page */}
          {showBismillah && (
            <div className="flex items-center justify-center px-6 sm:px-10 pt-8 sm:pt-12 pb-2">
              <div className="text-center">
                <div
                  className="flex items-center justify-center gap-3 mb-3"
                  aria-hidden="true"
                >
                  <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-emerald-400/40" />
                  <span className="text-emerald-500/50 dark:text-emerald-500/30 text-xs select-none">
                    ✦
                  </span>
                  <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-emerald-400/40" />
                </div>
                <p
                  className={`${fontClass} text-slate-900 dark:text-slate-100`}
                  lang="ar"
                  role="heading"
                  aria-level={2}
                  style={{
                    fontSize: `${1.5 * scale}rem`,
                    lineHeight: 2.4,
                    textAlign: "center",
                  }}
                >
                  {isIndopak
                    ? "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِیْمِ"
                    : "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ"}
                </p>
                <div
                  className="flex items-center justify-center gap-3 mt-3"
                  aria-hidden="true"
                >
                  <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-emerald-400/40" />
                  <span className="text-emerald-500/50 dark:text-emerald-500/30 text-xs select-none">
                    ✦
                  </span>
                  <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-emerald-400/40" />
                </div>
              </div>
            </div>
          )}

          {/* Quran text body */}
          <div className="flex-1 px-5 sm:px-8 md:px-12 py-4 sm:py-6">
            <p
              className={`${fontClass} mushaf-text text-slate-900 dark:text-slate-100`}
              lang="ar"
              style={{
                fontSize: `${1.8 * scale}rem`,
                lineHeight: 3.2,
                textAlign: "justify",
                textAlignLast: "center",
                direction: "rtl",
              }}
            >
              {page.ayahData.map(({ text, no }, idx) => (
                <span key={no}>
                  {text}{" "}
                  {!isIndopak && (
                    <span
                      className="ayah-marker"
                      style={{ fontSize: `${1.1 * scale}rem` }}
                      aria-label={`Verse ${no}`}
                    >
                      {toArabicNumeral(no)}
                    </span>
                  )}
                  {idx < page.ayahData.length - 1 ? " " : ""}
                </span>
              ))}
            </p>
          </div>

          {/* Ayah range + page number */}
          <div className="pb-4 pt-2 text-center">
            <span className="mushaf-page-number text-[11px] text-slate-400 dark:text-slate-500 font-medium tracking-wider">
              {page.startAyah}–{page.endAyah} &nbsp;·&nbsp; {currentPage + 1} /{" "}
              {totalPages}
            </span>
          </div>
        </div>
      </div>

      {/* End of Surah — only on last page */}
      {currentPage === totalPages - 1 && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4 text-slate-400 dark:text-slate-500">
            <div className="w-16 h-px bg-slate-200 dark:bg-slate-700" />
            <span className="text-sm font-medium">End of {surahName}</span>
            <div className="w-16 h-px bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      )}

      {/* ── Page Navigation ───────────────────────────────────── */}
      {totalPages > 1 && (
        <nav
          className="flex items-center justify-center gap-2 mt-5"
          aria-label="Mushaf page navigation"
        >
          <button
            onClick={goPrev}
            disabled={currentPage === 0}
            aria-label={`Previous page (${currentPage} of ${totalPages})`}
            data-analytics="mushaf_navigate"
            data-analytics-direction="previous"
            data-analytics-page={String(currentPage + 1)}
            data-analytics-surah-id={String(surahNo)}
            className="mushaf-nav-btn group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
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
          </button>

          {/* Page dots / compact pagination */}
          <div
            className="flex items-center gap-1 px-2"
            role="tablist"
            aria-label="Page selector"
          >
            {totalPages <= 10 ? (
              // Show dots for small surah
              pages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  role="tab"
                  aria-selected={idx === currentPage}
                  aria-label={`Page ${idx + 1}`}
                  data-analytics="mushaf_page_select"
                  data-analytics-page={String(idx + 1)}
                  data-analytics-surah-id={String(surahNo)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    idx === currentPage
                      ? "bg-emerald-500 dark:bg-emerald-400 w-4"
                      : "bg-slate-300/60 dark:bg-slate-600/40 hover:bg-slate-400/60"
                  }`}
                />
              ))
            ) : (
              // Compact page selector for long surahs
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                aria-label={`Select page, currently page ${currentPage + 1} of ${totalPages}`}
                data-analytics="mushaf_page_select"
                data-analytics-surah-id={String(surahNo)}
                className="bg-transparent text-sm text-slate-700 dark:text-slate-300 border border-slate-300/60 dark:border-slate-600/40 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {pages.map((_, idx) => (
                  <option key={idx} value={idx}>
                    Page {idx + 1}
                  </option>
                ))}
              </select>
            )}
          </div>

          <button
            onClick={goNext}
            disabled={currentPage === totalPages - 1}
            aria-label={`Next page (${currentPage + 2} of ${totalPages})`}
            data-analytics="mushaf_navigate"
            data-analytics-direction="next"
            data-analytics-page={String(currentPage + 1)}
            data-analytics-surah-id={String(surahNo)}
            className="mushaf-nav-btn group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
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
          </button>
        </nav>
      )}
    </div>
  );
}

/** Convert number to Arabic-Indic numerals: 0–9 → ٠–٩ */
function toArabicNumeral(n: number): string {
  return n
    .toString()
    .replace(/\d/g, (d) => String.fromCharCode(0x0660 + parseInt(d)));
}
