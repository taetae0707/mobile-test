import { FirebaseApp, initializeApp } from "firebase/app";
import { getMessaging, getToken, Messaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC7wn9t3AQk_DFs80d0jhp9wm3rGR90kys",
  authDomain: "poomasi-firebase.firebaseapp.com",
  projectId: "poomasi-firebase",
  storageBucket: "poomasi-firebase.firebasestorage.app",
  messagingSenderId: "1049468197033",
  appId: "1:1049468197033:web:6fc6879b0ebb98898b71b8",
};

// Firebase 앱과 메시징 객체를 저장할 변수
let app: null | FirebaseApp = null;
let messaging: null | Messaging = null;

// Firebase 초기화
export const initFirebase = () => {
  if (typeof window !== "undefined") {
    app = initializeApp(firebaseConfig);
    messaging = getMessaging(app);
    return { app, messaging };
  }
  return { app: null, messaging: null };
};

// FCM 토큰 가져오기
export const requestForToken = async () => {
  try {
    if (typeof window === "undefined") return null;

    // Firebase 초기화
    if (!messaging) {
      initFirebase();
    }

    if (!messaging) {
      return;
    }

    const currentToken = await getToken(messaging, {
      vapidKey:
        "BHEg6JImtT0MA0fGRcTcq4Koanl42yeLd3tWB2B1KP3E1D8S7MhU2XLeCe86DYTcnyUWkkkg8aMao-C8RXw_DkA",
    });

    if (currentToken) {
      // 테스트 시 사용
      // console.log('FCM 토큰 값: ', currentToken);

      // 나중에 토큰을 백엔드 서버로 전송하는 로직 추가
      return currentToken;
    }
  } catch (err) {
    console.log("토큰 발급 중 에러 발생:", err);
  }
};
