import styled from "@emotion/styled";
// import { QuestionAnswerButton } from "@components/qnaPage/web/QuestionList";

type Props = {
	onSave: () => void;
	onCancel: () => void;
};

export function EditActionButtons({ onSave, onCancel }: Props) {
	return (
		<ButtonWrapper>
			<QuestionAnswerButton onClick={onSave}>저장</QuestionAnswerButton>
			<QuestionAnswerButton onClick={onCancel}>취소</QuestionAnswerButton>
		</ButtonWrapper>
	);
}

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 16px;
`;

const QuestionAnswerButton = styled.div`
	width: 10%;
	display: flex;

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

	@media (max-width: 1024px) {
		width: 18%;
		font-size: 14px;
	}
	@media (max-width: 450px) {
		width: 25%;
		font-size: 12px;
	}
`;
