import { useMemo, useRef } from "react";
import { RecruitmentResponse, RecruitmentFilters } from "@api/types/job.types";
import { useFilterStore } from "@store/filters";
import { POSITION_IDS } from "@types";

interface UseDetailJobsFiltersProps {
	allJobs: RecruitmentResponse[];
	filters: RecruitmentFilters;
}

interface UseDetailJobsFiltersReturn {
	filteredJobs: RecruitmentResponse[];
}

// 제네릭으로 number와 string 모두 지원
function useSetFromArray<T extends string | number>(arr?: T[]): Set<T> | null {
	const ref = useRef<{ key: string; set: Set<T> | null }>({
		key: "",
		set: null,
	});
	const key = arr && arr.length ? [...arr].sort().join(",") : "";

	//캐시 갱신 조건
	if (ref.current.key !== key) {
		ref.current = { key, set: key ? new Set(arr!) : null };
	}

	return ref.current.set;
}

/**
 * 상세한 필터링 로직을 담당하는 훅
 * position_id 기반으로 필터링하여 성능과 안정성을 보장합니다.
 */
export function useDetailJobsFilters({
	allJobs,
	filters,
}: UseDetailJobsFiltersProps): UseDetailJobsFiltersReturn {
	// Set으로 변환하여 O(1) 조회 성능 확보
	const positionIdSet = useSetFromArray(filters.position_ids);
	const experienceYearsSet = useSetFromArray(filters.experience_years);
	const companyNamesSet = useSetFromArray((filters as any).company_names);
	const locationsSet = useSetFromArray((filters as any).locations);

	const filteredJobs = useMemo(() => {
		return allJobs.filter((job) => {
			// 포지션 필터 (position_id 기반)
			if (positionIdSet && !positionIdSet.has(job.position_id)) {
				return false;
			}

			// 경력 필터
			if (
				experienceYearsSet &&
				!experienceYearsSet.has(job.experience_years as any)
			) {
				return false;
			}

			// 회사 필터
			if (companyNamesSet && !companyNamesSet.has(job.parent_company_name)) {
				return false;
			}

			// 위치 필터
			if (locationsSet && !locationsSet.has(job.company_address_depth1)) {
				return false;
			}

			return true;
		});
	}, [
		allJobs,
		positionIdSet,
		experienceYearsSet,
		companyNamesSet,
		locationsSet,
	]);

	return {
		filteredJobs,
	};
}
