import dayjs from "dayjs";
import { CareerYearType } from "@types";
import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import TextareaAutosize from "react-textarea-autosize";
import { colors } from "@styles/foundation/color";
import { GetQnaListResponse } from "api/types/qna.type";
import { useAccountStore } from "@store/account";
// import { getMobileVw } from '@utils/responsive'
import { useQuestionEdit, useIsOwner } from "@hooks/qnaPage/";
import { EditButton } from "@components/common/button/editButton/EditButton";
import { EditActionButtons } from "@components/common/button/editButton/EditActionButtons";
import React, { useState } from "react";

type QuestionCardProps = {
	question: GetQnaListResponse;
	isSecret?: boolean;
	onUpdateRequest?: () => void;
};
export const getCareerYearString = (career_year: string) => {
	switch (career_year) {
		case CareerYearType.ACADEMIC:
			return "대학생";
		case CareerYearType.JOB_SEEKER:
			return "취준생";
		case CareerYearType.JUNIOR:
			return "신입~3년차";
		case CareerYearType.MIDDLE:
			return "3년차 이상";
		default:
			return "대학생";
	}
};

export function QuestionCard({
	question,
	isSecret,
	onUpdateRequest,
}: QuestionCardProps) {
	const { accessToken } = useAccountStore();
	const isTheOwner = useIsOwner(question.questioner_public_id);

	const {
		isEditing,
		editedText,
		showEditBtn,
		toggleEditBtn,
		handleEditClick,
		handleCancelClick,
		handleTextChange,
		handleSaveClick,
	} = useQuestionEdit(question, onUpdateRequest);

	const [editedPortfolioLink, setEditedPortfolioLink] = useState(
		question.portfolio_link ?? ""
	);

	const handleSaveAll = () => {
		handleSaveClick({
			question_text: editedText,
			portfolio_link: editedPortfolioLink,
		});
	};

	return (
		<QnaCard className={"qna-card"}>
			{/* 비밀 질문 인 경우, 블러처리 */}
			{isSecret && (
				<BlurOverlay>
					<TextBlurOverlay>
						{accessToken
							? "비밀 질문이에요"
							: "질문을 보려면 로그인을 해주세요 :)"}
					</TextBlurOverlay>
				</BlurOverlay>
			)}
			{isTheOwner ? (
				<EditButton
					onToggle={toggleEditBtn}
					onEditClick={handleEditClick}
					showEditBtn={showEditBtn}
				/>
			) : null}

			<QnaHead>Q</QnaHead>
			{isEditing ? (
				<>
					<StyledTextarea
						minRows={3}
						maxRows={50}
						value={editedText}
						onChange={handleTextChange}
					/>
					<PortfolioInput
						type="url"
						value={editedPortfolioLink}
						onChange={(e) => setEditedPortfolioLink(e.target.value)}
						placeholder="포트폴리오 URL을 입력하세요 (선택)"
					/>
					<EditActionButtons
						onSave={handleSaveAll}
						onCancel={handleCancelClick}
					/>
				</>
			) : (
				<>
					<QnaContentArea
						readOnly
						value={question.question_text}
					/>
					{question.portfolio_link && (
						<PortfolioUrlLink
							href={
								question.portfolio_link.startsWith("http")
									? question.portfolio_link
									: `https://${question.portfolio_link}`
							}
							target="_blank"
							rel="noopener noreferrer">
							{question.portfolio_link}
						</PortfolioUrlLink>
					)}
				</>
			)}

			<div style={{ display: "flex" }}>
				<QnaContentCareer
					style={{
						padding: "6px 12px",
						borderRadius: "4px",
						backgroundColor: "#EAEBED",
						marginRight: "6px",
					}}>
					{getCareerYearString(question.career_year)}
				</QnaContentCareer>
				<QnaContentMajor
					style={{
						padding: "6px 12px",
						borderRadius: "4px",
						backgroundColor: "#EAEBED",
						marginRight: "12px",
					}}>
					{question.is_major ? "전공" : "비전공"}
				</QnaContentMajor>
			</div>
			<QnaContentDate
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
				{dayjs(question.created_at).format("YYYY-MM-DD")}
			</QnaContentDate>
		</QnaCard>
	);
}
const StyledTextarea = styled(TextareaAutosize)`
	color: #28292a;
	/* font-size: 1.375rem; */
	font-style: normal;
	font-weight: 500;
	line-height: 150%;
	padding: 12px;
	border: 1px solid #ccc;
	border-radius: 8px;
	resize: none;
	width: 100%;

	@media (max-width: 1024px) {
		font-size: 12px !important;
	}
`;

const QnaCard = styled(Card)`
	background-color: #f5f5f5;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
	margin-top: 20px;
	padding: 20px;
	width: 60%;
	position: relative;

	display: flex;
	flex-direction: column;
	gap: 32px;

	@media (max-width: 1024px) {
		width: 85%;
		border-radius: 20px;
		padding: 20px;
		box-shadow: none;
		gap: 1.5rem;
	}
`;

const QnaHead = styled.div`
	width: 54px;
	height: 54px;
	border-radius: 100%;

	display: flex;
	justify-content: center;
	background: #3ecdba;

	color: #ffffff;

	font-size: 2rem;

	@media (max-width: 1024px) {
		width: 1.5rem;
		height: 1.5rem;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
	}
`;

const QnaContentArea = styled(TextareaAutosize)`
	width: 100%;
	height: 100%;
	outline: none;
	background-color: #f5f5f5;
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
	font-weight: bold;
	color: #fff;
	background-color: rgba(78, 80, 83, 0.7);
	padding: 16px;
	height: 38px;
	border-radius: 20px;
	display: inline-flex;
	align-items: center;
	justify-content: center;

	@media (max-width: 1024px) {
		/* margin-bottom: 30px; */
		font-size: 0.875rem;
		font-weight: 400;
	}
`;
const QnaContentCareer = styled.div`
	@media (max-width: 1024px) {
		font-size: 0.75rem;
		background-color: ${colors.gray200};
		margin-right: 6px;
		color: ${colors.gray500};
	}
`;

const QnaContentMajor = styled.div`
	@media (max-width: 1024px) {
		background-color: ${colors.gray200};
		font-size: 0.75rem;
		color: ${colors.gray500};
	}
`;
const QnaContentDate = styled.div`
	@media (max-width: 1024px) {
		justify-content: flex-start !important;
		font-size: 0.75rem;
		color: ${colors.gray500};
		margin-top: -10px;
	}
`;

const PortfolioUrlLink = styled.a`
	display: block;
	margin-top: 8px;
	color: #3ecdba;
	font-size: 15px;
	text-decoration: underline;
	word-break: break-all;
	cursor: pointer;
	&:hover {
		color: #2bb09a;
		text-decoration: underline;
	}
`;

const PortfolioInput = styled.input`
	width: 100%;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 16px;
`;
