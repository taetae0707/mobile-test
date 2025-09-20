"use client";

import { useEffect, useState } from "react";
import { useBasicPositionsStore } from "@store/basicPositions";
import { usePositionsQuery } from "@queries/usePositionsQuery";
import { POSITION_IDS } from "@types";

export function BasicFilter() {
	const {
		data: positions = [],
		isLoading: loading,
		error: queryError,
	} = usePositionsQuery();

	const { selectedPositionIds, setSelectedPositionIds } =
		useBasicPositionsStore();

	const error = queryError
		? queryError instanceof Error
			? queryError.message
			: "포지션 목록을 불러오는데 실패했습니다."
		: null;

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	// 컴포넌트 마운트 시 Web Frontend로 초기화
	useEffect(() => {
		if (positions.length > 0 && selectedPositionIds.length === 0) {
			// 1순위: WEB_FRONTEND 매칭
			const webFrontend = positions.find(
				(p) => p.position_id === POSITION_IDS.WEB_FRONTEND
			);

			if (webFrontend) {
				setSelectedPositionIds([webFrontend.position_id]);
			} else {
				// 2순위: 연관 포지션들(FULLSTACK 등)
				const fullstack = positions.find(
					(p) => p.position_id === POSITION_IDS.FULLSTACK
				);
				if (fullstack) {
					setSelectedPositionIds([fullstack.position_id]);
				}
			}
		}
	}, [positions, selectedPositionIds.length, setSelectedPositionIds]);

	const handlePositionClick = (positionId: number) => {
		// 단일 선택만 가능
		setSelectedPositionIds([positionId]);
		setIsDropdownOpen(false); // 선택 후 드롭다운 닫기
	};

	const getDisplayText = () => {
		if (selectedPositionIds.length === 0) {
			return "포지션 선택";
		}
		const selectedPosition = positions.find(
			(p) => p.position_id === selectedPositionIds[0]
		);
		return selectedPosition ? selectedPosition.title : "포지션 선택";
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
							const isSelected = selectedPositionIds.includes(
								position.position_id
							);
							return (
								<div
									key={position.position_id}
									onClick={() => handlePositionClick(position.position_id)}
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
