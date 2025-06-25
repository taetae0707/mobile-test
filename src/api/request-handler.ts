import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_POOMASI_BACKEND_BASE_URL,
  timeout: 3000,
});

instance.interceptors.request.use((config) => {
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/*export default async function <T>(args: AxiosRequestConfig): Promise<T> {
	const { data } = await instance(args);
	return data;
}*/

/*
에러메세지:
TypeError: Cannot destructure property 'data' of 'undefined' as it is undefined.

원인: const { data } = await instance(args) 이 코드에서 instance(args)의 결과가 undefined라서 data를 꺼낼 수 없다


*/
