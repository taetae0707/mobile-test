// public/sw.js (기존 서비스 워커 덮어쓰기)
console.log("🚨 Emergency service worker - bypassing all caches");

self.addEventListener("install", function (event) {
  // 즉시 활성화
  event.waitUntil(self.skipWaiting());
});
