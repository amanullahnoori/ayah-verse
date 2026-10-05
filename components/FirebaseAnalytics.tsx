"use client";

import { useEffect, useCallback, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  getFirebaseAnalytics,
  trackEvent,
  trackReferrer,
} from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

/**
 * Initialises Firebase Analytics and automatically tracks:
 * 1. Page views on every route change
 * 2. Referrer / UTM source on first visit
 * 3. All user clicks on interactive elements (buttons, links, nav items)
 */
export default function FirebaseAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasTrackedReferrer = useRef(false);

  // ── Initialise analytics + track referrer on first mount ──
  useEffect(() => {
    getFirebaseAnalytics().then(() => {
      if (!hasTrackedReferrer.current) {
        hasTrackedReferrer.current = true;
        trackReferrer();
      }
    });
  }, []);

  // ── Page view on every route change ──
  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");

    getFirebaseAnalytics().then((analytics) => {
      if (analytics) {
        const now = new Date();
        logEvent(analytics, "page_view", {
          page_path: url,
          page_title: document.title,
          page_location: window.location.href,
          event_timestamp: now.toISOString(),
          event_date: now.toLocaleDateString("en-CA"),
          event_time: now.toLocaleTimeString("en-GB"),
        });
      }
    });
  }, [pathname, searchParams]);

  // ── Global click tracking ──
  const handleClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const el = target.closest(
      "a, button, [role='button'], [role='radio'], [role='switch'], [data-analytics]",
    ) as HTMLElement | null;
    if (!el) return;

    // ── Explicit tracking via data-analytics attributes ──
    const analyticsAction = el.getAttribute("data-analytics");
    if (analyticsAction) {
      const params: Record<string, string> = {
        page_path: window.location.pathname,
      };
      // Collect all data-analytics-* attributes
      for (const attr of Array.from(el.attributes)) {
        if (attr.name.startsWith("data-analytics-")) {
          const key = attr.name
            .replace("data-analytics-", "")
            .replace(/-/g, "_");
          params[key] = attr.value;
        }
      }

      // Build a descriptive event name by appending the key action/value
      // e.g. audio_control + action=pause → audio_control_pause
      //      quick_action + action=bookmarks → quick_action_bookmarks
      //      setting_change + setting=theme + value=dark → setting_change_theme_dark
      //      setting_change + setting=translation_language + value=urdu → setting_change_translation_language_urdu
      //      surah_navigate + direction=next → surah_navigate_next
      const suffix =
        params.action || params.setting || params.direction || params.cta || "";
      // For settings, also include the chosen value (e.g. theme_dark, reciter_2, translation_language_urdu)
      const valueSuffix =
        params.setting && params.value ? `_${params.value}` : "";
      const eventName = suffix
        ? `${analyticsAction}_${suffix}${valueSuffix}`.slice(0, 40) // Firebase max 40 chars
        : analyticsAction;

      trackEvent(eventName, params);
      return; // explicit tracking handled — skip generic
    }

    // ── Generic click tracking fallback ──
    const tagName = el.tagName.toLowerCase();
    const ariaLabel = el.getAttribute("aria-label") || "";
    const textContent = (el.textContent || "").trim().slice(0, 60);
    const href = el.getAttribute("href") || "";
    const role = el.getAttribute("role") || tagName;

    let label = ariaLabel || textContent || href || "unknown";

    // Clean up surah link labels
    const surahMatch = href.match(/^\/quran\/(\d+)$/);
    if (surahMatch) {
      const cleanText = textContent.replace(/\s+/g, " ").slice(0, 40);
      label = `Surah ${surahMatch[1]}: ${cleanText}`;
    }

    let category = "button";
    if (tagName === "a" || href) category = "link";
    if (el.closest("nav")) category = "navigation";
    if (role === "radio") category = "selection";
    if (role === "switch") category = "toggle";

    trackEvent("user_click", {
      click_category: category,
      click_label: label,
      click_target: href || `${tagName}.${el.className.split(" ")[0] || ""}`,
      page_path: window.location.pathname,
    });
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleClick, { capture: true });
  }, [handleClick]);

  return null;
}
