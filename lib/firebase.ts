import { initializeApp, getApps } from "firebase/app";
import {
  getAnalytics,
  isSupported,
  logEvent,
  type Analytics,
} from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase only once
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Analytics — only available in the browser
let analytics: Analytics | null = null;

export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  if (analytics) return analytics;

  const supported = await isSupported();
  if (supported) {
    analytics = getAnalytics(app);
  }
  return analytics;
}

/* ─── Analytics helper functions ───────────────────────────────────────────── */

/**
 * Log any custom event. Safe to call server-side (no-ops).
 */
export async function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  const a = await getFirebaseAnalytics();
  if (a) {
    const now = new Date();
    logEvent(a, eventName, {
      ...params,
      event_timestamp: now.toISOString(),
      event_date: now.toLocaleDateString("en-CA"), // YYYY-MM-DD
      event_time: now.toLocaleTimeString("en-GB"), // HH:MM:SS
    });
  }
}

/** User opened a surah */
export function trackSurahView(surahId: number, surahName: string) {
  trackEvent("surah_view", {
    surah_id: surahId,
    surah_name: surahName,
  });
}

/** User played audio */
export function trackAudioPlay(surahId: number, surahName: string) {
  trackEvent("audio_play", {
    surah_id: surahId,
    surah_name: surahName,
  });
}

/** User bookmarked a verse */
export function trackBookmark(
  surahId: number,
  ayahNumber: number,
  action: "add" | "remove",
) {
  trackEvent("bookmark", {
    surah_id: surahId,
    ayah_number: ayahNumber,
    action,
  });
}

/** Navigation click (navbar, footer links, etc.) */
export function trackNavClick(destination: string) {
  trackEvent("nav_click", {
    destination,
  });
}

/** Settings changed */
export function trackSettingChange(
  setting: string,
  value: string | number | boolean,
) {
  trackEvent("setting_change", {
    setting,
    value: String(value),
  });
}

/** Search performed */
export function trackSearch(query: string, resultCount: number) {
  trackEvent("search", {
    search_term: query,
    results_count: resultCount,
  });
}

/** Track where the user came from (referrer) */
export function trackReferrer() {
  if (typeof window === "undefined") return;

  const referrer = document.referrer;
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source") || "";
  const utmMedium = params.get("utm_medium") || "";
  const utmCampaign = params.get("utm_campaign") || "";

  trackEvent("traffic_source", {
    referrer: referrer || "direct",
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    landing_page: window.location.pathname,
  });
}

export { app };
