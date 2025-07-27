"use client";
import { useEffect } from "react";

export function ServiceWorkerUnregister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // 기존 서비스워커 등록 해제
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          console.log(registration);
          console.log("!!");
        });
      });
    }
  }, []);

  return null;
}
