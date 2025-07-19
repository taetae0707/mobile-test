// import poomCountIcon from '@assets/images/landingPage/poom-count-icon.svg'
// import poomCountBackground from '@assets/images/landingPage/mobile-poomCounterBg.png'
import styled from "@emotion/styled";
import { usePoomCount } from "@hooks/landingPage/usePoomCount";
import { getMobileVw } from "@utils/responsive";
import { colors } from "@styles/foundation/color";

import Image from "next/image";
import poomCountIcon from "@images/landingPage/icon-poomCount.png";

export function MobilePoomCounter() {
	const { qnaCount, accountCount } = usePoomCount();

	return (
		<CounterContainer>
			{/* <PoomCountIconContainer src={poomCountIcon} /> */}
			<IconWrapper>
				<Image
					src={poomCountIcon}
					alt="품 카운트 아이콘"
					fill // div에 꽉 차게
					sizes="62px" // mobile 기준에 맞춰 해상도 최적화
					style={{ objectFit: "contain" }} // 가로세로 비율 유지하며 꽉 차게
				/>
			</IconWrapper>
			<PoomExplainText>
				현재, <HighlightText>{accountCount}명</HighlightText>과 <br></br>
				<HighlightText>{qnaCount}번</HighlightText>의 품을 나누었어요.
			</PoomExplainText>
		</CounterContainer>
	);
}

const CounterContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	background-image: url("/images/bg-landing-mobile-poomCount.png");
	background-size: cover; // 이미지가 컨테이너를 꽉 채우도록
	background-position: center; // 이미지를 중앙에 배치
	background-repeat: no-repeat; // 이미지 반복

	gap: 2.5rem;
	width: 100%;
	height: auto;
	padding: 1.875rem;

	@media (max-width: 1024px) {
		gap: 1rem;
		padding: 2.375rem 3.625rem;
	}
`;

const IconWrapper = styled.div`
	position: relative; // fill 사용 시 필요
	width: ${getMobileVw(62)};
	height: ${getMobileVw(62)};
	@media (max-width: 1024px) {
	}
`;

const PoomExplainText = styled.div`
	width: 93%;
	color: #0e0e0e;
	font-size: 1.5rem;
	font-style: normal;
	font-weight: 500;
	line-height: 150%;
	text-align: center;
`;

const HighlightText = styled.span`
	color: ${colors.green700};
	font-weight: 800;
`;
