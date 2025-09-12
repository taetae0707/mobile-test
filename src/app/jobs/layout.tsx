import { Metadata } from "next";

export const metadata: Metadata = {
	title: "채용공고 - 품앗이",
	description: "다양한 기업의 채용 정보를 확인해보세요",
	openGraph: {
		title: "채용공고 - 품앗이",
		description: "다양한 기업의 채용 정보를 확인해보세요",
		url: "https://www.poomasi.kr/jobs",
	},
};

export default function JobsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
