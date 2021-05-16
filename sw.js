// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests


const urlToCache = "https://cse110lab6.herokuapp.com/entries";

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open("my-site-cache-v1")
        .then(function (cache) {
            console.log("Opened cache");
            return cache.add(urlToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            if (response) {
                return response;
            }

            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(clients.claim());
});