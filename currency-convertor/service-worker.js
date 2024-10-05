// service-worker.js

const cacheName = 'sufi-exchange-v1';
const resourcesToPrecache = [
  '/',
  'index.html',
  'styles.css',
  'script.js',
  'icon-192.png',
  'icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(resourcesToPrecache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
