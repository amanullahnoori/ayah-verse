/**
 * Client-side cache for surah data using localStorage.
 * Allows previously-visited surahs to be rendered offline.
 *
 * Limits:
 *  - Max 15 cached surahs (LRU eviction)
 *  - Entries expire after 7 days and are refreshed on next visit
 *  - Automatic cleanup runs on every write
 */

import type { SurahDetail } from "@/lib/quranApi";

const CACHE_KEY_PREFIX = "ayahverse-surah-";
const INDEX_KEY = "ayahverse-surah-index";
const MAX_CACHED_SURAHS = 15;
const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface CachedSurah {
  surah: SurahDetail;
  indopakAyahs: string[];
  cachedAt: number;
}

/** Ordered list of cached surah numbers (oldest → newest). */
function getIndex(): number[] {
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setIndex(idx: number[]): void {
  try {
    localStorage.setItem(INDEX_KEY, JSON.stringify(idx));
  } catch {
    // ignore
  }
}

/**
 * Evict the oldest entries so we never exceed MAX_CACHED_SURAHS,
 * and remove anything older than TTL_MS.
 */
function cleanup(): void {
  try {
    let idx = getIndex();
    const now = Date.now();

    // Remove expired entries
    idx = idx.filter((no) => {
      const raw = localStorage.getItem(`${CACHE_KEY_PREFIX}${no}`);
      if (!raw) return false;
      try {
        const data: CachedSurah = JSON.parse(raw);
        if (now - data.cachedAt > TTL_MS) {
          localStorage.removeItem(`${CACHE_KEY_PREFIX}${no}`);
          return false;
        }
        return true;
      } catch {
        localStorage.removeItem(`${CACHE_KEY_PREFIX}${no}`);
        return false;
      }
    });

    // Evict oldest if over limit
    while (idx.length > MAX_CACHED_SURAHS) {
      const oldest = idx.shift()!;
      localStorage.removeItem(`${CACHE_KEY_PREFIX}${oldest}`);
    }

    setIndex(idx);
  } catch {
    // ignore
  }
}

/**
 * Save surah data + indopak ayahs to localStorage.
 * Uses LRU: the most-recently-viewed surah is moved to the end of the index.
 */
export function cacheSurah(
  surahNo: number,
  surah: SurahDetail,
  indopakAyahs: string[],
): void {
  try {
    const data: CachedSurah = { surah, indopakAyahs, cachedAt: Date.now() };
    localStorage.setItem(`${CACHE_KEY_PREFIX}${surahNo}`, JSON.stringify(data));

    // Update LRU index — move this surah to the end (most recent)
    const idx = getIndex().filter((n) => n !== surahNo);
    idx.push(surahNo);
    setIndex(idx);

    // Run cleanup after write
    cleanup();
  } catch {
    // localStorage full or unavailable — try evicting one and retry once
    try {
      const idx = getIndex();
      if (idx.length > 0) {
        const oldest = idx.shift()!;
        localStorage.removeItem(`${CACHE_KEY_PREFIX}${oldest}`);
        setIndex(idx);
        // Retry the write
        const data: CachedSurah = { surah, indopakAyahs, cachedAt: Date.now() };
        localStorage.setItem(
          `${CACHE_KEY_PREFIX}${surahNo}`,
          JSON.stringify(data),
        );
        const newIdx = idx.filter((n) => n !== surahNo);
        newIdx.push(surahNo);
        setIndex(newIdx);
      }
    } catch {
      // give up silently
    }
  }
}

/**
 * Load cached surah data from localStorage.
 * Returns null if not cached or expired.
 */
export function getCachedSurah(
  surahNo: number,
): { surah: SurahDetail; indopakAyahs: string[] } | null {
  try {
    const raw = localStorage.getItem(`${CACHE_KEY_PREFIX}${surahNo}`);
    if (!raw) return null;
    const data: CachedSurah = JSON.parse(raw);
    if (!data.surah || !data.indopakAyahs) return null;

    // Expired → remove and return null
    if (Date.now() - data.cachedAt > TTL_MS) {
      localStorage.removeItem(`${CACHE_KEY_PREFIX}${surahNo}`);
      const idx = getIndex().filter((n) => n !== surahNo);
      setIndex(idx);
      return null;
    }

    return { surah: data.surah, indopakAyahs: data.indopakAyahs };
  } catch {
    return null;
  }
}

/**
 * Run a full cleanup pass — call this on app startup to prune stale data.
 */
export function pruneCache(): void {
  cleanup();
}
