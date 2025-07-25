import { GetQnaListResponse } from "api/types/qna.type";
import ModalReference from "@components/common/modal/ModalReference.tsx";
import styled from "@emotion/styled";
import { QuestionCard } from "@components/qnaPage/web/QuestionCard.tsx";
import { useState } from "react";
import { DebouncedButton } from "@components/common/button";
import { RequestApi } from "api/request-api.ts";
import { useDetailPageContext } from "@hooks/qnaPage/provider/DetailPageProvider.tsx";
import { useToastMessageStore } from "@toast";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

type QuestionAnswerModalProps = {
	question: GetQnaListResponse;
	setAnswerModalClose: () => void;
};

const MAX_LENGTH = 1000;

export function QuestionAnswerModal({
	question,
	setAnswerModalClose,
}: QuestionAnswerModalProps) {
	const [answerText, setAnswerText] = useState<string>("");
	const { setIsQuestionListFetched } = useDetailPageContext();
	const { setSuccessToastMessage, setErrorToastMessage } =
		useToastMessageStore();
	const queryClient = useQueryClient();

	// 답변글 등록
	const handleAnswerTextChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		if (event.target.value.length <= MAX_LENGTH) {
			setAnswerText(event.target.value);
		}
	};

	const handleAnswerButtonClick = async () => {
		if (!answerText) {
			setSuccessToastMessage("댓글을 입력해주세요.");
			return;
		}

		try {
			await RequestApi.posts.postQnaAnswer(question.public_id, answerText);

			// 모든 qnaList 관련 캐시를 무효화하여 탭 전환 시에도 최신 데이터를 보장
			queryClient.invalidateQueries({
				queryKey: ["qnaList"],
			});

			setAnswerModalClose();
			setSuccessToastMessage("댓글 등록이 완료되었습니다.");
		} catch (err) {
			// axios 에러 타입 체크
			if (axios.isAxiosError(err)) {
				// AxiosError 타입으로 처리
				if (err.response) {
					const statusCode = err.response.status;

					if (statusCode === 400) {
						setErrorToastMessage(
							"답변을 등록할 수 있는 계정이 아닙니다. 로그인 후 다시 시도해주세요."
						);
						return;
					}

					if (statusCode === 401) {
						setErrorToastMessage("인증에 실패했습니다. 다시 로그인해주세요.");
						return;
					}

					if (statusCode === 404) {
						setErrorToastMessage(
							"답변을 등록한 QNA 정보를 찾을 수 없습니다. 잠시 후 다시 시도해주세요."
						);
						return;
					}
				} else if (err.request) {
					setErrorToastMessage(
						"서버 응답 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
					);
					return;
				}
			}

			setErrorToastMessage("댓글 등록에 실패했습니다.");
		}
	};

	return (
		<CommonGuideModalContainer>
			<ModalReference>
				<ModalReference.Header onClickClose={setAnswerModalClose} />
				<CommonGuideModalBody>
					<QuestionCardCustom question={question} />
					<QuestionArea className="QuestionAreaBox">
						<QuestionTextField
							value={answerText}
							onChange={handleAnswerTextChange}
							placeholder="댓글을 입력해주세요."
						/>
						<QuestionOption>
							<QuestionFieldLength>
								글자수: (<span>{answerText.length}</span> / {MAX_LENGTH})
							</QuestionFieldLength>
						</QuestionOption>
					</QuestionArea>
					<DebouncedButton
						text={"등록"}
						onClick={() => handleAnswerButtonClick()}
						variant="contained"
						sx={{
							height: "40px",
							fontSize: "18px",
							fontWeight: "700",
							borderRadius: "10px",
							color: "white",
							backgroundColor: "#3ecdba",
							alignSelf: "end",
						}}
					/>
				</CommonGuideModalBody>
			</ModalReference>
		</CommonGuideModalContainer>
	);
}

const QuestionCardCustom = styled(QuestionCard)``;

const CommonGuideModalContainer = styled.div`
	.ModalWrapper {
		width: 1075px;
	}
`;

// @todo CSS Props 관련하여 확인 필요
const CommonGuideModalBody = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 36px;

	padding: 0 20px 40px;

	.qna-card {
		width: 100%;
	}
`;

const QuestionArea = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 20px;
	border: 1px solid #eaebed;
	background: #ffffff;
	padding: 24px 24px 0;

	@media (max-width: 1024px) {
		padding: 14px;
		border-width: 0 0 0 0;
	}
`;

const QuestionTextField = styled.textarea`
	// element 디자인 요소소
	width: 100%;
	min-height: 150px;
	resize: none;
	background: transparent;
	border-width: 0 0 0 0;
	border-bottom: 1px solid #eaebed;

	// focus 시, 기본 디자인이 노출되는 사항 비활성화
	outline: none !important;
	box-shadow: none !important;

	// element 폰트 요소
	color: #9b9ea2;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: 150%;

	@media (max-width: 1024px) {
		border-width: 0 0 0 0;
	}
`;

const QuestionOption = styled.div`
	width: 100%;
	margin: 24px 0;
	display: flex;
	justify-content: space-between;
`;

const QuestionFieldLength = styled.div`
	color: #9b9ea2;

	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: 150%;

	span {
		color: #3ecdba;
	}
`;
