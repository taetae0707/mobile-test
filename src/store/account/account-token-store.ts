"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AccountType } from "@types";

type AccessTokenStore = {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  publicId: string | null;
  setPublicId: (id: string) => void;
  resetAccessToken: () => void;
  fcmToken: string | null; // FCM 토큰 추가
  // 추가
  accountType: AccountType.MENTOR | AccountType.USER | AccountType.STAFF | null;
  setAccountType: (
    type: AccountType.MENTOR | AccountType.USER | AccountType.STAFF,
  ) => void;
  nickname: string | null;
  setNickname: (nickname: string) => void;
  setFcmToken: (token: string) => void;
};

export const useAccountStore = create<AccessTokenStore>()(
  //persist: 상태들을 localStorage에 자동 저장함.
  //set: Zustand에서 상태를 업데이트 할 때 쓰는 함수
  persist(
    (set) => ({
      accessToken: null,
      publicId: null,
      accountType: null,
      nickname: null, // 초기값
      fcmToken: null, // FCM 토큰 초기값
      setAccessToken: (token) => set({ accessToken: token }),
      setPublicId: (id) => set({ publicId: id }),
      setAccountType: (type) => set({ accountType: type }),
      setNickname: (nickname) => set({ nickname }),
      setFcmToken: (token) => set({ fcmToken: token }), // FCM 토큰 설정 함수
      // 함수 추가
      resetAccessToken: () => {
        set({
          accessToken: null,
          publicId: null,
          accountType: null,
          nickname: null,
          fcmToken: null, // FCM 토큰 초기화
        });
      },
    }),
    {
      name: "account-token-storage", //localStorage에 저장할 때 사용할 key 이름
      storage: createJSONStorage(() => localStorage), //객체를 JSON 문자열로 바꿔서 저장해서 localStorage에 저장
      // onRehydrateStorage 추가
    },
  ),
);

export const useAccountStoreData = () => {
  const getAccountToken = () => useAccountStore.getState().accessToken;
  const getPublicId = () => useAccountStore.getState().publicId;
  const getAccountType = () => useAccountStore.getState().accountType;
  const getNickname = () => useAccountStore.getState().nickname;
  const getFcmToken = () => useAccountStore.getState().fcmToken;

  return {
    getAccountToken,
    getPublicId,
    getAccountType,
    getNickname,
    getFcmToken,
  };
};

/* 토큰값 흐름
1. 카카오 로그인 
2. 카카오 API에서 access_token을 받아옴 
3. 그 값을 setaccessToken(token)으로 Zustand에 저장
4. Zustand가 persist 옵션 때문에 자동으로 localStorage에도 저장!
*/
