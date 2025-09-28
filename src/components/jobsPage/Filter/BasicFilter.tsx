"use client";

import { useEffect, useState, useMemo } from "react";
import { useFilterStore } from "@store/filters";
import { usePositionsQuery } from "@queries/usePositionsQuery";
import { useRecruitmentQuery } from "@queries/useRecruitmentQuery";
import { POSITION_IDS } from "@types";
import { RecruitmentResponse } from "@api/types/job.types";

export function BasicFilter() {
	const {
		data: positions = [],
		isLoading: loading,
		error: queryError,
	} = usePositionsQuery();

	const {
		data: recruitments = [],
		isLoading: recruitmentLoading,
		error: recruitmentError,
	} = useRecruitmentQuery();

	const { basicPositionId, setBasicPositionId, getPositionDisplayText } =
		useFilterStore();

	const error =
		queryError || recruitmentError
			? queryError instanceof Error
				? queryError.message
				: recruitmentError instanceof Error
					? recruitmentError.message
					: "데이터를 불러오는데 실패했습니다."
			: null;

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	// 포지션별 채용공고 개수 계산
	const positionCounts = useMemo(() => {
		if (!recruitments.length || !positions.length) return {};

		const counts: Record<number, number> = {};

		// 각 포지션별로 채용공고 개수 계산
		positions.forEach((position) => {
			counts[position.position_id] = recruitments.filter(
				(recruitment) =>
					recruitment.position_id === position.position_id &&
					!recruitment.is_closed
			).length;
		});

		return counts;
	}, [recruitments, positions]);

	// 컴포넌트 마운트 시 Web Frontend로 초기화 (이미 스토어에서 기본값 1로 설정됨)
	// 포지션 데이터가 로드되면 유효성 검사만 수행
	useEffect(() => {
		if (positions.length > 0 && basicPositionId === 1) {
			// Web Frontend가 실제로 존재하는지 확인
			const webFrontend = positions.find(
				(p) => p.position_id === POSITION_IDS.WEB_FRONTEND
			);

			if (!webFrontend) {
				// Web Frontend가 없으면 Fullstack으로 대체
				const fullstack = positions.find(
					(p) => p.position_id === POSITION_IDS.FULLSTACK
				);
				if (fullstack) {
					setBasicPositionId(fullstack.position_id);
				}
			}
		}
	}, [positions, basicPositionId, setBasicPositionId]);

	const handlePositionClick = (positionId: number) => {
		// 단일 선택만 가능
		setBasicPositionId(positionId);
		setIsDropdownOpen(false); // 선택 후 드롭다운 닫기
	};

	// 표시 텍스트는 스토어의 계산 함수 사용
	const displayText = getPositionDisplayText(positions);

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
				onClick={() =>
					!loading && !recruitmentLoading && setIsDropdownOpen(!isDropdownOpen)
				}
				className={`flex items-center cursor-pointer ${loading || recruitmentLoading ? "cursor-not-allowed opacity-50" : ""}`}>
				<span className="text-gray-900 font-medium text-lg">
					{loading || recruitmentLoading ? "로딩중..." : displayText}
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
			{isDropdownOpen && !loading && !recruitmentLoading && (
				<div className="absolute z-10 mt-2 min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg">
					{/* 포지션 목록 */}
					<div className="max-h-60 overflow-y-auto py-1">
						{positions.map((position) => {
							const isSelected = basicPositionId === position.position_id;
							const count = positionCounts[position.position_id] || 0;
							return (
								<div
									key={position.position_id}
									onClick={() => handlePositionClick(position.position_id)}
									className={`px-4 py-2 text-base cursor-pointer hover:bg-gray-50 flex justify-between items-center ${
										isSelected ? "bg-blue-50 text-blue-700" : "text-gray-700"
									}`}>
									<span>{position.title}</span>
									<span
										className={`text-sm ml-2 px-2 py-1 rounded-full ${
											isSelected
												? "bg-blue-100 text-blue-600"
												: "bg-gray-100 text-gray-500"
										}`}>
										{count}
									</span>
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
