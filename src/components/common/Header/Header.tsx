"use client";
import { useAccountStore } from "@store/account";
import { KakaoLogin } from "@utils/kakao-login";
import NextImage from "next/image";
import { useState } from "react";

export function Header() {
  const { accessToken, resetAccessToken } = useAccountStore();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);
  const toHome = () => {
    window.location.href = "/";
  };

  const handleLogout = () => {
    resetAccessToken();
    window.location.reload();
  };

  return (
    <>
      <header
        className="flex justify-between items-center w-full h-[80px] fixed bg-white z-20
                        px-[100px] max-md:px-[50px] max-sm:px-[24px]
                        max-sm:h-[46px]
    "
      >
        <NextImage
          src={"/logo.png"}
          alt={"로고이미지"}
          width={100}
          height={65}
          className={"max-md:w-[50px] max-md:h-[33px] cursor-pointer"}
        />
        <div className="flex justify-start items-center gap-8 max-sm:gap-[12px]">
          <div
            className={"max-sm:hidden flex justify-center items-center gap-8"}
          >
            <div className="flex justify-center items-center gap-2.5">
              <p className="flex-grow-0 flex-shrink-0 text-xl font-medium text-left text-black">
                채용공고
              </p>
            </div>
            <div className="flex justify-center items-center gap-2.5">
              <p className="flex-grow-0 flex-shrink-0 text-xl font-medium text-left text-black">
                질문하기
              </p>
            </div>
          </div>
          <KakaoLogin />
          <div onClick={() => setIsHamburgerOpen(true)}>
            <NextImage
              src={"/images/hamburger-icon.png"}
              alt={"햄버거 메뉴"}
              width={24}
              height={24}
              className={"sm:hidden"}
            />
          </div>
        </div>
      </header>
      <div
        className={`fixed h-[100vh] w-[100vw] top-0 left-0 bg-white z-[40] sm:hidden ${isHamburgerOpen ? "block" : "hidden"}`}
      >
        <div
          className={
            "flex justify-between px-[24px] items-center h-[45px] w-full"
          }
        >
          <NextImage
            src={"/logo.png"}
            alt={"로고이미지"}
            width={100}
            height={65}
            className={"max-md:w-[50px] max-md:h-[33px] cursor-pointer"}
          />
          <NextImage
            src={"/images/close-icon.png"}
            alt={"로고이미지"}
            width={28}
            height={28}
            onClick={() => setIsHamburgerOpen(false)}
          />
        </div>
        <div className={"flex flex-col pt-[30px] pl-[28px]"}>
          <a href={"/"} className="text-black text-[32px] text-bold">
            홈
          </a>
          <a href={"/"} className="text-black text-[32px] text-bold">
            채용공고
          </a>
          <a href={"/"} className="text-black text-[32px] text-bold">
            질문하기
          </a>
        </div>
      </div>
    </>
  );
}
