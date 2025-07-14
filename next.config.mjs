/** @type {import('next').NextConfig} */

import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig = {
	distDir: "./.next", // 빌드 출력 디렉터리를 `./dist/`로 변경합니다.
	swcMinify: true, //코드 압축 및 최적화를 보장
	compiler: {
		modularizeImports: {
			"@mui/material": {
				transform: "@mui/material/{{member}}",
			},
			"@mui/icons-material": {
				transform: "@mui/icons-material/{{member}}",
			},
		},
	},
};

export default withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
})(nextConfig);
