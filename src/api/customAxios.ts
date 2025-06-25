import axios, { AxiosInstance, AxiosRequestConfig } from "axios"; //axios: HTTP 요청을 보낼 수 있게 해주는 라이브러리
import { DefaultApiResponse } from "api/types/DefaultApiResponse";
import { useAccountStore } from "@store/account";

export interface CustomInstance extends AxiosInstance {
  get<T = any, R = DefaultApiResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R>;

  post<T = any, R = DefaultApiResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<R>;

  patch<T = any, R = DefaultApiResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<R>;
}

/* 기본 axios
axios.get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>

🟨 url: string
요청을 보낼 URL을 문자열로 받는 거예요.
예: '/users/1' 또는 'https://api.example.com/data'

🟨 config?: AxiosRequestConfig
선택(optional) 파라미터예요.
요청 헤더, 쿼리스트링, 토큰 등 추가 설정을 여기에 담아요.

Promise<AxiosResponse<T>>
이 부분은 axios.get()이 어떤 결과를 리턴할지를 설명하는 타입이에요.

✅ Promise<...> 란?
비동기 함수는 Promise를 반환해요.
Promise는 “나중에 결과가 올 거야” 라는 약속을 의미하죠.

✅ AxiosResponse<T> 란?
axios는 응답을 AxiosResponse라는 객체 형태로 줘요.
AxiosResponse 안에는 이런 정보가 들어있어요:

{
  data: T       // 우리가 진짜로 쓰고 싶은 실제 응답 데이터
  status: 200   // HTTP 상태 코드
  headers: ...  // 응답 헤더
  config: ...   // 요청 설정
}

👉 url에 GET 요청을 보낸 뒤, 나중에(T) 타입의 데이터를 포함한 응답이 오겠다는 약속(Promise)을 반환한다.
*/

const customAxios: CustomInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000 * 60, // 1분
});
/*axios.create()  "axios 인스턴스를 새로 만드는 함수"
즉, 공장에서 내 입맛에 맞는 차를 한 대 뽑아내는 거예요.
이걸 통해 만든 결과물은 axios랑 기능은 같지만,
기본값(baseURL, header 등)이 내가 지정한 값으로 세팅된 사본이에요.
*/

customAxios.interceptors.request.use(function (request) {
  const token = useAccountStore.getState().accessToken;
  if (token) {
    request.headers.Authorization = token;
  }
  return request;
});
/* 이 코드의 목적: 로그인 후 발급된 토큰이 헤더에 자동으로 추가되게 만든 인터셉터 
interceptor란? API 요청을 보내기 "직전"에 자동으로 실행되는 코드

커스텀말고 기본 코드는
axios.get('/mypage', {
  headers: {
    Authorization: 'Bearer 1234abcd...'
  }
})
마이페이지같은 경우, 로그인된 사용자만 볼 수 있는 페이지야.
그래서 우리는 서버에게 토큰을 헤더에 넣어서 보내주고, "나 인증된 사용자야!" 라고 알려주는거다.

하지만 매번 이렇게 적기가 번거로우니까 interceptor를 이용해서 customAxios를 사용할떄마다 자동으로 헤더에 토큰을 넣게 만들어 버리는 것이다! 

💬 필요할 때만 로그인 상태에서 토큰이 붙고, 비회원 요청에는 안 붙어요.
그래서 이 구조는 유연하고, **SOLID 원칙 중 OCP (Open-Closed Principle)**에도 잘 맞는 패턴이에요.

그외
use(): "이 인터셉터를 등록해줘!" 라는 의미
use() 안에 함수 하나를 넣잖아요?
→ axios가 요청을 보내기 직전에 이 함수를 자동으로 실행해줘요.
→ 보내기 직전에 함수를 실행하는 이유는 이 함수가 실행되야 알맞게 요청을 할 수 있어서이다!

request: 매개변수가 아니라 axios가 요청을 보내기 전 단계의 설정 전체를 담은 객체
→ 우리는 여기에 헤더를 추가하거나, 요청 정보를 바꿔서 서버로 보내는 거예요
*/

customAxios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    // axios 시간 초과 오류
    if (error.code === "ECONNABORTED") {
      return Promise.reject("API 요청 시간을 초과하였습니다.");
    }

    return Promise.reject(error);
  },
);
/* 이 코드의 목적: 인터셉터에서 자동으로 .data만 반환하게 만든 코드

원래 axios.get() 하면 이렇게 생긴 객체를 받아요:
{
  data: {...},       // 실제 데이터
  status: 200,       // 응답 코드
  headers: {...},    // 응답 헤더
  config: {...}      // 요청 정보
}
그런데 여기서 내가 필요한건 response.data 잖아요?
그래서 인터셉터에서 자동으로 .data만 반환하게 만든 거예요.
*/

export default customAxios;
