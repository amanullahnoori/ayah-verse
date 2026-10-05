"use client";

import { useEffect } from "react";
import { useAudio } from "@/context/AudioContext";
import {
  useSettings,
  ZOOM_MIN,
  ZOOM_MAX,
  ZOOM_STEP,
} from "@/context/SettingsContext";

/**
 * Global keyboard shortcuts:
 *
 * Space          — Play / Pause audio (when not typing)
 * Escape         — Stop audio / close search
 * /              — Focus search bar (when not typing)
 * Ctrl/Cmd + +   — Zoom in
 * Ctrl/Cmd + -   — Zoom out
 * Ctrl/Cmd + 0   — Reset zoom
 * ?              — Show keyboard shortcut hints (future)
 */
export default function KeyboardShortcuts() {
  const { isPlaying, pause, resume, stop, currentSurah } = useAudio();
  const { zoomLevel, setZoomLevel } = useSettings();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();
      const isTyping =
        tagName === "input" ||
        tagName === "textarea" ||
        tagName === "select" ||
        target.isContentEditable;

      // Ctrl/Cmd + Plus — Zoom in
      if ((e.ctrlKey || e.metaKey) && (e.key === "=" || e.key === "+")) {
        e.preventDefault();
        setZoomLevel(Math.min(zoomLevel + ZOOM_STEP, ZOOM_MAX));
        return;
      }

      // Ctrl/Cmd + Minus — Zoom out
      if ((e.ctrlKey || e.metaKey) && e.key === "-") {
        e.preventDefault();
        setZoomLevel(Math.max(zoomLevel - ZOOM_STEP, ZOOM_MIN));
        return;
      }

      // Ctrl/Cmd + 0 — Reset zoom
      if ((e.ctrlKey || e.metaKey) && e.key === "0") {
        e.preventDefault();
        setZoomLevel(100);
        return;
      }

      // Don't process shortcuts below if user is typing
      if (isTyping) return;

      // Space — Play / Pause
      if (e.key === " " && currentSurah !== null) {
        e.preventDefault();
        if (isPlaying) {
          pause();
        } else {
          resume();
        }
        return;
      }

      // Escape — Stop audio
      if (e.key === "Escape" && currentSurah !== null) {
        e.preventDefault();
        stop();
        return;
      }

      // / — Focus search bar
      if (e.key === "/") {
        const searchInput = document.querySelector<HTMLInputElement>(
          'input[type="search"], input[aria-label="Search surahs"]'
        );
        if (searchInput) {
          e.preventDefault();
          searchInput.focus();
        }
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, pause, resume, stop, currentSurah, zoomLevel, setZoomLevel]);

  return null; // Render nothing — this is a behavior-only component
}
