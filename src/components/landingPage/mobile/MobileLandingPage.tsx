import styled from "@emotion/styled";
// import { Footer } from "@components/common/Footer/Footer";
import * as MobileComponents from "@landingPage/mobile/index";

export function MobileLandingPage() {
	return (
		<PageContainer>
			<MobileComponents.MobileTitleSection />
			<MobileComponents.MobileIntroduceSection />
			<MobileComponents.MobilePoomCounter />
			<MobileComponents.MobileProfilesSection />
			{/* <Footer /> */}
		</PageContainer>
	);
}

const PageContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	@media (max-width: 375px) {
	}
`;
