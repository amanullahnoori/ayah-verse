/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
  useEffect,
  useMemo,
} from "react";

export type FontSize = "normal" | "large" | "extra-large";
export type Theme = "light" | "dark" | "system";
export type TranslationLang = "english" | "urdu" | "bengali" | "hindi";
export type TransliterationLang = "english" | "hindi";
export type ArabicScript = "uthmani" | "indopak";
export type ReadingMode = "verse" | "page";

export const ZOOM_MIN = 50;
export const ZOOM_MAX = 200;
export const ZOOM_STEP = 10;
export const ZOOM_DEFAULT = 100;

interface FontSizeStyles {
  arabic: React.CSSProperties;
  transliteration: React.CSSProperties;
  translation: React.CSSProperties;
}

interface SettingsContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  zoomLevel: number;
  setZoomLevel: (level: number) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  showTranslation: boolean;
  setShowTranslation: (show: boolean) => void;
  showTransliteration: boolean;
  setShowTransliteration: (show: boolean) => void;
  transliterationLang: TransliterationLang;
  setTransliterationLang: (lang: TransliterationLang) => void;
  translationLang: TranslationLang;
  setTranslationLang: (lang: TranslationLang) => void;
  reciterId: string;
  setReciterId: (id: string) => void;
  arabicScript: ArabicScript;
  setArabicScript: (script: ArabicScript) => void;
  readingMode: ReadingMode;
  setReadingMode: (mode: ReadingMode) => void;
  fontSizeStyles: FontSizeStyles;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

const STORAGE_KEY = "quran-app-settings";

// Base sizes in rem at 100% zoom
const BASE_SIZES = {
  arabic: 1.875, // ~30px (text-3xl)
  transliteration: 1.125, // ~18px (text-lg)
  translation: 1, // ~16px (text-base)
};

interface StoredSettings {
  fontSize?: FontSize;
  zoomLevel?: number;
  theme?: Theme;
  showTranslation?: boolean;
  showTransliteration?: boolean;
  transliterationLang?: TransliterationLang;
  translationLang?: TranslationLang;
  reciterId?: string;
  arabicScript?: ArabicScript;
  readingMode?: ReadingMode;
}

/**
 * Reads persisted settings from localStorage once per mount cycle and caches
 * in a module-level variable so the 10+ lazy initialisers called during a
 * single SettingsProvider mount don't each re-read and re-parse JSON.
 *
 * The cache is invalidated after initialisation (see SettingsProvider) so that
 * any future remount (e.g. after an error-boundary recovery while offline)
 * reads fresh data from localStorage instead of stale values.
 */
let _cachedStored: StoredSettings | undefined;

function getStoredSettings(): StoredSettings {
  if (_cachedStored !== undefined) return _cachedStored;
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    _cachedStored = raw ? JSON.parse(raw) : {};
  } catch {
    _cachedStored = {};
  }
  return _cachedStored!;
}

/** Call after all lazy initialisers have run to prevent stale reads on remount */
function invalidateStoredCache() {
  _cachedStored = undefined;
}

