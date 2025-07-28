"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { REDIRECT_URI, REST_API_KEY } from "@types";
import { RequestApi } from "@api/request-api";
import { useAccountStore, useAccountStoreData } from "@store/account";
import { useToastMessageStore } from "@toast";
import axios from "axios";

type KakaoLoginRes = {
  access_token: string;
  refresh_token: string;
  id_token: string;
  refresh_token_expires_in: number;
  expires_in: number;
};

export default function KakaoLoginCallback() {
  const { setAccessToken, setPublicId, setAccountType } = useAccountStore();
  const { getFcmToken } = useAccountStoreData();
  const { setErrorToastMessage } = useToastMessageStore();
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // URL에서 'code' 파라미터 추출
        /* code란?
        - 사용자가 카카오 로그인 인증을 마치면 발급받는 일회용 인증 코드
        - 최초로 access token 등을 받기 위한 '교환권' 역할.
        
        ① 사용자가 카카오 로그인 성공 →
        ② 카카오가 redirect_uri로 이동시키면서 code를 URL에 붙여줌 →
        ③ 프론트/서버가 이 코드를 사용해서 access_token 요청
        */
        const search = new URLSearchParams(window.location.search);
        /*URLSearchParams란?
        window.location.search
        → 현재 브라우저 주소창의 URL에서 ? 뒤의 모든 쿼리 파라미터를 문자열로 반환

        new URLSearchParams(window.location.search)
        → 그 문자열을 key-value 형식으로 쉽게 꺼낼 수 있게 변환
        */
        const code = search.get("code");
        const grantType = "authorization_code";

        // 1. 카카오에 토큰 요청: access_token, id_token 받기
        const response = await axios.post<KakaoLoginRes>(
          "https://kauth.kakao.com/oauth/token",
          {
            grant_type: grantType,
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: code!,
          },
          {
            //서버에 데이터를 어떤 형식으로 보낼지 명시
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          },
        );

        // 2. 카카오 id_token을 백엔드로 전달
        const idToken = response.data.id_token; //OAuth에서 발급하는 JWT(JSON Web Token) 형태의 '유저 인증 정보 토큰'
        const kakaoLoginResponse = await RequestApi.accounts.postKakaoLogin({
          id_token: idToken, //OAuth에서 발급하는 JWT(JSON Web Token) 형태의 '유저 인증 정보 토큰'
          device_token: getFcmToken(),
        });

        // 3. 백엔드 응답에서 토큰 및 ID 추출
        const accessToken = kakaoLoginResponse.data.access_token;
        const publicId = kakaoLoginResponse.data.public_id;

        // 4. 토큰 디코딩으로 account_type 추출
        const payloadBase64 = accessToken.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        const accountTypeFromToken = decodedPayload.account_type;

        // localStorage에 사용자 정보 저장
        setPublicId(publicId);
        setAccessToken(accessToken);
        setAccountType(accountTypeFromToken);

        //로그인 로딩시간 측정용
        const loginStart = Number(localStorage.getItem("login_start_time"));
        const loginEnd = Date.now();
        /*console.log("로그인 처리 시간(ms):", loginEnd - loginStart);*/

        // 로그인 전 방문했던 URL 확인 후 이동 (없으면 기본값)
        const beforeLoginUrl = localStorage.getItem("before_login_url");
        localStorage.removeItem("before_login_url");
        router.push(beforeLoginUrl ?? "/");
      } catch (error) {
        setErrorToastMessage(
          "로그인 도중 문제가 발생하였습니다.\n 잠시 후 다시 시도해주세요.",
        );
        router.push("/");
      }
    };
    fetchToken();
  }, [
    setAccessToken,
    setPublicId,
    setAccountType,
    setErrorToastMessage,
    router,
  ]);

  return null;
}

/*
access_token - "API 접근용"

id_token은 - "이 토큰에 들어있는 정보가 이 사용자가 맞는지 확인"할 때 사용
(주로 회원가입/로그인 최초 처리시 프로필, 이메일 등 파싱)

1. 로그인 버튼 클릭 → 카카오 인증 페이지 이동

2. 인증 성공 → 카카오가 내 redirect_uri로 code 파라미터와 함께 리다이렉트

3. 백엔드/프론트가 이 code와 내 앱의 client_id, client_secret 등을 넣어 카카오에 토큰 요청

  - 응답으로 access_token(=authorization), refresh_token, id_token 등을 받음

4. API 호출 등 실사용 시

  - Authorization 헤더에 access_token을 넣어서 인증

5. 유저 정보 등 신원 확인 필요할 때

  -id_token(JWT) 내부의 유저 정보를 파싱해서 사용
*/
