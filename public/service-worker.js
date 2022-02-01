importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/workbox-sw/6.4.2/workbox-sw.js"
);
workbox.routing.registerRoute(
  ({ request }) =>
    request.destination === "image" || request.destination === "style",
  new workbox.strategies.CacheFirst()
);
