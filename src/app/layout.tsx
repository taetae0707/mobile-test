import { Footer } from "@components/common/Footer/Footer";
import { Header } from "@components/common/Header/Header";
import { CommonProvider } from "@components/common/CommonProvider.tsx";
import { suitFont } from "./font.ts";
import "./globals.css";
import { ServiceWorkerUnregister } from "../ServiceWorkerUnregister.tsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GoogleAnalytics from "@components/common/googleAnalytics/GoogleAnalytics.tsx";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "품앗이, 대학생 전문 상담 멘토링",
	description: "대학생 전문 상담 멘토링, 품앗이입니다.",
	viewport: "width=device-width, initial-scale=1.0",
	icons: {
		icon: "/favicon.png",
		shortcut: "/favicon.png",
		apple: "/apple-touch-icon.png",
	},
	openGraph: {
		title: "품앗이, 대학생 전문 상담 멘토링",
		description: "대학생 전문 상담 멘토링, 품앗이입니다.",
		images: [
			{
				url: "https://www.poomasi.kr/og-image.png",
				width: 800,
				height: 400,
				alt: "품앗이 OG Image",
			},
		],
		type: "website",
		url: "https://www.poomasi.kr/",
	},
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode; //타입명시
}) {
	return (
		<html
			lang="ko"
			className={`${suitFont.variable} ${suitFont.className}`}>
			<head></head>
			<body>
				{process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
					<GoogleAnalytics
						trackingId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
					/>
				) : null}

				<main>
					<CommonProvider>
						<ServiceWorkerUnregister />
						<Header />
						{children}
						<Footer />
					</CommonProvider>
				</main>
				<div id="modal-root" />
			</body>
		</html>
	);
}
