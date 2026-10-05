/// AyahVerse Service Worker — Offline-first PWA
const CACHE_VERSION = "ayahverse-v1";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const API_CACHE = `${CACHE_VERSION}-api`;

// App shell files to pre-cache on install
const APP_SHELL = [
  "/",
  "/offline",
  "/quran",
  "/bookmarks",
  "/settings",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
];

// API domains to cache with stale-while-revalidate
const API_ORIGINS = ["https://quranapi.pages.dev", "https://api.alquran.cloud"];

// Max items in dynamic / API caches
const MAX_DYNAMIC = 80;
const MAX_API = 200;

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

function isApiRequest(url) {
  return API_ORIGINS.some((origin) => url.startsWith(origin));
}

function isNavigationRequest(request) {
  return request.mode === "navigate";
}

function isStaticAsset(url) {
  return (
    /\.(js|css|woff2?|ttf|otf|png|jpg|jpeg|gif|svg|ico|webp)$/i.test(url) ||
    url.includes("/_next/static/")
  );
}

async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    // Delete oldest entries
    for (let i = 0; i < keys.length - maxItems; i++) {
      await cache.delete(keys[i]);
    }
  }
}

/* ─── Install ──────────────────────────────────────────────────────────────── */

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      // Use individual puts so a single failure doesn't block the rest
      return Promise.allSettled(
        APP_SHELL.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`[SW] Failed to pre-cache ${url}:`, err.message);
          }),
        ),
      );
    }),
  );
});

/* ─── Activate ─────────────────────────────────────────────────────────────── */

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                key !== STATIC_CACHE &&
                key !== DYNAMIC_CACHE &&
                key !== API_CACHE,
            )
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

/* ─── Fetch strategies ─────────────────────────────────────────────────────── */

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = request.url;

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Skip chrome-extension, webpack HMR, etc.
  if (
    url.startsWith("chrome-extension") ||
    url.includes("_next/webpack") ||
    url.includes("__nextjs")
  ) {
    return;
  }

  // 1. API requests → Stale-while-revalidate
  if (isApiRequest(url)) {
    event.respondWith(staleWhileRevalidate(request, API_CACHE, MAX_API));
    return;
  }

  // 2. Static assets → Cache-first
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // 3. Navigation (HTML pages) → Network-first with offline fallback
  if (isNavigationRequest(request)) {
    event.respondWith(networkFirstWithOfflineFallback(request));
    return;
  }

  // 4. Everything else (including Next.js RSC fetches) → let the browser
  //    handle natively. NOT intercepting these is intentional:
  //    - Online: works normally
  //    - Offline: the browser/Next.js sees a genuine network error and
  //      either triggers the error boundary or does MPA fallback, which
  //      the SW then handles via networkFirstWithOfflineFallback.
  //    Intercepting these caused stuck loading states because returning
  //    synthetic responses or throwing from event.respondWith() led to
  //    unpredictable browser behaviour.
});

/* ─── Strategy: Cache-first ────────────────────────────────────────────────── */

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Return a basic offline response for static assets
    return new Response("", { status: 408, statusText: "Offline" });
  }
}

/* ─── Strategy: Stale-while-revalidate ─────────────────────────────────────── */

async function staleWhileRevalidate(request, cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  // Always fetch in background to update cache
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
        trimCache(cacheName, maxItems);
      }
      return response;
    })
    .catch(() => {
      // Offline: return cached version if available, otherwise a proper
      // error response so fetchSurah() sees !res.ok and throws → error
      // boundary catches it. Never return undefined — that's invalid for
      // event.respondWith() and causes hangs.
      if (cached) return cached;
      return new Response('{"error":"offline"}', {
        status: 503,
        statusText: "Service Unavailable",
        headers: { "Content-Type": "application/json" },
      });
    });

  // Return cached immediately if available, else wait for network
  return cached || fetchPromise;
}

/* ─── Strategy: Network-first ──────────────────────────────────────────────── */

async function networkFirst(request, cacheName, maxItems) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
      trimCache(cacheName, maxItems);
    }
    return response;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    // No cache — throw a real network error instead of returning a synthetic
    // 408 Response. For Next.js RSC fetches, a real error triggers MPA
    // fallback (hard navigation), which the SW handles via
    // networkFirstWithOfflineFallback. Returning a Response(408) would make
    // Next.js try to parse the empty body as RSC payload → blank page.
    throw err;
  }
}

/* ─── Strategy: Network-first + offline fallback ───────────────────────────── */

async function networkFirstWithOfflineFallback(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Try to return cached version of the page.
    // ignoreVary is needed because Next.js responses include Vary: RSC headers
    // which would prevent matching navigation requests against cached pages.
    const cached = await caches.match(request, { ignoreVary: true });
    if (cached) return cached;

    // Fallback to offline page
    const offlinePage = await caches.match("/offline");
    if (offlinePage) return offlinePage;

    return new Response(
      "<html><body><h1>You are offline</h1><p>Please check your connection.</p></body></html>",
      { headers: { "Content-Type": "text/html" } },
    );
  }
}
