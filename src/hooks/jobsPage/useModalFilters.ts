import { useMemo, useCallback } from "react";
import { RecruitmentResponse, RecruitmentFilters } from "@api/types/job.types";
import { useRecruitmentQuery } from "@queries/useRecruitmentQuery";
import { useFilterStore } from "@store/filters";

interface UseBasicJobsWithFiltersReturn {
	allJobs: RecruitmentResponse[];
	filteredJobs: RecruitmentResponse[];
	loading: boolean;
	error: string | null;
	filters: RecruitmentFilters;
	clearFilters: () => void;
	refetch: () => void;
}

//createComputedActions에서 정의한 규칙을 사용해서 데이터를 '실제로' 필터링
export function useModalFilters(): UseBasicJobsWithFiltersReturn {
	// 1. 쿼리에서 데이터 가져오기
	const {
		data: allJobs = [],
		isLoading: loading,
		error,
		refetch,
		isError,
	} = useRecruitmentQuery();

	// 2. 통합 스토어에서 선택된 필터값 가져오기
	const { getAppliedFilters, clearAllFilters } = useFilterStore();
	const filters = getAppliedFilters();

	// 3. 에러 메시지 변환
	const errorMessage =
		isError && error
			? error instanceof Error
				? error.message
				: "채용공고를 불러오는데 실패했습니다."
			: null;

	// 4. 필터링 로직
	const filteredJobs = useMemo(() => {
		return allJobs.filter((job) => {
			//포지션 필터 (기본 필터 + 모달 선택 포지션)
			//채용공고의 position title과 필터의 position id를 비교
			if (filters.position_ids || filters.position_titles) {
				const matchesBasicFilter = filters.position_ids?.includes(
					job.position_id
				);
				const matchesModalFilter = filters.position_titles?.includes(
					job.position_title
				);

				// 두 필터 중 하나라도 만족하지 않으면 제외
				if (!(matchesBasicFilter || matchesModalFilter)) {
					return false;
				}
			}

			// 경력 필터
			if (
				filters.experience_years &&
				!filters.experience_years.includes(job.experience_years as any)
			) {
				return false;
			}

			// 회사 필터
			if (
				filters.company_names &&
				!filters.company_names.includes(job.parent_company_name)
			) {
				return false;
			}

			// 위치 필터
			if (
				filters.locations &&
				!filters.locations.includes(job.company_address_depth1)
			) {
				return false;
			}

			// 스킬 필터 - 스킬명으로 검색
			if (filters.skill_names && filters.skill_names.length > 0) {
				const jobSkills = (job as any).skill_names || [];
				const hasMatchingSkill = filters.skill_names.some((skillName: string) =>
					jobSkills.includes(skillName)
				);
				if (!hasMatchingSkill) {
					return false;
				}
			}

			return true;
		});
	}, [allJobs, filters]);

	// 5. 필터 초기화 함수
	const clearFilters = useCallback(() => {
		clearAllFilters(); // 통합된 초기화 함수 사용 (Web Frontend로 초기화됨)
	}, [clearAllFilters]);

	return {
		allJobs,
		filteredJobs,
		loading,
		error: errorMessage,
		filters, // 현재 적용된 필터 (스토어에서 계산)
		clearFilters,
		refetch,
	};
}
