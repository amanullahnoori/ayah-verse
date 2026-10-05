"use client";

import { useAudio } from "@/context/AudioContext";

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentSurah } = useAudio();
  const isPlayerActive = currentSurah !== null;

  return (
    <main
      id="main-content"
      role="main"
      className={`md:pt-0 min-h-screen bg-slate-50 dark:bg-slate-950 transition-[padding] duration-300 ${
        isPlayerActive
          ? "pb-48 md:pb-32" /* nav (64px) + player (~110px) + breathing room */
          : "pb-20 md:pb-0" /* just nav on mobile, nothing on desktop */
      }`}
    >
      {children}
    </main>
  );
}
