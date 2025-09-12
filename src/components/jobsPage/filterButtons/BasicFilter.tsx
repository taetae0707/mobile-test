"use client";

import { useEffect, useState } from "react";
import { usePositionsStore } from "@store/positions";

export function BasicFilter() {
	const {
		positions,
		selectedPositions,
		loading,
		error,
		initializeWithWebFrontend,
		setSelectedPositions,
	} = usePositionsStore();

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	// 컴포넌트 마운트 시 Web Frontend로 초기화
	useEffect(() => {
		initializeWithWebFrontend();
	}, [initializeWithWebFrontend]);

	const handlePositionClick = (positionTitle: string) => {
		// 단일 선택만 가능
		setSelectedPositions([positionTitle]);
		setIsDropdownOpen(false); // 선택 후 드롭다운 닫기
	};

	const getDisplayText = () => {
		if (selectedPositions.length === 0) {
			return "포지션 선택";
		}
		return selectedPositions[0];
	};

	if (error) {
		return (
			<div className="p-4 bg-red-50 border border-red-200 rounded-lg">
				<p className="text-red-600 text-sm">{error}</p>
			</div>
		);
	}

	return (
		<div className="relative">
			{/* 드롭다운 텍스트 */}
			<div
				onClick={() => !loading && setIsDropdownOpen(!isDropdownOpen)}
				className={`flex items-center cursor-pointer ${loading ? "cursor-not-allowed opacity-50" : ""}`}>
				<span className="text-gray-900 font-medium text-lg">
					{loading ? "로딩중..." : getDisplayText()}
				</span>
				<svg
					className={`ml-1 h-4 w-4 text-gray-600 transition-transform duration-200 ${
						isDropdownOpen ? "rotate-180" : ""
					}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</div>

			{/* 드롭다운 메뉴 */}
			{isDropdownOpen && !loading && (
				<div className="absolute z-10 mt-2 min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg">
					{/* 포지션 목록 */}
					<div className="max-h-60 overflow-y-auto py-1">
						{positions.map((position) => {
							const isSelected = selectedPositions.includes(position.title);
							return (
								<div
									key={position.position_id}
									onClick={() => handlePositionClick(position.title)}
									className={`px-4 py-2 text-base cursor-pointer hover:bg-gray-50 ${
										isSelected ? "bg-blue-50 text-blue-700" : "text-gray-700"
									}`}>
									{position.title}
								</div>
							);
						})}
					</div>
				</div>
			)}

			{/* 드롭다운 외부 클릭 시 닫기 */}
			{isDropdownOpen && (
				<div
					className="fixed inset-0 z-0"
					onClick={() => setIsDropdownOpen(false)}
				/>
			)}
		</div>
	);
}
