import { ReactNode } from "react";

interface CircleBorderProps {
	children: ReactNode;
	hasNewJobs?: boolean; // 7일 이내 새 채용공고 여부
	size?: "sm" | "md" | "lg";
	isSelected?: boolean; // 선택 상태
}

// SRP: 동그라미 테두리 스타일과 상태 표시만 담당
export function CircleBorder({
	children,
	hasNewJobs = false,
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
			return "border-green-500 shadow-green-200"; // 새 채용공고가 있으면 초록색
		}
		if (isSelected) {
			return "border-blue-500 shadow-blue-200"; // 선택된 상태면 파란색
		}
		return "border-gray-300 shadow-gray-200"; // 기본 회색
	};

	// 새 채용공고 알림 점
	const renderNewJobsIndicator = () => {
		if (!hasNewJobs) return null;

		return (
			<div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse">
				<span className="sr-only">새로운 채용공고 있음</span>
			</div>
		);
	};

	return (
		<div className="relative">
			<div
				className={`
				${sizeStyles[size]} rounded-full
				transition-all duration-200
				border-2 ${getBorderStyle()}
				p-1
				${isSelected ? "scale-110" : ""}
			`}>
				<div className="w-full h-full rounded-full overflow-hidden">
					{children}
				</div>
			</div>
			{renderNewJobsIndicator()}
		</div>
	);
}
