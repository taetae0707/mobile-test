import { MetadataRoute } from "next";

const siteUrl = "https://www.poomasi.kr";

export default function robots(): MetadataRoute.Robots {
	// `next build` 시 Node.js 환경 변수인 NODE_ENV는 'production'으로 설정됩니다.
	const isProduction = process.env.NODE_ENV === "production";

	// 운영(Production) 환경이 아닐 경우, 모든 검색 로봇의 접근을 차단합니다.
	if (!isProduction) {
		return {
			rules: {
				userAgent: "*",
				disallow: "/",
			},
		};
	}

	// 운영 환경일 경우, 상세 규칙을 적용합니다.
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				// 아래 경로들은 검색 결과에서 제외시킵니다.
				disallow: [
					"/kakao-login-callback/", // 카카오 로그인 콜백
				],
			},
			{
				userAgent: ["kakaotalk"],
				allow: "/",
			},
		],
		sitemap: `${siteUrl}/sitemap.xml`,
	};
}
