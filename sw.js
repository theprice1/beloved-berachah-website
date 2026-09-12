const CACHE_NAME = 'beloved-berachah-v2'; // The version bump is critical

const ASSETS = [
  '/BelovedBerachah/',
  '/BelovedBerachah/index.html',
  '/BelovedBerachah/css/style.css',
  '/BelovedBerachah/assets/images/BB.png',
  '/BelovedBerachah/manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
