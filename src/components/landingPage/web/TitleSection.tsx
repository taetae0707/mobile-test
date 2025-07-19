import styled from "@emotion/styled";
import { useMoveToProfile } from "@hooks/landingPage/useMovetoProfile";
import { colors } from "@styles/foundation/color";

export default function TitleSection() {
	const { moveToProfile } = useMoveToProfile();
	return (
		<TitleSectionContainer>
			<TitleContainer>
				<Title style={{ fontWeight: 800 }}>품앗이</Title>
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
	height: 730px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-image:
		url("/images/bg-landing-web-title.png"),
		linear-gradient(180deg, #fefffb 28.86%, #fafcf6 90.48%);
	background-size: cover;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	padding: 140px 0;
`;

const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

const Title = styled.div`
	font-size: 90px;
	line-height: 160%;
	font-weight: 700;
`;

const Description = styled.div`
	padding-top: 10px;

	font-size: 34px;
	font-style: normal;
	font-weight: 700;
	line-height: 150%; /* 51px */
	color: #4e5053;
`;

const QuestionButton = styled.div`
	width: 406px;
	height: 80px;
	border-radius: 45.5008px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	background-color: #3ecdba;
	color: white;

	font-size: 28px;
	line-height: 150%;
	font-weight: 800;
	margin-top: 75px;

	cursor: pointer;

	&:hover {
		background-color: ${colors.green600};
	}
`;
