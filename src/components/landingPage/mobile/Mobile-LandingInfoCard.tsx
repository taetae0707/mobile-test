import styled from "@emotion/styled";
import Image from "next/image";
import type { StaticImageData } from "next/image";
//next/image로 import한 PNG, JPG, SVG는 TypeScript 상에서 StaticImageData 타입이다.

interface LandingInfoCardProps {
	infoText: string;
	imgSrc: string | StaticImageData;
	onClick?: () => void;
}

export function MobileLandingInfoCard({
	infoText,
	imgSrc,
	onClick,
}: LandingInfoCardProps) {
	return (
		<LandingInfoCardContainer onClick={onClick}>
			{/* <InfoCardImage src={imgSrc} className="InfoCardImage" /> */}
			<ImageWrapper>
				<Image
					src={imgSrc}
					alt={infoText}
					fill
					sizes="(max-width: 1024px) 30vw, 65vw"
					style={{ objectFit: "contain" }}
				/>
			</ImageWrapper>
			<InfoCardText>{infoText}</InfoCardText>
		</LandingInfoCardContainer>
	);
}

const LandingInfoCardContainer = styled.div`
	gap: 1.625rem;
	width: 100%;
	height: 30rem;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 1.25rem 20px;
	border-radius: 1.375rem;
	background: #fff;

	@media (max-width: 1320px) {
		height: 17rem;
		gap: 1rem;
	}

	@media (max-width: 1024px) {
		height: auto;
		padding: 1.25rem 20px 24px 20px;
	}
`;

const ImageWrapper = styled.div`
	position: relative;
	width: 65%;
	height: 50%;
	aspect-ratio: 1 / 1;

	@media (max-width: 1024px) {
		width: 30%;
		height: 45%;
	}
	@media (max-width: 834px) {
		width: 40%;
		height: 50%;
	}
`;

const InfoCardText = styled.div`
	color: #0e0e0e;
	font-size: 1.75rem;
	font-style: normal;
	font-weight: 600;
	line-height: 150%;
	@media (max-width: 1024px) {
		font-size: 1.125rem;
		line-height: 120%;
		font-weight: 500;
	}
`;
