"use client";

import { LandingInfoCard } from "@landingPage/web/LandingInfoCard.tsx";
import styled from "@emotion/styled";
// import { PoomasiGuideModal } from "@landingPage/web/PoomasiGuideModal.tsx";
// import { CommonGuideModal } from "@components/common/modal/CommonGuideModal.tsx";
import { modalData } from "@components/common/modal/modalGuide-data";
import { useState, useEffect } from "react";
import { ModalGuide } from "@components/common/modal";

import iconHowToUse from "@images/landingPage/icon-howToUse.png";
import iconRule from "@images/landingPage/icon-rule.png";
import iconDetailGuide from "@images/landingPage/icon-detailGuide.png";

export function IntroduceSection() {
	const [selectedModalKey, setSelectedModalKey] = useState<
		null | keyof typeof modalData
	>(null);

	// selectedModalKey 값 변경 시 콘솔에 출력
	useEffect(() => {
		console.log("선택된 모달 키:", selectedModalKey);
	}, [selectedModalKey]);

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
				<LandingInfoCard
					infoText="이용방법"
					imgSrc={iconHowToUse}
					onClick={() => {
						setSelectedModalKey("MobileInstructions");
					}}
				/>
				<LandingInfoCard
					infoText="품앗이 규칙"
					imgSrc={iconRule}
					onClick={() => setSelectedModalKey("Guideline")}
				/>
				<LandingInfoCard
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
	gap: 54px;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-image: url("/images/bg-landing-web-introduce.png");
	background-size: cover;
	background-position: center; // 이미지를 중앙에 배치
	background-repeat: no-repeat; // 이미지 반복
	padding-bottom: 90px;
`;

const IntroducePoomasi = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.75rem;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
`;

const IntroduceTitleText = styled.div`
	color: #068372;
	text-align: center;
	font-size: 36px;
	font-style: normal;
	font-weight: 800;
	line-height: 150%; /* 54px */
`;

const IntroduceText = styled.div`
	color: #0e0e0e;
	text-align: center;

	font-size: 32px;
	font-style: normal;
	font-weight: 400;
	line-height: 150%; /* 48px */
`;

const IntroduceCardList = styled.div`
	width: 1320px;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	justify-content: center;
	gap: 20px;

	@media (max-width: 1320px) {
		width: 1024px;
	}
`;
