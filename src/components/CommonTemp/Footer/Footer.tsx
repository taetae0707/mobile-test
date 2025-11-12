"use client";

import { useAccountStore, useAccountStoreData } from "@store/account";
import { requestForToken } from "@utils/fcm/firebase.ts";
import customAxios from "@api/customAxios.ts";
import NextImage from "next/image";

export function Footer() {
  const { setFcmToken } = useAccountStore();
  const { getAccountToken } = useAccountStoreData();

  const requestPermission = async () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          // FCM 토큰 요청
          requestForToken().then((token) => {
            if (token) {
              setFcmToken(token); // FCM 토큰 저장

              // 로그인 된 경우에만 서버에 토큰 전송
              if (getAccountToken()) {
                customAxios.patch("/accounts/device-token", {
                  device_token: token,
                });
              }
            }
          });
        }
      });
    } else {
      console.log("알림이 되지 않아요!");
    }
  };

  return (
    <div
      className="w-full overflow-hidden flex flex-col justify-center items-start gap-[80px] bg-black pl-[100px] max-xl:pl-[75px] max-md:pl-[40px] max-sm:pl-[24px]
                    h-[481px] max-xl:h-[374px] max-md:h-[257px] max-sm:h-[316px]
    "
    >
      <p className="text-[68px] font-bold text-left text-white">
        <NextImage
          src={"/images/footer_img.png"}
          alt={"하단 이미지"}
          width={586}
          height={166}
          className="w-[586px] max-xl:w-[431px] max-md:w-[242px] max-sm:w-[173px]
          h-[166px] max-xl:h-[125px] max-md:h-[64px] max-sm:h-[48px]"
        />
      </p>
      <div className="flex flex-col justify-start items-start w-[322px] gap-4 text-[18px] max-md:text-[16px] max-sm:text-[14px]">
        <div className="flex justify-start items-center h-[25px] gap-2 text-[#d9d9d9]">
          <p className="font-medium border-r-[1px] border-[#8C8C8C] pr-[10px] hover:underline cursor-pointer">
            서비스 이용약관
          </p>
          <p className="font-medium hover:underline cursor-pointer">
            개인정보처리방침
          </p>
        </div>
        <p className="text-[#999] whitespace-nowrap hover:underline cursor-pointer">
          poomasiofficial@gmail.com
          <br />
          Copyright ⓒ Poomasi. All Rights Reserved
        </p>
      </div>
    </div>
  );
}
