import { CompanyParentResponse } from "@api/types/company.types";
import Image from "next/image";
import { useState } from "react";
import { CircleBorder } from "@jobsPage/CompanyNav/CircleBorder";

interface CompanyCategoryProps {
	company: CompanyParentResponse;
	isSelected: boolean;
	onClick: (company: CompanyParentResponse) => void;
	hasNewJobs?: boolean; // 7일 이내 새 채용공고 여부
	hasActiveJobs?: boolean; // 현재 채용중인 공고가 있는지
}

// SRP: 개별 회사 네비게이션 버튼만 담당
export function CompanyNavIcon({
	company,
	isSelected,
	onClick,
	hasNewJobs = false,
	hasActiveJobs = false,
}: CompanyCategoryProps) {
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		setImageError(true);
	};

	return (
		<button
			onClick={() => onClick(company)}
			className={`
				flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer 
				transition-all duration-200 hover:scale-110
			`}
			role="tab"
			aria-selected={isSelected}
			aria-label={`${company.name} 채용공고 보기`}>
			{/* 동그란 회사 로고 */}
			<figure className="relative w-16 h-16">
				{imageError ? (
					// 이미지 로드 실패 시 보여줄 기본 아이콘
					<CircleBorder
						hasNewJobs={hasNewJobs}
						hasActiveJobs={hasActiveJobs}
						isSelected={isSelected}>
						<div className="flex items-center justify-center w-full h-full">
							<span className="text-gray-600 text-lg font-bold">
								{company.name.charAt(0)}
							</span>
						</div>
					</CircleBorder>
				) : (
					// 정상 이미지 - 동그라미 테두리로 감싸기
					<CircleBorder
						hasNewJobs={hasNewJobs}
						hasActiveJobs={hasActiveJobs}
						isSelected={isSelected}>
						<Image
							src={company.logo_url}
							alt={`${company.name} 로고`}
							width={64}
							height={64}
							className="w-full h-full object-cover"
							onError={handleImageError}
							priority={isSelected} // 선택된 회사는 우선 로드
						/>
					</CircleBorder>
				)}
			</figure>

			<span
				className={`
				text-xs font-medium text-center max-w-[64px] truncate
				${isSelected ? "text-gray-900 font-semibold" : "text-gray-700"}
			`}>
				{company.name}
			</span>
		</button>
	);
}
