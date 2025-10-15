"use client";

import { useProfileList } from "@hooks/landingPage/useProfileList";
import { ProfileCard } from "@components/profileCards/ProfileCard";

export default function QnaPage() {
	const { accountList } = useProfileList();

	return (
		<div className="min-h-screen bg-white pt-20 px-4">
			<div className="max-w-6xl mx-auto">
				{/* 헤더 섹션 */}
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-black mb-4">멘토 소개</h1>
					<p className="text-lg text-gray-600">
						빅테크에서도 보기 힘든 실력자들에게 질문을 남겨보세요!
					</p>
				</div>

				{/* 프로필 카드 그리드 */}
				<div className="grid grid-cols-3 gap-8 mb-12">
					{accountList.map((profile: any, index: number) => (
						<ProfileCard
							key={index}
							profileData={profile}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
