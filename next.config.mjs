/** @type {import('next').NextConfig} */

import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig = {
  distDir: "./.next", // 빌드 출력 디렉터리를 `./dist/`로 변경합니다.
  // 기타 next.js 설정
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
