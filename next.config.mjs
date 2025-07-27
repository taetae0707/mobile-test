/** @type {import("next").NextConfig} */

import withBundleAnalyzer from "@next/bundle-analyzer";
import TerserPlugin from "terser-webpack-plugin";

// PWA 설정 추가
const nextConfig = {
  distDir: "./.next",
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  // 이미지 최적화 관련 설정 추가
  images: {
    // SVG 이미지 형식을 허용 (보안 위험이 있으므로 'dangerous' 접두어 사용)
    dangerouslyAllowSVG: true,

    // 이미지가 인라인 표시되지 않고 다운로드되도록 설정
    contentDispositionType: "attachment",

    // SVG 파일에 대한 보안 정책 설정 (XSS 공격 방지)
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // webpack을 compiler 밖으로 이동
  webpack: (config) => {
    config.optimization.minimizer.push(
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // console.log 제거
            passes: 3, // 압축 최적화를 3번 반복 (압축률 증가)
          },
          mangle: true, // 변수 및 함수명을 난독화하여 크기 감소
          format: {
            comments: false, // 모든 주석 제거 (파일 크기 줄이기)
          },
        },
        extractComments: false, // 주석을 별도 파일로 분리 X (파일 크기 줄이기)
        parallel: true, // 병렬 실행 활성화 (빌드 속도 최적화)
      }),
    );
    return config;
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
