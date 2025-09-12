"use client";

import { useFilterStore } from "@store/filters";
import { FilterSection } from "./FilterSection";
import { PopularSkillsSection } from "./PopularSkillsSection";

interface FilterModalProps {
	onFiltersApplied?: () => void;
}

export function FilterModal({ onFiltersApplied }: FilterModalProps = {}) {
	const {
		isModalOpen,
		activeModalType,
		positions,
		companies,
		experienceOptions,
		locationOptions,
		popularSkills,
		selectedPositions,
		selectedCompanies,
		selectedExperience,
		selectedLocations,
		selectedSkills,
		loading,
		error,
		closeModal,
		togglePosition,
		toggleCompany,
		toggleExperience,
		toggleLocation,
		toggleSkill,
		clearAllFilters,
		applyFilters,
	} = useFilterStore();

	if (!isModalOpen) return null;

	// 데이터를 FilterSection에 맞는 형태로 변환
	const positionOptions = positions.map((position) => ({
		id: position.position_id,
		name: position.title,
	}));

	const companyOptions = companies.map((company) => ({
		id: company.public_id,
		name: company.name,
	}));

	const experienceOptionsList = experienceOptions.map((experience) => ({
		id: experience,
		name: experience,
	}));

	const locationOptionsList = locationOptions.map((location) => ({
		id: location,
		name: location,
	}));

	// popularSkills는 이미 PopularSkillData 형태이므로 그대로 사용

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			{/* 배경 오버레이 */}
			<div
				className="fixed inset-0 bg-black bg-opacity-50"
				onClick={closeModal}
			/>

			{/* 모달 컨텐츠 */}
			<div className="flex min-h-full items-center justify-center p-4">
				<div className="relative w-[40%] min-w-[400px] bg-white rounded-lg shadow-xl">
					{/* 헤더 */}
					<div className="flex items-center justify-between p-6 border-b border-gray-200">
						<h2 className="text-xl font-semibold text-gray-900">필터</h2>
						<button
							onClick={closeModal}
							className="text-gray-400 hover:text-gray-600 transition-colors">
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>

					{/* 본문 */}
					<div className="p-6 max-h-[576px] overflow-y-auto">
						{loading && (
							<div className="flex items-center justify-center py-8">
								<div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
								<span className="ml-2 text-gray-600">데이터 로딩중...</span>
							</div>
						)}

						{error && (
							<div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
								<p className="text-red-600 text-sm">{error}</p>
							</div>
						)}

						{!loading && !error && (
							<>
								<FilterSection
									title="직군선택"
									options={positionOptions}
									selectedItems={selectedPositions}
									onToggle={togglePosition}
								/>
								<FilterSection
									title="회사 선택"
									options={companyOptions}
									selectedItems={selectedCompanies}
									onToggle={toggleCompany}
								/>
								<FilterSection
									title="경력"
									options={experienceOptionsList}
									selectedItems={selectedExperience}
									onToggle={toggleExperience}
								/>
								<FilterSection
									title="위치"
									options={locationOptionsList}
									selectedItems={selectedLocations}
									onToggle={toggleLocation}
								/>
								<PopularSkillsSection
									title="인기스택"
									skills={popularSkills}
									selectedSkills={selectedSkills}
									onToggle={toggleSkill}
								/>
							</>
						)}
					</div>

					{/* 푸터 */}
					<div className="flex items-center justify-between p-6 border-t border-gray-200">
						<button
							onClick={clearAllFilters}
							className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
							초기화
						</button>
						<button
							onClick={() => {
								applyFilters();
								// 필터 적용 후 콜백 실행
								if (onFiltersApplied) {
									onFiltersApplied();
								}
							}}
							className="px-6 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors">
							{selectedPositions.length +
								selectedCompanies.length +
								selectedExperience.length +
								selectedLocations.length +
								selectedSkills.length}
							개의 필터 적용하기
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
