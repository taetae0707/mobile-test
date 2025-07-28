self.addEventListener("install", function (event) {
  // 즉시 활성화
  event.waitUntil(self.skipWaiting());
});
