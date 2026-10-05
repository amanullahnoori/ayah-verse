import dataset from "./dataset.json";

export type CategoryKey =
  | "asma_ul_husna"
  | "umrah_steps"
  | "morning_evening_adhkar"
  | "after_prayer_duas";

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  asma_ul_husna: "أسماء الله الحسنى",
  umrah_steps: "خطوات العمرة",
  morning_evening_adhkar: "أذكار الصباح والمساء",
  after_prayer_duas: "أذكار ما بعد الصلاة",
};

export function isCategory(key: unknown): key is CategoryKey {
  return typeof key === "string" && key in CATEGORY_LABELS;
}

export function getCategory(key: CategoryKey) {
  return dataset[key];
}

const CATEGORY_KEYWORDS: Record<CategoryKey, RegExp> = {
  asma_ul_husna:
    /\b(names?|asma|husna|al-|ar-|as-|ad-|an-|at-|az-|attributes?)\b|rahman|raheem|rahim|اسم|أسماء|اسماء|نام/i,
  umrah_steps:
    /umrah|umra|tawaf|sa'?i|ihram|miqat|marwah|safa|kaaba|ka'bah|makkah|mecca|hajj|zamzam|عمرة|عمرہ|طواف|سعي|إحرام|احرام/i,
  morning_evening_adhkar:
    /morning|evening|adhkar|azkar|dhikr|zikr|kursi|protection|sabah|masa|صباح|مساء|أذكار|اذکار|ذکر/i,
  after_prayer_duas:
    /after (the )?(prayer|salah|salat|namaz)|tasbih|subhan|post-prayer|بعد الصلاة|نماز کے بعد|duas?|supplication/i,
};

// Lightweight retrieval: include only categories the conversation touches,
// keeping each request well inside the provider's token limits.
export function getRelevantContent(text: string) {
  const content: Partial<Record<CategoryKey, (typeof dataset)[CategoryKey]>> = {};
  for (const key of Object.keys(CATEGORY_KEYWORDS) as CategoryKey[]) {
    if (CATEGORY_KEYWORDS[key].test(text)) content[key] = dataset[key];
  }
  return content;
}
