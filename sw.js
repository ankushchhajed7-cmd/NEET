/* NEET service worker — network first, offline fallback.
   Har update par CACHE ka number badal do: neet-v2, neet-v3 ...
   Naya chapter file add karo to FILES list mein bhi jodo (offline ke liye). */
const CACHE = 'neet-v2';
const FILES = [
  './', './index.html', './app.js', './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png', './icons/favicon-32.png',
  './data/subjects.js',
  './data/bot/12-01-points.js', './data/bot/12-01-q1.js', './data/bot/12-01-q2.js',
  './data/bot/12-01-q3.js', './data/bot/12-01-q4.js'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).catch(() => {}));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(names => Promise.all(names.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

// Net chale to hamesha taaza file; net na ho to cache se (offline padhai).
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
