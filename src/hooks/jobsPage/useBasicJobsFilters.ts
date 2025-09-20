import { useState, useEffect, useRef, useCallback } from "react";
import { RecruitmentResponse, RecruitmentFilters } from "@api/types/job.types";
import { useJobs, findFrontendSkillId } from "@hooks/jobsPage";
import { useDetailJobsFilters } from "./useDetailJobsFilters";

interface UseBasicJobsWithFiltersReturn {
	allJobs: RecruitmentResponse[];
	filteredJobs: RecruitmentResponse[];
	loading: boolean;
	error: string | null;
	filters: RecruitmentFilters;
	updateFilters: (newFilters: Partial<RecruitmentFilters>) => void;
	clearFilters: () => void;
	refetch: () => void;
}

export function useBasicJobsFilters(): UseBasicJobsWithFiltersReturn {
	const [filters, setFilters] = useState<RecruitmentFilters>({});

	const { jobs: allJobs, loading, error, refetch } = useJobs();

	//기본필터 = 프론트엔드
	const didSetDefaultPosition = useRef(false);
	useEffect(() => {
		if (didSetDefaultPosition.current) return; // 이미 실행했으면 패스
		if (allJobs.length === 0) return; // 데이터 없으면 패스

		const hasNoActiveFilter =
			(!filters.position_ids || filters.position_ids.length === 0) &&
			(!filters.position_titles || filters.position_titles.length === 0) &&
			(!filters.experience_years || filters.experience_years.length === 0);

		if (hasNoActiveFilter) {
			// Web Frontend 포지션 ID로 기본 필터 설정
			setFilters((prev) => ({ ...prev, position_ids: [1] })); // POSITION_IDS.WEB_FRONTEND = 1
			didSetDefaultPosition.current = true;
		}
	}, [allJobs]);

	const { filteredJobs } = useDetailJobsFilters({
		allJobs,
		filters,
	});

	const updateFilters = useCallback(
		(newFilters: Partial<RecruitmentFilters>) => {
			setFilters((prev) => ({ ...prev, ...newFilters }));
		},
		[]
	);

	const clearFilters = useCallback(() => {
		setFilters({});
		// 기본값 다시 적용 가능하도록 플래그 리셋
		didSetDefaultPosition.current = false;
	}, []);

	return {
		allJobs,
		filteredJobs,
		loading,
		error,
		filters,
		updateFilters,
		clearFilters,
		refetch,
	};
}
