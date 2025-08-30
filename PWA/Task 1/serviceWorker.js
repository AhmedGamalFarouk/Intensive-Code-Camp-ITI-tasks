const CACHE_NAME = "pwa-cache-v1";
const OFFLINE_URL = "/pages/offline.html";
const NOT_FOUND_URL = "/pages/404.html";

const pagesToCache = [
  "/index.html",
  OFFLINE_URL,
  NOT_FOUND_URL,
  "/Pages/page1.html",
  "/CSS/main.css",
  "/CSS/page-one.css",
  "/CSS/offline-page.css",
  "/js/script.js"
];

self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  // self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(pagesToCache))
      .catch((err) => console.error("Cache install error:", err))
  );
});

self.addEventListener("fetch", (e) => {
  console.log("fetching.....", e.request);
  console.log("navigator", navigator);
  if (!navigator.onLine) {
    console.log("working offline")
    e.respondWith(caches.match(OFFLINE_URL))
    return;
  }

  e.respondWith(
    caches.match(e.request)
      .then((cacheResponse) => {
        console.log("cash Respponse Before Check => ", cacheResponse);
        if (cacheResponse) {
          console.log("hit cache");
          return cacheResponse;
        }
        console.log("Network Requst")

        return fetch(e.request)
          .then((fetchResponse) => {
            if (fetchResponse.status === 404) {
              return caches.match("/pages/404.html");
            }

            const copy = fetchResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, copy);
            });

            return fetchResponse;
          })
          .catch(() => {
            return cacheResponse || caches.match("/pages/offline.html");
          });
      })
  );
});