// ── Server defaults ─────────────────────────────────────────────────────────
// These are used for the initial (server) render and during hydration.
// After mount, we read localStorage and update state, which guarantees an
// actual state change → DOM update — no hydration tricks needed.
const DEFAULTS: Required<StoredSettings> = {
  fontSize: "normal",
  zoomLevel: ZOOM_DEFAULT,
  theme: "dark",
  showTranslation: true,
  showTransliteration: true,
  transliterationLang: "english",
  translationLang: "english",
  reciterId: "1",
  arabicScript: "uthmani",
  readingMode: "verse",
};

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  // ── Phase 1: Start with server-safe defaults ──────────────────────────────
  const [fontSize, setFontSize] = useState<FontSize>(DEFAULTS.fontSize);
  const [zoomLevel, setZoomLevel] = useState<number>(DEFAULTS.zoomLevel);
  const [theme, setTheme] = useState<Theme>(DEFAULTS.theme);
  const [showTranslation, setShowTranslation] = useState(
    DEFAULTS.showTranslation,
  );
  const [showTransliteration, setShowTransliteration] = useState(
    DEFAULTS.showTransliteration,
  );
  const [transliterationLang, setTransliterationLang] =
    useState<TransliterationLang>(DEFAULTS.transliterationLang);
  const [translationLang, setTranslationLang] = useState<TranslationLang>(
    DEFAULTS.translationLang,
  );
  const [reciterId, setReciterId] = useState(DEFAULTS.reciterId);
  const [arabicScript, setArabicScript] = useState<ArabicScript>(
    DEFAULTS.arabicScript,
  );
  const [readingMode, setReadingMode] = useState<ReadingMode>(
    DEFAULTS.readingMode,
  );

  // Track whether we've loaded from localStorage yet
  const [hydrated, setHydrated] = useState(false);

  // ── Phase 2: Read localStorage after mount ────────────────────────────────
  // This runs once after hydration. Because the values may differ from
  // DEFAULTS, React sees a real state change and updates the DOM.
  // useLayoutEffect ensures it happens synchronously before paint, so
  // there's no visible flash of default values.
  useLayoutEffect(() => {
    const stored = getStoredSettings();
    if (stored.fontSize !== undefined) setFontSize(stored.fontSize);
    if (stored.zoomLevel !== undefined) setZoomLevel(stored.zoomLevel);
    if (stored.theme !== undefined) setTheme(stored.theme);
    if (stored.showTranslation !== undefined)
      setShowTranslation(stored.showTranslation);
    if (stored.showTransliteration !== undefined)
      setShowTransliteration(stored.showTransliteration);
    if (stored.transliterationLang !== undefined)
      setTransliterationLang(stored.transliterationLang);
    if (stored.translationLang !== undefined)
      setTranslationLang(stored.translationLang);
    if (stored.reciterId !== undefined) setReciterId(stored.reciterId);
    if (stored.arabicScript !== undefined) setArabicScript(stored.arabicScript);
    if (stored.readingMode !== undefined) setReadingMode(stored.readingMode);
    invalidateStoredCache();
    setHydrated(true);
  }, []);

  // ── Persist on change (useLayoutEffect for synchronous writes) ────────────
  // Only persist after hydration so we don't overwrite localStorage with
  // server defaults on the initial mount.
  useLayoutEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        fontSize,
        zoomLevel,
        theme,
        showTranslation,
        showTransliteration,
        transliterationLang,
        translationLang,
        reciterId,
        arabicScript,
        readingMode,
      }),
    );
  }, [
    hydrated,
    fontSize,
    zoomLevel,
    theme,
    showTranslation,
    showTransliteration,
    transliterationLang,
    translationLang,
    reciterId,
    arabicScript,
    readingMode,
  ]);

  // ── Apply theme class to <html> ───────────────────────────────────────────
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      root.classList.toggle("dark", mq.matches);
      const handler = (e: MediaQueryListEvent) =>
        root.classList.toggle("dark", e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme]);

  // ── Derived: font styles based on zoom level ─────────────────────────────
  const fontSizeStyles = useMemo<FontSizeStyles>(() => {
    const scale = zoomLevel / 100;
    return {
      arabic: { fontSize: `${BASE_SIZES.arabic * scale}rem`, lineHeight: 1.8 },
      transliteration: {
        fontSize: `${BASE_SIZES.transliteration * scale}rem`,
        lineHeight: 1.6,
      },
      translation: {
        fontSize: `${BASE_SIZES.translation * scale}rem`,
        lineHeight: 1.6,
      },
    };
  }, [zoomLevel]);

  return (
    <SettingsContext.Provider
      value={{
        fontSize,
        setFontSize,
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
        fontSizeStyles,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}

export function useFontSize() {
  const { fontSizeStyles } = useSettings();
  return fontSizeStyles;
}
