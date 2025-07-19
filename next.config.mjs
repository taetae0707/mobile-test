/** @type {import('next').NextConfig} */

import withBundleAnalyzer from "@next/bundle-analyzer";
import TerserPlugin from "terser-webpack-plugin";

const nextConfig = {
  distDir: "./.next",
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

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
