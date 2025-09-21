import { ReactNode } from "react";

interface CircleBorderProps {
	children: ReactNode;
	hasNewJobs?: boolean; // 7일 이내 새 채용공고 여부
	hasActiveJobs?: boolean; // 현재 채용중인 공고가 있는지
	size?: "sm" | "md" | "lg";
	isSelected?: boolean; // 선택 상태
}

// SRP: 동그라미 테두리 스타일과 상태 표시만 담당
export function CircleBorder({
	children,
	hasNewJobs = false,
	hasActiveJobs = false,
	size = "md",
	isSelected = false,
}: CircleBorderProps) {
	// 크기별 스타일 정의
	const sizeStyles = {
		sm: "w-12 h-12",
		md: "w-16 h-16",
		lg: "w-20 h-20",
	};

	// 상태에 따른 테두리 색상과 스타일
	const getBorderStyle = () => {
		if (hasNewJobs) {
			return "border-transparent shadow-lg"; // 새 채용공고가 있으면 그라데이션
		}
		if (hasActiveJobs) {
			return "border-transparent shadow-lg"; // 채용중이면 그라데이션
		}

		return "border-gray-300 shadow-gray-200"; // 기본 회색
	};

	// 그라데이션 배경 스타일
	const getGradientStyle = () => {
		if (hasNewJobs || hasActiveJobs) {
			return "bg-gradient-to-r from-[#0491F5] to-[#FF05E6]"; // 파란색에서 마젠타로
		}
		return "";
	};

	// 새 채용공고 알림 점
	const renderNewJobsIndicator = () => {
		if (!hasNewJobs) return null;

		return (
			<div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse flex items-center justify-center">
				<span className="text-white text-xs font-bold">N</span>
			</div>
		);
	};

	// 채용중 표시
	const renderActiveJobsIndicator = () => {
		if (!hasActiveJobs) return null;

		return (
			<div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#0491F5] to-[#FF05E6] text-white text-xs px-3 py-1 rounded-full border border-white shadow-sm w-16">
				채용중
			</div>
		);
	};

	return (
		<div className="relative">
			<div
				className={`
				${sizeStyles[size]} rounded-full
				transition-all duration-200
				border ${getBorderStyle()}
				p-1
				${isSelected ? "scale-110" : ""}
				${getGradientStyle()}
			`}>
				<div className="w-full h-full rounded-full overflow-hidden bg-white">
					{children}
				</div>
			</div>
			{renderNewJobsIndicator()}
			{renderActiveJobsIndicator()}
		</div>
	);
}
