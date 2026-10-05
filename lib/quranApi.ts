const BASE_URL = "https://quranapi.pages.dev/api";

// ─── Types ──────────────────────────────────────────────────────────────────────

export interface SurahInfo {
  surahName: string;
  surahNameArabic: string;
  surahNameArabicLong: string;
  surahNameTranslation: string;
  revelationPlace: string;
  totalAyah: number;
}

export interface AudioEntry {
  reciter: string;
  url: string;
  originalUrl: string;
}

export interface SurahDetail {
  surahName: string;
  surahNameArabic: string;
  surahNameArabicLong: string;
  surahNameTranslation: string;
  revelationPlace: string;
  totalAyah: number;
  surahNo: number;
  audio: Record<string, AudioEntry>;
  english: string[];
  arabic1: string[];
  arabic2: string[];
  bengali: string[];
  urdu: string[];
}

export interface VerseDetail {
  surahName: string;
  surahNameArabic: string;
  surahNameArabicLong: string;
  surahNameTranslation: string;
  revelationPlace: string;
  totalAyah: number;
  surahNo: number;
  ayahNo: number;
  audio: Record<string, AudioEntry>;
  english: string;
  arabic1: string;
  arabic2: string;
  bengali: string;
  urdu: string;
}

export interface Reciters {
  [key: string]: string;
}

// ─── API Functions ──────────────────────────────────────────────────────────────

/**
 * Fetch the list of all 114 surahs
 */
export async function fetchSurahList(): Promise<SurahInfo[]> {
  const res = await fetch(`${BASE_URL}/surah.json`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error("Failed to fetch surah list");
  return res.json();
}

/**
 * Fetch a complete surah with all verses
 */
export async function fetchSurah(surahNo: number): Promise<SurahDetail> {
  const res = await fetch(`${BASE_URL}/${surahNo}.json`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`Failed to fetch surah ${surahNo}`);
  return res.json();
}

/**
 * Fetch a single verse
 */
export async function fetchVerse(
  surahNo: number,
  ayahNo: number,
): Promise<VerseDetail> {
  const res = await fetch(`${BASE_URL}/${surahNo}/${ayahNo}.json`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`Failed to fetch verse ${surahNo}:${ayahNo}`);
  return res.json();
}

/**
 * Fetch audio data for a specific verse
 */
export async function fetchVerseAudio(
  surahNo: number,
  ayahNo: number,
): Promise<Record<string, AudioEntry>> {
  const res = await fetch(`${BASE_URL}/audio/${surahNo}/${ayahNo}.json`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok)
    throw new Error(`Failed to fetch audio for ${surahNo}:${ayahNo}`);
  return res.json();
}

/**
 * Fetch audio data for a full surah
 */
export async function fetchSurahAudio(
  surahNo: number,
): Promise<Record<string, AudioEntry>> {
  const res = await fetch(`${BASE_URL}/audio/${surahNo}.json`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`Failed to fetch surah audio ${surahNo}`);
  return res.json();
}

/**
 * Fetch available reciters
 */
export async function fetchReciters(): Promise<Reciters> {
  const res = await fetch(`${BASE_URL}/reciters.json`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error("Failed to fetch reciters");
  return res.json();
}

// ─── Helpers ────────────────────────────────────────────────────────────────────

/**
 * Get audio URL for a verse from a specific reciter
 */
export function getAudioUrl(
  audio: Record<string, AudioEntry>,
  reciterId: string = "1",
): string {
  return audio[reciterId]?.url || audio["1"]?.url || "";
}

/**
 * Convert surah number to padded string (e.g., 1 -> "001")
 */
export function padSurahNo(num: number): string {
  return num.toString().padStart(3, "0");
}

// ─── Transliteration (local JSON) ───────────────────────────────────────────────

import transliterationData from "@/transliterations/english-transliteration-tajweed.json";

const ALQURAN_BASE = "https://api.alquran.cloud/v1";

/**
 * Get English transliteration for a whole surah from local JSON data.
 * Returns an array of transliteration strings, one per ayah (0-indexed).
 */
export function getTransliteration(
  surahNo: number,
  totalAyah: number,
): string[] {
  const data = transliterationData as Record<string, string>;
  const result: string[] = [];
  for (let ayah = 1; ayah <= totalAyah; ayah++) {
    result.push(data[`${surahNo}:${ayah}`] || "");
  }
  return result;
}

/**
 * Edition identifiers for languages served via AlQuran Cloud.
 */
const ALQURAN_EDITIONS: Record<string, string> = {
  hindi: "hi.hindi",
};

/**
 * Fetch a translation from AlQuran Cloud for languages not available in the
 * primary Quran API (e.g. Hindi).
 * Returns an array of translated strings, one per ayah (0-indexed).
 */
export async function fetchAlQuranTranslation(
  surahNo: number,
  lang: string,
): Promise<string[]> {
  const edition = ALQURAN_EDITIONS[lang];
  if (!edition) return [];
  const res = await fetch(`${ALQURAN_BASE}/surah/${surahNo}/${edition}`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  const ayahs: { numberInSurah: number; text: string }[] =
    data?.data?.ayahs ?? [];
  return ayahs
    .sort((a, b) => a.numberInSurah - b.numberInSurah)
    .map((a) => a.text);
}
