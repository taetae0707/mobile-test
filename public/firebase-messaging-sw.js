// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyC7wn9t3AQk_DFs80d0jhp9wm3rGR90kys",
  authDomain: "poomasi-firebase.firebaseapp.com",
  projectId: "poomasi-firebase",
  storageBucket: "poomasi-firebase.firebasestorage.app",
  messagingSenderId: "1049468197033",
  appId: "1:1049468197033:web:6fc6879b0ebb98898b71b8",
});

const messaging = firebase.messaging();

// 알림 클릭 이벤트 처리
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const landing_url = event.notification.data
    ? event.notification.data.url
    : null;
  const newPath = landing_url ? landing_url : "/";

  const urlToOpen = new URL(newPath);

  event.waitUntil(
    self.clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((windowClients) => {
        let foundWindowClient = null;
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];

          if (
            new URL(client.url).hostname.includes("poomasi") &&
            "focus" in client
          ) {
            foundWindowClient = client;
            break;
          }
        }

        if (foundWindowClient) {
          return foundWindowClient.focus().then((focusedClient) => {
            if ("navigate" in focusedClient) {
              focusedClient.postMessage(urlToOpen.href);
            }
          });
        } else if (self.clients.openWindow) {
          return self.clients.openWindow(urlToOpen.href);
        }
      }),
  );
});

// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
  console.log("백그라운드 메시지 수신:", payload); // 디버깅용 로그 추가
  // 이미 notification 객체가 있으면 자동으로 표시되므로
  // data 메시지일 때만 직접 알림 표시
  if (!payload.notification && payload.data) {
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: "/public/logo.png",
      data: payload.data,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  }
});

// push 이벤트 리스너 추가 (모든 형태의 푸시 처리)
self.addEventListener("push", (event) => {
  console.log("[firebase-messaging-sw.js] Push 이벤트 발생:", event);

  // 메시지 데이터 파싱 시도
  let payload;
  try {
    payload = event.data ? event.data.json() : {};
  } catch (e) {
    console.error("JSON 파싱 실패:", e);
    payload = {
      data: {
        title: "새 알림",
        body: event.data ? event.data.text() : "새 알림이 있습니다",
      },
    };
  }

  // 모든 메시지에 대해 알림 표시
  const title = payload.notification?.title || payload.data?.title || "새 알림";
  const options = {
    body:
      payload.notification?.body ||
      payload.data?.body ||
      "새 메시지가 있습니다",
    icon: "/logo.png",
    data: payload.data || {},
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
