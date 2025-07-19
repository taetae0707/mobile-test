import styled from "@emotion/styled";
import { usePoomCount } from "@hooks/landingPage/usePoomCount";
import Image from "next/image";
import poomCountIcon from "@images/landingPage/icon-poomCount.png";

export function PoomCounter() {
	const { qnaCount, accountCount } = usePoomCount();

	return (
		<CounterContainer>
			{/* <PoomCountIconContainer src={poomCountIcon} /> */}
			<IconWrapper>
				<Image
					src={poomCountIcon} // 기존 styled.img → next/image 적용
					alt="품 카운트 아이콘"
					fill // div에 꽉 차게
					sizes="72px" // mobile 기준에 맞춰 해상도 최적화
					style={{ objectFit: "contain" }} // 가로세로 비율 유지하며 꽉 차게
				/>
			</IconWrapper>
			<PoomExplainText>
				현재, <HighlightText>{accountCount}</HighlightText>명과{" "}
				<HighlightText>{qnaCount}</HighlightText>번의 품을 나누었어요.
			</PoomExplainText>
		</CounterContainer>
	);
}

const CounterContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	background-image: url("/images/bg-landing-web-poomCount.png");
	background-size: cover; // 이미지가 컨테이너를 꽉 채우도록
	background-position: center; // 이미지를 중앙에 배치
	background-repeat: no-repeat; // 이미지 반복

	gap: 40px;
	width: 100%;
	height: 466px;
`;

const PoomExplainText = styled.div`
	color: #0e0e0e;

	font-size: 56px;
	font-style: normal;
	font-weight: 500;
	line-height: 150%; /* 84px */
`;

// const PoomCountIconContainer = styled.img`
// 	width: 134px;
// 	height: 134px;
// `;

const IconWrapper = styled.div`
	position: relative; // fill 사용 시 필요
	width: 134px;
	height: 134px;
`;

const HighlightText = styled.span`
	color: #068372;

	font-size: 56px;
	font-style: normal;
	font-weight: 800;
	line-height: 150%; /* 84px */
`;
