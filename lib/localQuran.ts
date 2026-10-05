/**
 * Server-side utility for reading local Indopak Quran data.
 *
 * Word-by-word Indopak Arabic text from `local-quran/indopak-nastaleeq.json`.
 * This module is intended for use in server components only.
 */

import fs from "fs";
import path from "path";

// ─── Types ──────────────────────────────────────────────────────────────────────

interface WordEntry {
  id: number;
  surah: string;
  ayah: string;
  word: string;
  location: string;
  text: string;
}

// ─── Cached data ────────────────────────────────────────────────────────────────

let _wordData: Record<string, WordEntry> | null = null;

function getWordData(): Record<string, WordEntry> {
  if (!_wordData) {
    const filePath = path.join(
      process.cwd(),
      "local-quran",
      "indopak-nastaleeq.json",
    );
    const raw = fs.readFileSync(filePath, "utf-8");
    _wordData = JSON.parse(raw) as Record<string, WordEntry>;
  }
  return _wordData;
}

// ─── Indopak Ayah Text ─────────────────────────────────────────────────────────

/**
 * Get all ayah texts for a given surah in Indopak script.
 * Returns an array of strings (one per ayah, 0-indexed).
 */
export function getIndopakSurah(surahNo: number): string[] {
  const data = getWordData();
  const ayahMap = new Map<number, { wordNo: number; text: string }[]>();

  for (const entry of Object.values(data)) {
    if (entry.surah !== String(surahNo)) continue;
    const ayahNo = parseInt(entry.ayah, 10);
    if (!ayahMap.has(ayahNo)) ayahMap.set(ayahNo, []);
    ayahMap.get(ayahNo)!.push({
      wordNo: parseInt(entry.word, 10),
      text: entry.text,
    });
  }

  const maxAyah = Math.max(...ayahMap.keys(), 0);
  const result: string[] = [];
  for (let i = 1; i <= maxAyah; i++) {
    const words = ayahMap.get(i);
    if (!words) {
      result.push("");
      continue;
    }
    words.sort((a, b) => a.wordNo - b.wordNo);
    result.push(words.map((w) => w.text).join(" "));
  }

  return result;
}
