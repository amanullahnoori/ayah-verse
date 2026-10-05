"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { type SurahInfo } from "@/lib/quranApi";

interface SearchBarProps {
  surahs: SurahInfo[];
  className?: string;
}

export default function SearchBar({ surahs, className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<(SurahInfo & { index: number })[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase().trim();
    const filtered = surahs
      .map((s, i) => ({ ...s, index: i + 1 }))
      .filter(
        (s) =>
          s.surahName.toLowerCase().includes(q) ||
          s.surahNameTranslation.toLowerCase().includes(q) ||
          s.surahNameArabic.includes(q) ||
          s.index.toString() === q,
      )
      .slice(0, 10);

    setResults(filtered);
    setActiveIndex(-1);
  }, [query, surahs]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (surahNo: number) => {
    router.push(`/quran/${surahNo}`);
    setIsOpen(false);
    setQuery("");
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < results.length) {
          handleSelect(results[activeIndex].index);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setActiveIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${
        isOpen && results.length > 0 ? "z-50" : ""
      } ${className}`}
    >
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          data-analytics="search_focus"
          data-analytics-action="focus"
          onKeyDown={handleKeyDown}
          placeholder="Search surahs by name or number..."
          role="combobox"
          aria-expanded={isOpen && results.length > 0}
          aria-controls="search-results"
          aria-activedescendant={
            activeIndex >= 0 ? `search-result-${activeIndex}` : undefined
          }
          aria-label="Search surahs"
          autoComplete="off"
          className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200 shadow-sm"
        />
      </div>

      {/* Results dropdown */}
      {isOpen && results.length > 0 && (
        <ul
          id="search-results"
          role="listbox"
          aria-label="Search results"
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden z-50 animate-fade-in"
        >
          {results.map((surah, idx) => (
            <li
              key={surah.index}
              id={`search-result-${idx}`}
              role="option"
              aria-selected={idx === activeIndex}
            >
              <button
                onClick={() => handleSelect(surah.index)}
                data-analytics="search_select"
                data-analytics-surah-id={String(surah.index)}
                data-analytics-surah-name={surah.surahName}
                data-analytics-query={query}
                className={`w-full flex items-center gap-4 px-4 py-3 transition-colors text-left ${
                  idx === activeIndex
                    ? "bg-emerald-50 dark:bg-emerald-900/20"
                    : "hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                }`}
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-sm font-bold text-emerald-700 dark:text-emerald-400">
                  {surah.index}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                    {surah.surahName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {surah.surahNameTranslation} • {surah.totalAyah} verses
                  </p>
                </div>
                <span className="text-right text-lg arabic-text text-slate-600 dark:text-slate-300">
                  {surah.surahNameArabic}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
