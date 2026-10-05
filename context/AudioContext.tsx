"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";

interface AudioContextType {
  isPlaying: boolean;
  currentSurah: number | null;
  currentAyah: number | null;
  duration: number;
  currentTime: number;
  playbackRate: number;
  play: (url: string, surahNo: number, ayahNo: number) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  seek: (time: number) => void;
  setPlaybackRate: (rate: number) => void;
  onEnded: (callback: (() => void) | null) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const onEndedRef = useRef<(() => void) | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSurah, setCurrentSurah] = useState<number | null>(null);
  const [currentAyah, setCurrentAyah] = useState<number | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRateState] = useState(1);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      if (onEndedRef.current) {
        onEndedRef.current();
      }
    });

    audio.addEventListener("pause", () => {
      setIsPlaying(false);
    });

    audio.addEventListener("play", () => {
      setIsPlaying(true);
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const play = useCallback(
    (url: string, surahNo: number, ayahNo: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.src = url;
      audio.playbackRate = playbackRate;
      audio.play().catch(() => {});
      setCurrentSurah(surahNo);
      setCurrentAyah(ayahNo);
      // isPlaying is set by the "play" event listener — no need to set it here
    },
    [playbackRate]
  );

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const resume = useCallback(() => {
    audioRef.current?.play().catch(() => {});
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentSurah(null);
    setCurrentAyah(null);
  }, []);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    setPlaybackRateState(rate);
    const audio = audioRef.current;
    if (audio) audio.playbackRate = rate;
  }, []);

  const onEnded = useCallback((callback: (() => void) | null) => {
    onEndedRef.current = callback;
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentSurah,
        currentAyah,
        duration,
        currentTime,
        playbackRate,
        play,
        pause,
        resume,
        stop,
        seek,
        setPlaybackRate,
        onEnded,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}
