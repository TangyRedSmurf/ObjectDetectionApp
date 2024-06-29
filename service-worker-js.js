const CACHE_NAME = 'object-detection-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css', // Add your CSS file if you have one
    '/script.js', // Add your JS file if you have one
    '/manifest.json',
    '/icon-192x192.png',
    '/icon-512x512.png',
    '/icon-180x180.png',
    '/icon-167x167.png',
    '/icon-152x152.png',
    'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs',
    'https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

