"use client";

import {
  useSettings,
  ZOOM_MIN,
  ZOOM_MAX,
  ZOOM_STEP,
  ZOOM_DEFAULT,
} from "@/context/SettingsContext";

export default function ZoomControls() {
  const { zoomLevel, setZoomLevel } = useSettings();

  const zoomIn = () => setZoomLevel(Math.min(zoomLevel + ZOOM_STEP, ZOOM_MAX));
  const zoomOut = () => setZoomLevel(Math.max(zoomLevel - ZOOM_STEP, ZOOM_MIN));
  const resetZoom = () => setZoomLevel(ZOOM_DEFAULT);

  return (
    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
      <button
        onClick={zoomOut}
        disabled={zoomLevel <= ZOOM_MIN}
        className="px-2.5 py-1.5 rounded-lg font-bold text-base transition-all duration-200 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Zoom out"
        data-analytics="zoom_control"
        data-analytics-action="zoom_out"
        data-analytics-location="surah_detail"
      >
        −
      </button>
      <button
        onClick={resetZoom}
        className="px-2 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 min-w-[3.25rem] text-center bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm"
        aria-label={`Zoom: ${zoomLevel}%. Click to reset.`}
        title="Reset to 100%"
        data-analytics="zoom_control"
        data-analytics-action="zoom_reset"
        data-analytics-location="surah_detail"
      >
        {zoomLevel}%
      </button>
      <button
        onClick={zoomIn}
        disabled={zoomLevel >= ZOOM_MAX}
        className="px-2.5 py-1.5 rounded-lg font-bold text-base transition-all duration-200 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Zoom in"
        data-analytics="zoom_control"
        data-analytics-action="zoom_in"
        data-analytics-location="surah_detail"
      >
        +
      </button>
    </div>
  );
}
