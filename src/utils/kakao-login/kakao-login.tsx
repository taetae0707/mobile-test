"use client";
import NextImage from "next/image";
import iconKakaoLogin from "@images/icon-kakaoLogin.svg";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { KAKAO_LOGIN_URL } from "@types";
import { routerTypes } from "@api/types/router.types";

// import kakaoLogo from "@assets/images/kakao-logo.svg";

export function KakaoLogin() {
  const pathname = usePathname();

  useEffect(() => {
    // 로그인 콜백 페이지가 아닌 경우에만 저장
    if (
      //SSR 환경(서버)에서는 window가 없으니, 브라우저에서만 실행하도록 조건
      typeof window! == "undefined" &&
      !pathname?.includes("kakao-login-callback")
    ) {
      localStorage.setItem("before_login_url", pathname || "/");
    }
  }, [pathname]);

  // 이벤트 핸들러(버튼 클릭 등)는 무조건 브라우저에서 실행되니까 window.location.href 사용해도 됌
  const handleKakaoLoginClick = () => {
    // 로그인 시작 시간 저장
    localStorage.setItem("login_start_time", String(Date.now()));
    window.location.href = KAKAO_LOGIN_URL;
  };

  // 카카오 로그인 도중에 카카오 버튼 노출하지 않도록 하는 변수
  const isLoginProcessing = useMemo(
    () => pathname === routerTypes.LOGIN,
    [pathname],
  );

  return (
    <>
      {!isLoginProcessing && (
        <div
          className="flex justify-center items-center w-[159px] h-[50px] rounded-md bg-[#ffea00] gap-[10px]"
          onClick={handleKakaoLoginClick}
        >
          <NextImage
            src={iconKakaoLogin}
            alt={"카카오 로그인 아이콘"}
            width={20}
            height={20}
          />
          <p className="text-lg text-left text-black">카카오 로그인</p>
        </div>
      )}
    </>
  );
}
