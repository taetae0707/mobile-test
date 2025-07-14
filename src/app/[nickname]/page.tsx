"use client";

import React from "react";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import { useQnaPage } from "@hooks/qnaPage/useQnaPage";

const TeacherIntroduce = dynamic(
	() =>
		import("@components/qnaPage/web/TeacherIntroduce.tsx").then(
			(mod) => mod.TeacherIntroduce
		),
	{
		loading: () => <div>멘토 정보 로딩중...</div>,
		ssr: false,
	}
);
const QuestionField = dynamic(
	() =>
		import("@components/qnaPage/web/QuestionField.tsx").then(
			(mod) => mod.QuestionField
		),
	{
		loading: () => <div>질문 입력창 로딩중...</div>,
		ssr: false,
	}
);
const QuestionList = dynamic(
	() =>
		import("@components/qnaPage/web/QuestionList.tsx").then(
			(mod) => mod.QuestionList
		),
	{
		loading: () => <div>질문 목록 로딩중...</div>,
		ssr: false,
	}
);
const MobileQnaPage = dynamic(
	() =>
		import("@app/[nickname]/MobileQnaPage").then((mod) => mod.MobileQnaPage),
	{
		loading: () => <div>모바일 페이지 로딩중...</div>,
		ssr: false,
	}
);

// 실제 QnaPage 컴포넌트 (Context 소비자)
export default function QnaPageContent() {
	const { isMobile, pageLoading, isAnswerAuthority } = useQnaPage();

	return isMobile ? (
		<MobileQnaPage />
	) : (
		<Container>
			<PageContainer>
				<PageContent>
					{!pageLoading ? (
						<>Loading...</>
					) : (
						<>
							<TeacherIntroduce />
							<Seperator />
							{!isAnswerAuthority && <QuestionField />}
							<QuestionList />
						</>
					)}
				</PageContent>
			</PageContainer>
		</Container>
	);
}

// 스타일 컴포넌트는 그대로 유지...

const Container = styled.div`
	width: 100%;
	padding-top: 80px;

	@media (max-width: 1024px) {
		padding-top: 0;
	}
`;
const PageContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: 0 5% 0 5%;
	/* background-color: pink; */
`;
const PageContent = styled.div`
	width: 1320px;
	margin-bottom: 50px;
	@media (max-width: 1024px) {
		width: 100%;
	}
`;
const Seperator = styled.div`
	height: 4px;
	width: 100%;
	border-top: 1px solid #eaebed;
	margin-top: 30px;

	@media (max-width: 1024px) {
		height: 1px;
		border-top: 1px solid #eaebed;
	}
`;
