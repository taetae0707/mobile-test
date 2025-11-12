import styled from "@emotion/styled";
// import editPencil from '@assets/images/pencil.svg'
// import pencilSaveIcon from '@assets/images/pencil-save.svg'

interface EditPencilButtonProps {
	isEditing: boolean;
	onClick: () => void;
	loading?: boolean;
}

export function EditPencilButton({
	isEditing,
	onClick,
	loading,
}: EditPencilButtonProps) {
	return (
		<Wrapper
			onClick={onClick}
			disabled={loading}>
			{isEditing ? (
				<EditPencilBtn
					src="images/button-pencil-save.svg"
					alt="저장하기"
				/>
			) : (
				<EditPencilBtn
					src="images/button-pencil.svg"
					alt="수정하기"
				/>
			)}

			<EditAction isEditing={isEditing}>
				{isEditing ? "저장" : "수정"}
			</EditAction>
		</Wrapper>
	);
}

const Wrapper = styled.button`
	display: flex;
	align-items: center;
	border: none;
	background: transparent;
	cursor: pointer;
	padding: 0;
	@media (max-width: 1024px) {
		margin-top: 30px;
	}
`;

const EditPencilBtn = styled.img`
	cursor: pointer;
	margin-right: 8px;
	@media (max-width: 1024px) {
		height: 12px;
	}
`;

const EditAction = styled.div<{ isEditing: boolean }>`
	font-size: 16px;
	color: ${({ isEditing }) => (isEditing ? "#3ecdba" : "#9B9EA2")};
	cursor: pointer;
	@media (max-width: 1024px) {
		font-size: 12px;
	}
`;
