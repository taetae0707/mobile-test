import { ProfileBadge } from "@components/common/badge";
import { AccountType, QnaAskerType } from "@types";
import { GetQnaListResponse } from "api/types/qna.type";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import { useCallback, useEffect, useState } from "react";
import { useDetailPageContext } from "@hooks/qnaPage/provider/DetailPageProvider";
import { useParams } from "next/navigation";

import { QuestionAnswerModal } from "@components/qnaPage/web/QuestionAnswerModal.tsx";
import { useAccountStore } from "@store/account";
import { match, P } from "ts-pattern";
import { useEditAuthority, useQnaList } from "@hooks/qnaPage";
import { AnswerCard } from "@qnaPage/web/AnswerCard.tsx";
import { QuestionCard } from "@qnaPage/web/QuestionCard.tsx";
import { useQueryClient } from "@tanstack/react-query";

export function QuestionList() {
	const params = useParams(); // Next.js 방식
	const id = params?.nickname as string;

	const { publicId, accountType } = useAccountStore();
	const { teacherAccount, isQuestionListFetched, setIsQuestionListFetched } =
		useDetailPageContext();
	const queryClient = useQueryClient();

	//Q&A 리스트 상태관리
	const [qnaAskerType, setQnaAskerType] = useState<QnaAskerType>(
		QnaAskerType.ALL
	);
	const [answerModalData, setAnswerModalData] =
		useState<GetQnaListResponse | null>(null);

	const qnaData = useQnaList(qnaAskerType, id);
	const { isAuthority } = useEditAuthority();

	//데이터 refetch
	useEffect(() => {
		if (isQuestionListFetched) {
			qnaData.refetch().finally(() => setIsQuestionListFetched(false));
		}
	}, [isQuestionListFetched, setIsQuestionListFetched]);

	const handleAnswerModalOpenClick = (question: GetQnaListResponse) => {
		setAnswerModalData(question);
	};

	const getIsSecretQuestion = useCallback((question: GetQnaListResponse) => {
		if (
			accountType === AccountType.MENTOR &&
			teacherAccount?.public_id === publicId
		) {
			return false; //비밀 여부 상관없이 볼 수 있음
		}

		// 비밀질문이 아닌 경우 모두 확인 가능
		if (question.is_secret === 0) {
			return false;
		}

		// 비밀질문인 경우, 본인만 확인가능
		if (question.is_secret === 1) {
			return question.questioner_public_id !== publicId;
		}

		return true;
	}, []);

	const content = match(qnaData)
		.with({ isError: true }, () => (
			<InfoText>
				질문을 가져오던 도중, 실패하였습니다. 다시 시도해주세요.
			</InfoText>
		))
		.with({ isLoading: true }, () => (
			<InfoText>질문을 가져오는 중입니다..</InfoText>
		))
		.with({ data: P.when((d) => d?.length === 0) }, () => (
			<InfoText>아직 질문이 없네요 :D</InfoText>
		))
		.otherwise(({ data }) => (
			<>
				{data?.map((qna) => (
					<QnaSection key={qna.public_id}>
						<QuestionArea>
							<QuestionCard
								question={qna}
								isSecret={getIsSecretQuestion(qna)}
								key={qna.public_id}
								onUpdateRequest={() => {
									// 모든 qnaList 관련 캐시를 무효화하여 탭 전환 시에도 최신 데이터를 보장
									queryClient.invalidateQueries({
										queryKey: ["qnaList"],
									});
								}}
							/>
							{isAuthority && !qna.answer_text && (
								<QuestionAnswerButton
									onClick={() => handleAnswerModalOpenClick(qna)}>
									댓글 달기
								</QuestionAnswerButton>
							)}
						</QuestionArea>

						{qna.answer_text && (
							<AnswerCard
								question={qna}
								answerText={qna.answer_text}
								isMyAnswer={getIsSecretQuestion(qna)}
								teacherName={teacherAccount?.name ?? ""}
								answerDate={qna.updated_at}
								onUpdateRequest={() => {
									// 모든 qnaList 관련 캐시를 무효화하여 탭 전환 시에도 최신 데이터를 보장
									queryClient.invalidateQueries({
										queryKey: ["qnaList"],
									});
								}}
							/>
						)}
					</QnaSection>
				))}
			</>
		));

	return (
		<QuestionListBody>
			<div
				style={{
					marginBottom: "24px",
					display: "flex",
					alignItems: "center",
					fontWeight: "bold",
					fontSize: "20px",
				}}>
				질문 History
			</div>

			<BadgeContainer>
				<ProfileBadge
					onClick={() => setQnaAskerType(QnaAskerType.ALL)}
					badgeString={"전체"}
					selected={QnaAskerType.ALL === qnaAskerType}
				/>
				<ProfileBadge
					onClick={() => setQnaAskerType(QnaAskerType.ME)}
					badgeString={"내 질문"}
					selected={QnaAskerType.ME === qnaAskerType}
				/>
			</BadgeContainer>

			{content}

			{answerModalData !== null && (
				<QuestionAnswerModal
					question={answerModalData}
					setAnswerModalClose={() => setAnswerModalData(null)}
				/>
			)}
		</QuestionListBody>
	);
}

const QuestionListBody = styled.div`
	margin-top: 70px;
	width: 100%;

	@media (max-width: 1024px) {
		margin-top: 0;
	}

	/* background-color: greenyellow; */
`;

const BadgeContainer = styled(Grid)`
	width: 100%;
`;

const QnaSection = styled.div`
	margin-bottom: 50px;

	@media (max-width: 1024px) {
		margin-bottom: 30px;
	}
`;

const InfoText = styled.div`
	width: 100%;
	height: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	font-size: 24px;
`;

const QuestionArea = styled.div`
	width: 100%;
	display: flex;
	align-items: end;
	gap: 20px;
`;

export const QuestionAnswerButton = styled.div`
	display: inline-flex;
	padding: 12px 16px;
	justify-content: center;
	align-items: center;

	border-radius: 8px;
	background: #b2ebe3;

	color: #08ae98;

	font-size: 18px;
	font-style: normal;
	font-weight: 700;
	line-height: 150%;
`;
