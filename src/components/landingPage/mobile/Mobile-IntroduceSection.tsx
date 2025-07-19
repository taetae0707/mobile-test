"use client";

import styled from "@emotion/styled";
import { useState } from "react";
import { MobileLandingInfoCard } from "@landingPage/mobile/Mobile-LandingInfoCard";
import { ModalGuide } from "@components/common/modal/ModalGuide";
import { modalData } from "@components/common/modal/modalGuide-data";

import iconHowToUse from "@images/landingPage/icon-howToUse.png";
import iconRule from "@images/landingPage/icon-rule.png";
import iconDetailGuide from "@images/landingPage/icon-detailGuide.png";

export function MobileIntroduceSection() {
	const [selectedModalKey, setSelectedModalKey] = useState<
		null | keyof typeof modalData
	>(null);

	const handleModalClose = () => {
		setSelectedModalKey(null);
	};

	return (
		<IntroduceSectionContainer>
			<IntroducePoomasi>
				<IntroduceTitleText>품앗이꾼은요?</IntroduceTitleText>
				<IntroduceText>
					누구에게나 배울점이 있다는 믿음하에 저희가
					<br />
					가진 경험을 서로 전파해요!
				</IntroduceText>
			</IntroducePoomasi>
			<IntroduceCardList>
				<MobileLandingInfoCard
					infoText="이용방법"
					imgSrc={iconHowToUse}
					onClick={() => setSelectedModalKey("MobileInstructions")}
				/>
				<MobileLandingInfoCard
					infoText="품앗이 규칙"
					imgSrc={iconRule}
					onClick={() => setSelectedModalKey("Guideline")}
				/>
				<MobileLandingInfoCard
					infoText="세부안내"
					imgSrc={iconDetailGuide}
					onClick={() => setSelectedModalKey("DetailGuide")}
				/>
			</IntroduceCardList>
			{selectedModalKey && (
				<ModalGuide
					type={selectedModalKey}
					// title={modalData[selectedModalKey].title}
					// content={modalData[selectedModalKey].content}
					onClose={handleModalClose}
				/>
			)}
		</IntroduceSectionContainer>
	);
}

const IntroduceSectionContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 50px;
	justify-content: center;
	width: 100%;
	/* height: 846px; */
	background-image: url("/images/bg-landing-web-introduce.png");
	background-size: cover; // 이미지가 컨테이너를 꽉 채우도록
	background-position: center; // 이미지를 중앙에 배치
	background-repeat: no-repeat; // 이미지 반복
	padding: 1.875rem 0;
	@media (max-width: 1024px) {
		gap: 0px;
	}
`;

const IntroducePoomasi = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.75rem;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	@media (max-width: 1024px) {
		margin: 1.875rem 0;
		gap: 0.8rem;
	}
`;

const IntroduceTitleText = styled.div`
	color: #068372;
	text-align: center;
	font-size: 2rem;
	font-style: normal;
	font-weight: 800;
	line-height: 150%; /* 54px */
`;

const IntroduceText = styled.div`
	color: #0e0e0e;
	text-align: center;

	font-size: 1rem;
	font-style: normal;
	font-weight: 400;
	line-height: 150%; /* 48px */
`;

const IntroduceCardList = styled.div`
	width: 60%;
	height: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	/* padding: 20px 0; */
	gap: 1rem;
	/* padding-bottom: 160px; */
`;
