const BASE = new URL(self.registration.scope).pathname;
const CACHE_NAME = "nutripal-shell-v2";
const APP_SHELL = [
  BASE,
  BASE + "index.html",
  BASE + "manifest.webmanifest",
  BASE + "icons/app-icon.svg",
  BASE + "icons/icon-192.png",
  BASE + "icons/icon-512.png",
  BASE + "icons/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      if (event.request.mode === "navigate") {
        try {
          const response = await fetch(event.request);
          if (response.ok) {
            await cache.put(BASE + "index.html", response.clone());
          }
          return response;
        } catch {
          const shell = await cache.match(BASE + "index.html");
          if (shell) return shell;
          throw new Error("Offline shell unavailable");
        }
      }

      const cached = await cache.match(event.request);
      if (cached) return cached;

      try {
        const response = await fetch(event.request);
        if (response.ok && new URL(event.request.url).origin === self.location.origin) {
          await cache.put(event.request, response.clone());
        }
        return response;
      } catch (error) {
        throw error;
      }
    })(),
  );
});
