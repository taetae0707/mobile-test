"use client";

import { useCompanyCategories } from "@hooks/jobsPage/useCompanyCategories";
import { useBasicJobsFilters } from "@hooks/jobsPage/useBasicJobsFilters";
import { CompanyNavList } from "@components/jobsPage/CompanyNav/CompanyNavList";
import { JobList } from "@components/jobsPage/jobList";
import {
	BasicFilter,
	FilterButtonsRow,
	FilterModal,
} from "@components/jobsPage/filterButtons";
import { usePositionsStore } from "@store/positions";
import { useFilterStore } from "@store/filters";
import { RecruitmentResponse } from "@api/types/job.types";
import { CompanyParentResponse } from "@api/types/company.types";
import { useEffect } from "react";

export default function JobsPage() {
	const {
		companies,
		loading: companiesLoading,
		error: companiesError,
		selectedCompany,
		handleCompanySelect,
	} = useCompanyCategories();

	const {
		allJobs,
		filteredJobs,
		loading: jobsLoading,
		error: jobsError,
		filters,
		updateFilters,
		clearFilters,
		refetch,
	} = useBasicJobsFilters();

	const { selectedPositions } = usePositionsStore();
	const {
		setJobs,
		selectedPositions: modalSelectedPositions,
		selectedCompanies,
		selectedExperience,
		selectedLocations,
		selectedSkills,
		popularSkills,
	} = useFilterStore();

	// zustand 스토어의 선택된 포지션을 필터에 동기화
	useEffect(() => {
		updateFilters({ position_titles: selectedPositions });
	}, [selectedPositions, updateFilters]);

	// jobs 데이터가 로드되면 필터 스토어에 전달
	useEffect(() => {
		if (allJobs.length > 0) {
			setJobs(allJobs);
		}
	}, [allJobs, setJobs]);

	// 모달 필터가 적용되면 실제 필터에 반영
	useEffect(() => {
		const modalFilters: any = {};

		// 모달에서 선택된 포지션들을 position_titles에 적용
		if (modalSelectedPositions.length > 0) {
			modalFilters.position_titles = modalSelectedPositions;
		}

		// 회사 필터 적용
		if (selectedCompanies.length > 0) {
			modalFilters.company_names = selectedCompanies;
		}

		// 경력 필터 적용
		if (selectedExperience.length > 0 && !selectedExperience.includes("전체")) {
			modalFilters.experience_years = selectedExperience;
		}

		// 위치 필터 적용
		if (selectedLocations.length > 0 && !selectedLocations.includes("전체")) {
			modalFilters.locations = selectedLocations;
		}

		// 스킬 필터 적용 - 스킬명을 스킬ID로 변환
		if (selectedSkills.length > 0) {
			const skillIds = selectedSkills
				.map((skillName) => {
					const skill = popularSkills.find((s) => s.displayName === skillName);
					return skill ? skill.skill_id : null;
				})
				.filter((id) => id !== null) as number[];

			if (skillIds.length > 0) {
				modalFilters.skill_ids = skillIds;
			}
		}

		// 모든 필터가 비어있는 경우 명시적으로 빈 객체로 설정하여 필터 초기화
		const hasAnyFilter =
			modalSelectedPositions.length > 0 ||
			selectedCompanies.length > 0 ||
			(selectedExperience.length > 0 && !selectedExperience.includes("전체")) ||
			(selectedLocations.length > 0 && !selectedLocations.includes("전체")) ||
			selectedSkills.length > 0;

		if (!hasAnyFilter) {
			// 모든 필터가 비어있으면 명시적으로 빈 필터 적용
			updateFilters({});
		} else {
			// 필터가 있으면 해당 필터 적용
			updateFilters(modalFilters);
		}
	}, [
		modalSelectedPositions,
		selectedCompanies,
		selectedExperience,
		selectedLocations,
		selectedSkills,
		popularSkills,
		updateFilters,
	]);

	const handleRefresh = () => {
		refetch();
	};

	const handleClearFilters = () => {
		clearFilters();
	};

	const handleResetAllFilters = () => {
		// 기존 필터 초기화
		clearFilters();
		// 모달 필터 스토어 초기화
		const { clearAllFilters } = useFilterStore.getState();
		clearAllFilters();
		// 포지션 스토어 초기화 후 Web Frontend로 재설정
		const { clearSelectedPositions, initializeWithWebFrontend } =
			usePositionsStore.getState();
		clearSelectedPositions();
		initializeWithWebFrontend();
	};

	const handleJobClick = (job: RecruitmentResponse) => {
		console.log("선택된 채용공고:", job.title);
	};

	const renderErrorState = () => (
		<div className="text-center py-8">
			<div
				className="text-red-500 bg-red-50 border border-red-200 rounded-lg p-4"
				role="alert"
				aria-live="polite">
				{companiesError}
			</div>
		</div>
	);

	const renderCompanyNav = () => {
		if (companiesError) {
			return renderErrorState();
		}

		return (
			<CompanyNavList
				companies={companies}
				selectedCompany={selectedCompany}
				onCompanySelect={handleCompanySelect}
				loading={companiesLoading}
			/>
		);
	};

	return (
		<main className="max-w-7xl mx-auto px-4 pb-16">
			<section className="bg-white rounded-lg shadow-sm p-6 mb-8">
				{renderCompanyNav()}
			</section>

			<section className="bg-white rounded-lg shadow-sm p-6">
				<div className="mb-6">
					<p className="text-gray-600">
						"네카쿠배라당토 기업들의 최신 채용공고를 확인해보세요."
					</p>
				</div>

				{/* 기본 필터 UI */}
				<div className="py-6 space-y-6">
					<BasicFilter />
					<FilterButtonsRow
						totalJobsCount={filteredJobs.length}
						onResetFilters={handleResetAllFilters}
					/>
				</div>

				<JobList
					jobs={filteredJobs}
					loading={jobsLoading}
					error={jobsError}
					onJobClick={handleJobClick}
				/>
			</section>

			{/* 필터 모달 */}
			<FilterModal
				onFiltersApplied={() => {
					// 필터 적용 후 강제로 useEffect 트리거
					console.log("필터가 적용되었습니다.");
				}}
			/>
		</main>
	);
}
