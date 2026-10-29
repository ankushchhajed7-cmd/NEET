/* NEET service worker — network first, offline fallback.
   Har update par CACHE ka number badal do: neet-v2, neet-v3 ...
   Naya chapter file add karo to FILES list mein bhi jodo (offline ke liye). */
const CACHE = 'neet-v23';
const FILES = [
  './', './index.html', './app.js', './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png', './icons/favicon-32.png',
  './data/subjects.js',
  './data/bot/12-01-points.js', './data/bot/12-01-q1.js', './data/bot/12-01-q2.js',
  './data/bot/12-01-q3.js', './data/bot/12-01-q4.js',
  './data/bot/12-04-points.js', './data/bot/12-04-q1.js', './data/bot/12-04-q2.js', './data/bot/12-04-q3.js', './data/bot/12-04-q4.js', './data/bot/12-04-q5.js',
  './data/bot/12-05-points.js', './data/bot/12-05-q1.js', './data/bot/12-05-q2.js', './data/bot/12-05-q3.js', './data/bot/12-05-q4.js', './data/bot/12-05-q5.js',
  './data/bot/11-01.js', './data/bot/11-02.js', './data/bot/11-03.js',
  './data/bot/11-05.js', './data/bot/11-06.js', './data/bot/11-08.js', './data/bot/11-10.js', './data/bot/11-11.js', './data/bot/11-12.js', './data/bot/11-13.js',
  './data/zoo/11-04.js', './data/zoo/11-07.js', './data/zoo/11-09.js',
  './data/zoo/11-14.js', './data/zoo/11-15.js', './data/zoo/11-16.js', './data/zoo/11-17.js', './data/zoo/11-18.js', './data/zoo/11-19.js',
  './data/zoo/12-03.js', './data/zoo/12-06.js', './data/zoo/12-07.js', './data/zoo/12-09.js', './data/zoo/12-10.js',
  './data/bot/12-08.js', './data/bot/12-11.js', './data/bot/12-12.js', './data/bot/12-13.js'
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
  // apni files hamesha server se check karo (no-cache = ETag se revalidate), taaki purana version na atke
  const own = new URL(e.request.url).origin === self.location.origin;
  e.respondWith(
    (own ? fetch(e.request.url, { cache: 'no-cache', credentials: 'same-origin' }) : fetch(e.request))
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
