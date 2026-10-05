"use client";

import { useEffect } from "react";
import { pruneCache } from "@/lib/surahCache";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    // Prune expired / over-limit surah cache entries on startup
    pruneCache();

    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("[SW] Registered with scope:", registration.scope);

          // Check for updates periodically (every 60 min)
          setInterval(
            () => {
              registration.update();
            },
            60 * 60 * 1000,
          );
        })
        .catch((err) => {
          console.error("[SW] Registration failed:", err);
        });
    }
  }, []);

  return null;
}
