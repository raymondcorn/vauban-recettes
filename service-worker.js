const CACHE_NAME = 'vauban-recettes-v1';
const BASE = '/vauban-recettes/'; // chemin GitHub Pages : https://toncompte.github.io/vauban-recettes/

const ASSETS = [
  BASE,
  BASE + 'index.html',
  BASE + 'recipe.html',
  BASE + 'style.css',
  BASE + 'data/recipes.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // cache d’abord, sinon réseau
      return response || fetch(event.request);
    })
  );
});
