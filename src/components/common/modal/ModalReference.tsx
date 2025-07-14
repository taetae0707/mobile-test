import styled from "@emotion/styled";
// import { getMobileVw } from '@utils/responsive.ts'
import { CloseButton } from "@components/common/button";
import { useMobileStore } from "@store/useMobileStore";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

type ModalReferenceProps = {
	children: React.ReactNode;
	onClick?: () => void;
};

function ModalReference({ children, onClick }: ModalReferenceProps) {
	const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

	useEffect(() => {
		const root = document.getElementById("modal-root");
		setModalRoot(root);
	}, []);

	if (!modalRoot) return null; // modalRoot가 준비될 때까지 렌더링하지 않음

	const modalContent = (
		<>
			<ModalOverlay
				onClick={onClick}
				className="ModalOverlay"
			/>
			<ModalWrapper className="ModalWrapper">{children}</ModalWrapper>
		</>
	);

	return createPortal(
		<ModalContainer className="ModalReference">{modalContent}</ModalContainer>,
		modalRoot
	);
}

function Header({ onClickClose }: { onClickClose: () => void }) {
	return (
		<ModalHeader>
			<CloseButton onClick={onClickClose} />
		</ModalHeader>
	);
}

function Body({ children }: { children: React.ReactNode }) {
	return <div>{children}</div>;
}

//ModalReference 컴포넌트 객체에 Header와 Body라는 "속성"을 추가
ModalReference.Header = Header;
ModalReference.Body = Body;

export default ModalReference;

const ModalContainer = styled.div`
	position: fixed;
	inset: 0; /* top:0; right:0; bottom:0; left:0; 와 같음 */
	z-index: 9999;
	display: flex;
	justify-content: center;
	align-items: center;
	/* pointer-events: none;  */
`;

const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.4); // 어두운 배경
	z-index: 999999;
	opacity: 0;
	animation: fadeIn 0.3s forwards;

	@keyframes fadeIn {
		to {
			opacity: 1;
		}
	}
`;

const ModalWrapper = styled.section`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 9999999999;
	width: 45%;
	height: auto;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 1rem;
	border-radius: 1rem;

	@media (max-width: 990px) {
		width: 55%;
	}

	@media (max-width: 675px) {
		width: 70%;
	}

	@media (max-width: 520px) {
		width: 90%;
	}
`;

const ModalHeader = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	width: 100%;
	padding: 0.6rem 1.25rem;

	@media (max-width: 1024px) {
		padding: 0.6rem;
	}
`;
