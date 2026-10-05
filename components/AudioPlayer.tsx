"use client";

import { useAudio } from "@/context/AudioContext";

export default function AudioPlayer() {
  const {
    isPlaying,
    currentSurah,
    currentAyah,
    duration,
    currentTime,
    playbackRate,
    pause,
    resume,
    stop,
    seek,
    setPlaybackRate,
  } = useAudio();

  if (currentSurah === null) return null;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div
      className="fixed bottom-16 md:bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-700 shadow-2xl shadow-slate-900/10"
      role="region"
      aria-label={`Audio player — Surah ${currentSurah}, Ayah ${currentAyah}`}
    >
      <div className="max-w-3xl mx-auto px-4 py-3">
        {/* Surah & Ayah info */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Surah {currentSurah} • Ayah {currentAyah}
          </p>
          <button
            onClick={stop}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            aria-label="Close player"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] text-slate-400 font-mono w-8 text-right">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className="flex-1 h-1 bg-slate-200 dark:bg-slate-600 rounded-full cursor-pointer accent-emerald-600"
            aria-label="Seek audio position"
            aria-valuetext={`${formatTime(currentTime)} of ${formatTime(
              duration,
            )}`}
          />
          <span className="text-[10px] text-slate-400 font-mono w-8">
            {formatTime(duration)}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          {/* Playback speed */}
          <div className="relative group">
            <button
              className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              aria-label="Change speed"
            >
              {playbackRate}x
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col bg-white dark:bg-slate-700 rounded-xl shadow-xl border border-slate-200 dark:border-slate-600 overflow-hidden">
              {speeds.map((speed) => (
                <button
                  key={speed}
                  onClick={() => setPlaybackRate(speed)}
                  data-analytics="audio_control"
                  data-analytics-action="speed_change"
                  data-analytics-speed={String(speed)}
                  className={`px-4 py-2 text-xs hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors ${
                    playbackRate === speed
                      ? "text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-900/30"
                      : "text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          {/* Play/Pause */}
          <button
            onClick={isPlaying ? pause : resume}
            className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label={isPlaying ? "Pause" : "Play"}
            data-analytics="audio_control"
            data-analytics-action={isPlaying ? "pause" : "resume"}
            data-analytics-surah-id={String(currentSurah)}
            data-analytics-ayah={String(currentAyah)}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Stop */}
          <button
            onClick={stop}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            aria-label="Stop"
            data-analytics="audio_control"
            data-analytics-action="stop"
            data-analytics-surah-id={String(currentSurah)}
            data-analytics-ayah={String(currentAyah)}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h12v12H6z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
