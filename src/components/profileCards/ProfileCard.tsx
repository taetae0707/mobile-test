"use client";

import styled from "@emotion/styled";
import isPropValid from "@emotion/is-prop-valid";
import Card from "@mui/material/Card";
// import { CardActionArea } from '@mui/material'
// import { useNavigate } from 'react-router-dom'
import { useProfileCard } from "@hooks/landingPage/useProfileCard";
import { getMobileVw } from "@utils/responsive.ts";
// import { PoomasiGuideModal } from "@components/landingPage/web/PoomasiGuideModal.tsx";
// import { useMobileStore } from "@store/useMobileStore";
import { ModalGuide } from "@components/common/modal";
import { modalData } from "@components/common/modal/modalGuide-data";
import { ProfileData } from "@types";
import { useEffect } from "react";

interface ProfileCardProps {
	profileData: ProfileData;
}

export function ProfileCard({ profileData }: ProfileCardProps) {
	const {
		handleProfileClick,
		// useGuideModal,
		// setUseGuideModal,
		selectedCardKey,
		setSelectedCardKey,
	} = useProfileCard();

	// const isMobile = useMobileStore((state) => state.isMobile);
	// const modalInfo = selectedCardKey ? modalData[selectedCardKey] : null;

	return (
		<div>
			<Container
				isVacation={profileData.is_vacation}
				onClick={() => handleProfileClick(profileData)}
				className="profileCardContainer">
				{profileData.is_vacation && (
					<TextBlurOverlay>
						<div style={{ fontSize: "100px" }}>🏖</div>
						휴가를 떠났어요 :D
					</TextBlurOverlay>
				)}

				<ProfilePictureWrapper>
					<ProfileImage
						src={profileData.profile_image}
						alt={"profile-image"}
					/>
				</ProfilePictureWrapper>
				<ProfileIntroContainer>
					<ProfileName>{profileData.name}</ProfileName>
					<ProfileField>{profileData.field}</ProfileField>

					<ProfileHistory>
						<ProfileHistoryItem>{profileData.company1}</ProfileHistoryItem>
						<ProfileHistoryItem>{profileData.job1}</ProfileHistoryItem>
					</ProfileHistory>

					<ProfileHistory>
						<ProfileHistoryItem>{profileData.company2}</ProfileHistoryItem>
						<ProfileHistoryItem>{profileData.job2}</ProfileHistoryItem>
					</ProfileHistory>
				</ProfileIntroContainer>
			</Container>
			{selectedCardKey && (
				<ModalGuide
					type="MobileInstructions"
					// title={modalData[selectedCardKey].title}
					// content={modalData[selectedCardKey].content}
					onClose={() => setSelectedCardKey(null)}
				/>
			)}

			{/* {useGuideModal &&
				modalInfo &&
				(isMobile && modalInfo.type === "swiper" ? (
					<ModalGuide
						type="swiper"
						title={modalInfo.title}
						contents={modalInfo.contents}
						onClose={() => setUseGuideModal(false)}
					/>
				) : (
					<PoomasiGuideModal onClose={() => setUseGuideModal(false)} />
				))} */}
		</div>
	);
}

const Container = styled(Card, {
	shouldForwardProp: (prop) => isPropValid(prop) && prop !== "isVacation",
})<{ isVacation: boolean }>`
	box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.12);

	gap: 2rem;
	width: 100%;
	height: 428px;
	padding: 30px 0;
	position: relative;
	overflow: hidden;
	margin-top: 1.5rem;
	border-radius: 5%;
	display: flex;
	flex-direction: column;

	@media (max-width: 1320px) {
		height: 400px;
	}

	${({ isVacation }) =>
		isVacation &&
		`
    filter: blur(5px);
    -webkit-filter: blur(5px);
    background: rgba(255, 255, 255, 0.5);
    pointer-events: none;
  `} @media (
	max-width: 1024px) {
		height: 80%;
		scroll-snap-align: start;
		/* flex: 0 0 80%; */
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		width: ${getMobileVw(300)};
		overflow: visible;
		padding: 1.125rem ${getMobileVw(16)};
		gap: ${getMobileVw(16)};
		border-radius: 8px;
		box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12);
		margin-top: 1rem;
	}

	@media (max-width: 530px) {
		height: 130px;
	}

	cursor: pointer;
`;

const ProfilePictureWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	overflow: hidden;

	@media (max-width: 1024px) {
		width: ${getMobileVw(60)};
		height: ${getMobileVw(60)};
		border-radius: 50%;
		overflow: hidden;
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

const ProfileImage = styled.img`
	width: 161px;
	height: 161px;
	object-fit: contain;
	border-radius: 100%;

	@media (max-width: 1320px) {
		width: 130px;
		height: 130px;
	}

	@media (max-width: 1024px) {
		width: 84%;
		height: 84%;
		object-fit: cover;
	}
	@media (max-width: 520px) {
		width: 100%;
		height: 100%;
	}
`;

const ProfileIntroContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	@media (max-width: 1024px) {
		align-items: flex-start;
		justify-content: center;
		gap: 8px;
	}
`;

const ProfileName = styled.div`
	color: #0e0e0e;

	font-size: 24px;
	font-style: normal;
	font-weight: 800;
	line-height: 150%; /* 36px */

	@media (max-width: 1320px) {
		font-size: 1.5rem;
	}

	@media (max-width: 1024px) {
		font-size: 1.2rem;
	}
	@media (max-width: 520px) {
		font-size: 1rem;
	}
`;

const ProfileField = styled.div`
	color: #068372;

	font-size: 18px;
	font-style: normal;
	font-weight: 700;
	line-height: 150%; /* 27px */

	@media (max-width: 1320px) {
		font-size: 1.3rem;
	}

	@media (max-width: 1024px) {
		/* font-size: 0.875rem; */
		font-size: 1rem;
	}
	@media (max-width: 520px) {
		font-size: 0.75rem;
	}
`;

const ProfileHistory = styled.div`
	margin-top: 10%;
	font-size: 13px;
	font-weight: bold;
	color: #727478;

	height: 30px;

	@media (max-width: 1024px) {
		height: auto;
		margin-top: 0;
		display: flex;
		gap: 5px;
	}
`;

const ProfileHistoryItem = styled.div`
	font-size: 16px;
	font-weight: 500;
	text-align: center;

	/* @media (max-width: 1320px) {
    font-size: 0.9rem;
  } */

	@media (max-width: 1024px) {
		font-size: 10px;
		height: auto;
		text-align: left;
		line-height: 1.3;
	}
`;

const TextBlurOverlay = styled.div`
	font-size: 24px;
	word-break: keep-all;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	font-weight: bold;
	z-index: 2;
`;
