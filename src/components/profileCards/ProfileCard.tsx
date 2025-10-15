"use client";

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
import Image from "next/image";

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
			<div
				className={`bg-gradient-to-br from-gray-500 to-black shadow-2xl rounded-2xl w-full h-96 p-8 relative overflow-hidden flex flex-col justify-center text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-3xl group ${profileData.is_vacation ? "filter blur-sm bg-gray-300/50 pointer-events-none" : ""}`}
				style={{ paddingTop: "12%" }}>
				{/* 호버 시 회색 오버레이 */}
				<div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
				{profileData.is_vacation && (
					<div className="text-6xl break-keep absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold z-10">
						<div className="text-8xl">🏖</div>
						휴가를 떠났어요 :D
					</div>
				)}

				{/* 회사 타이틀 */}
				<div
					className="absolute top-2 right-4 bg-white text-black px-4 py-2 rounded-t-3xl rounded-br-3xl text-md font-bold uppercase shadow-lg border-2 border-gray-400"
					style={{ marginTop: "2%" }}>
					{profileData.company1 || "Company"}
				</div>

				{/* 프로필 이미지와 이름 */}
				<div className="flex flex-col items-center ">
					<Image
						src={profileData.profile_image}
						alt={"profile-image"}
						width={120}
						height={120}
						className="object-cover rounded-full border-[3px] border-white/20 mb-4"
					/>
					<div className="text-white text-3xl font-bold leading-tight mb-2 text-center">
						{profileData.name}
					</div>
				</div>

				{/* 경력 정보 */}
				<div className="flex-1 flex flex-col gap-3">
					<div className="text-white/90 text-base font-semibold leading-snug text-center">
						{profileData.field}
					</div>

					<div
						className="flex flex-wrap gap-2 mt-4"
						style={{ justifyContent: "center" }}>
						{profileData.company1 && (
							<div className="bg-white/10 border border-white/30 text-white px-2 py-1 rounded-xl text-xs font-medium backdrop-blur-sm">
								{profileData.company1} 개발자
							</div>
						)}
						{profileData.company2 && (
							<div className="bg-white/10 border border-white/30 text-white px-2 py-1 rounded-xl text-xs font-medium backdrop-blur-sm">
								{profileData.company2} 개발자
							</div>
						)}
						{profileData.job1 && (
							<div className="bg-white/10 border border-white/30 text-white px-2 py-1 rounded-xl text-xs font-medium backdrop-blur-sm">
								{profileData.job1}
							</div>
						)}
						{profileData.job2 && (
							<div className="bg-white/10 border border-white/30 text-white px-2 py-1 rounded-xl text-xs font-medium backdrop-blur-sm">
								{profileData.job2}
							</div>
						)}
					</div>
				</div>

				{/* 호버 시 나타나는 질문하기 버튼 */}
				{!profileData.is_vacation && (
					<div
						className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
						style={{ width: "70%" }}>
						<button
							onClick={(e) => {
								e.stopPropagation();
								handleProfileClick(profileData);
							}}
							className="bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-full font-semibold shadow-xl transform hover:scale-105 transition-all duration-200 text-xl whitespace-nowrap w-50"
							style={{ width: "100%" }}>
							질문하기
						</button>
					</div>
				)}
			</div>
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
