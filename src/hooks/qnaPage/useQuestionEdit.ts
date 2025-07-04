import { useState } from "react";
import { GetQnaListResponse } from "api/types/qna.type";
import { EditsApi } from "api/edits/edit-api";

export function useQuestionEdit(
	question: GetQnaListResponse,
	onUpdateRequest?: () => void
) {
	const [isEditing, setIsEditing] = useState(false);
	const [editedText, setEditedText] = useState(question.question_text);
	const [showEditBtn, setShowEditBtn] = useState(false);
	const [editedPortfolioLink, setEditedPortfolioLink] = useState(
		question.portfolio_link ?? ""
	);

	const handleEditClick = () => {
		setIsEditing(true);
		setShowEditBtn(false);
	};

	const handleCancelClick = () => {
		setEditedText(question.question_text);
		setIsEditing(false);
	};

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setEditedText(e.target.value);
	};

	const handleSaveClick = async (portfolioLink: string) => {
		try {
			await EditsApi.patchQna(question.public_id, editedText, portfolioLink);
			setIsEditing(false);
			if (onUpdateRequest) onUpdateRequest();
		} catch (err) {
			console.error("질문 수정 실패:", err);
			alert("수정 실패! 다시 시도해주세요.");
		}
	};

	const toggleEditBtn = () => {
		setShowEditBtn((prev) => !prev);
	};

	//   if (onUpdateRequest) onUpdateRequest()

	return {
		isEditing,
		editedText,
		showEditBtn,
		toggleEditBtn,
		handleEditClick,
		handleCancelClick,
		handleTextChange,
		handleSaveClick,
	};
}
