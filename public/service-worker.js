importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js"
);

const { imageCache } = workbox.recipes;
const { ExpirationPlugin } = workbox.expiration;
const { CacheableResponsePlugin } = workbox.cacheableResponse;
try {
  self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
      self.skipWaiting();
    }
  });
  workbox.routing.registerRoute(
    ({ request }) =>
      request.destination === "image" ||
      request.destination === "style" ||
      request.destionation === "font",
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "images",
    })
  );
  workbox.recipies.staticResourceCache();
  imageCache();
} catch (e) {
  console.log(e);
}
