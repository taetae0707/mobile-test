"use client";

import styled from "@emotion/styled";
import TitleSection from "@components/landingPage/web/TitleSection.tsx";
import { PoomCounter } from "@components/landingPage/web/PoomCounter.tsx";
import { ProfilesSection } from "@components/landingPage/web/ProfilesSection.tsx";
import { IntroduceSection } from "@components/landingPage/web/IntroduceSection.tsx";
import { MobileLandingPage } from "@components/landingPage/mobile/MobileLandingPage";
import { useMobileStore } from "@store/useMobileStore.ts";

export default function LandingPage() {
	const { isMobile } = useMobileStore();

	return isMobile ? (
		<MobileLandingPage />
	) : (
		// Pc 랜더링 컴포넌트
		<PageContainer>
			<TitleSection />
			<IntroduceSection />
			<PoomCounter />
			<ProfilesSection />
		</PageContainer>
	);
}

const PageContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 60px;
`;
