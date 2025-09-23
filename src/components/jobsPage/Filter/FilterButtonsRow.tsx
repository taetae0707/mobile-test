"use client";

import { useFilterStore } from "@store/filters";

interface FilterButtonsRowProps {
	totalJobsCount: number;
	onResetFilters: () => void;
}

export function FilterButtonsRow({
	totalJobsCount,
	onResetFilters,
}: FilterButtonsRowProps) {
	const { openModal } = useFilterStore();

	const filterButtons = [
		{ id: "all", label: "전체필터", hasDropdown: false },
		{ id: "company", label: "회사별", hasDropdown: true },
		{ id: "experience", label: "경력 요건", hasDropdown: true },
		{ id: "skills", label: "기술 스택", hasDropdown: true },
		{ id: "location", label: "위치", hasDropdown: true },
	];

	const handleFilterClick = (filterId: string) => {
		// 모달 열기
		openModal(filterId);
	};

	const handleResetClick = () => {
		onResetFilters();
		console.log("필터 초기화됨");
	};

	return (
		<div className="space-y-4">
			{/* 필터 버튼들 */}
			<div className="flex items-center gap-2 flex-wrap">
				{filterButtons.map((button) => (
					<button
						key={button.id}
						onClick={() => handleFilterClick(button.id)}
						className="flex items-center px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
						<span className="text-gray-700">{button.label}</span>
						{button.hasDropdown && (
							<svg
								className="ml-1 h-4 w-4 text-gray-500"
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
						)}
					</button>
				))}

				{/* 초기화 버튼 */}
				<button
					onClick={handleResetClick}
					className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
					title="필터 초기화">
					<svg
						className="w-5 h-5 text-gray-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
