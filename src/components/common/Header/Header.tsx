"use client";
import { useAccountStore } from "@store/account";
import { KakaoLogin } from "@utils/kakao-login";

export function Header() {
  const { accessToken, resetAccessToken } = useAccountStore();
  const toHome = () => {
    window.location.href = "/";
  };

  const handleLogout = () => {
    resetAccessToken();
    window.location.reload();
  };

  return (
    <header className="flex justify-between items-center w-full h-[80px] px-20  fixed bg-white z-20">
      <svg
        width="100"
        height="66"
        viewBox="0 0 100 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-grow-0 flex-shrink-0 w-[100px] h-[65px] relative"
        preserveAspectRatio="none"
      >
        <path
          d="M31.1486 12.5L47.2663 17.5L58.7127 8.5L63.7121 20.1856H92L70.6031 35.4566L74.6036 51.5L51.2426 45L33.3491 57.5V40L8 32L31.1486 26.0285V12.5Z"
          fill="black"
        ></path>
      </svg>
      <div className="flex justify-start items-center gap-8">
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
        <KakaoLogin />
      </div>
    </header>
  );
}
