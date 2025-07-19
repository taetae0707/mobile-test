import styled from "@emotion/styled";
import { getMobileVw } from "@utils/responsive";
import { useMoveToProfile } from "@hooks/landingPage/useMovetoProfile";
import { colors } from "@styles/foundation/color";

export function MobileTitleSection() {
	const { moveToProfile } = useMoveToProfile();

	return (
		<TitleSectionContainer>
			<TitleContainer>
				<Title style={{ fontWeight: "700" }}>품앗이</Title>
				<Title>대학생 전문 상담 멘토링</Title>
				<Description>
					현업 개발자 품앗이꾼들에게 도움을 받아보세요 !
				</Description>
				<QuestionButton onClick={() => moveToProfile("profileSection")}>
					질문하기
				</QuestionButton>
			</TitleContainer>
		</TitleSectionContainer>
	);
}

const TitleSectionContainer = styled.div`
	width: 100%;
	height: 28rem; //주의
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: linear-gradient(180deg, #fefffb 28.86%, #fafcf6 90.48%);
	background-image: url("/images/bg-landing-mobile-TitleSection.png");
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	/* padding: 140px 0; */
`;

const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	@media (max-width: 1024px) {
		margin: 30px 0;
	}
`;

const Title = styled.div`
	font-size: 80px;
	line-height: 160%;

	@media (max-width: 1024px) {
		font-size: 1.875rem;
		font-weight: 600;
	}
`;

const Description = styled.div`
	padding-top: 10px;
	line-height: 150%;
	font-size: 24px;
	color: #4e5053;

	@media (max-width: 1024px) {
		font-size: 0.9375rem;
	}
`;

const QuestionButton = styled.button`
	width: 100%;
	height: 3.75rem;
	border-radius: 2.75rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #3ecdba;
	color: white;

	font-size: 1.75rem;
	line-height: 150%;
	margin-top: 4.6875rem;
	cursor: pointer;

	&:hover {
		background-color: ${colors.green600};
	}

	@media (max-width: 1024px) {
		width: ${getMobileVw(200)};
		height: 2.75rem;
		font-size: 1rem;
		margin-top: 24px;
	}
`;
