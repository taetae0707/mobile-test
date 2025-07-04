import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import TextareaAutosize from "react-textarea-autosize";
import { useAccountStore } from "@store/account";
import { colors } from "@styles/foundation/color";
import { useDetailPageContext } from "@hooks/qnaPage/provider/DetailPageProvider";
import dayjs from "dayjs";
import { getMobileVw } from "@utils/responsive.ts";
import { GetQnaListResponse } from "api/types/qna.type";
import { useAnswerEdit, useEditAuthority } from "@hooks/qnaPage";
import { EditButton } from "@components/common/button/editButton/EditButton";
import { EditActionButtons } from "@components/common/button/editButton/EditActionButtons";

interface AnswerCardProps {
	question: GetQnaListResponse;
	answerText: string;
	isMyAnswer: boolean;
	teacherName: string;
	answerDate: string;
	isSecret?: boolean;
	onUpdateRequest?: () => void;
}

export function AnswerCard({
	question,
	answerText,
	isMyAnswer,
	teacherName,
	answerDate,
	onUpdateRequest,
}: AnswerCardProps) {
	const { accessToken } = useAccountStore();
	const { teacherAccount } = useDetailPageContext();
	const { isAuthority } = useEditAuthority();

	const {
		isEditing,
		editedText,
		toggleEditBtn,
		handleEditClick,
		handleCancelClick,
		handleTextChange,
		handleSaveClick,
		showEditBtn,
	} = useAnswerEdit(question.public_id, answerText, onUpdateRequest);

	return (
		<div style={{ display: "flex", justifyContent: "flex-end" }}>
			<QnaCard>
				{/* 비밀 질문 인 경우, 블러처리 */}
				{isMyAnswer && (
					<BlurOverlay>
						<TextBlurOverlay>
							{accessToken
								? "비밀 답변이예요"
								: "답변을 보려면 로그인을 해주세요 :)"}
						</TextBlurOverlay>
					</BlurOverlay>
				)}
				{isAuthority && (
					<EditButton
						onToggle={toggleEditBtn}
						onEditClick={handleEditClick}
						showEditBtn={showEditBtn}
					/>
				)}
				<QnaHead>
					<AnswerImg src={teacherAccount?.profile_image} />
					<span>{teacherName}</span>
				</QnaHead>
				{isEditing ? (
					<>
						<StyledTextarea
							minRows={3}
							maxRows={35}
							value={editedText}
							onChange={handleTextChange}
						/>
						<EditActionButtons
							onSave={handleSaveClick}
							onCancel={handleCancelClick}
						/>
					</>
				) : (
					<QnaContentArea
						readOnly
						value={editedText}
					/>
				)}

				<AnswerDate>{dayjs(answerDate).format("YYYY-MM-DD")}</AnswerDate>
			</QnaCard>
		</div>
	);
}

const StyledTextarea = styled(TextareaAutosize)`
	color: #28292a;
	font-size: 22px;
	font-style: normal;
	font-weight: 500;
	line-height: 150%;
	padding: 12px;
	border: 1px solid #ccc;
	border-radius: 8px;
	resize: none;
	width: 100%;
`;

const QnaCard = styled(Card)`
	background-color: #ffffff;
	box-shadow: none;
	border-radius: 22px;
	padding: 24px 28px 32px;
	margin-top: 20px;
	width: 60%;
	position: relative;

	display: flex;
	flex-direction: column;
	gap: 32px;
	border: 1px solid ${colors.green500};

	@media (max-width: 1024px) {
		width: ${getMobileVw(290)};
		border-radius: 20px;
		padding: 24px 20px;
		box-shadow: none;
		gap: 20px;
	}
`;

const QnaHead = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;

	color: #0e0e0e;

	gap: 12px;

	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: 150%; /* 30px */

	@media (max-width: 1024px) {
		font-size: 14px;
	}
`;

const AnswerImg = styled.img`
	width: 54px;
	height: 54px;
	object-fit: cover;
	border-radius: 100%;

	@media (max-width: 1024px) {
		width: 1.5rem;
		height: 1.5rem;
	}
`;

const QnaContentArea = styled(TextareaAutosize)`
	width: 100%;
	height: 100%;
	outline: none;
	box-sizing: border-box;
	border: none;
	resize: none;

	color: #28292a;
	font-size: 22px;
	font-style: normal;
	font-weight: 500;
	line-height: 150%;

	@media (max-width: 1024px) {
		font-size: 14px;
	}
`;

const BlurOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 10;
	backdrop-filter: blur(7px);
	-webkit-backdrop-filter: blur(7px);
	display: flex;
	align-items: center;
	justify-content: center;
`;

const TextBlurOverlay = styled.div`
	font-size: 24px;
	word-break: keep-all;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1;
	top: 50%;
	left: 50%;

	text-align: center;
	color: #fff;
	background-color: rgba(78, 80, 83, 0.7);
	border-radius: 500px;
	display: inline-flex;
	align-items: center;
	justify-content: center;

	padding: 12px 18px;
	font-weight: 500;

	@media (max-width: 1024px) {
		/* margin-bottom: 30px; */
		font-size: 0.875rem;
		font-weight: 400;
	}
`;

const AnswerDate = styled.div`
	color: var(--gray-color);
	display: flex;
	justify-content: start;

	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: 150%; /* 18px */

	@media (max-width: 1024px) {
		font-size: 12px;
	}
`;
