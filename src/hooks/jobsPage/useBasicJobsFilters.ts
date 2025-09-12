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
	const didSetDefaultSkill = useRef(false);
	useEffect(() => {
		if (didSetDefaultSkill.current) return; // 이미 실행했으면 패스
		if (allJobs.length === 0) return; // 데이터 없으면 패스

		const frontSkillId = findFrontendSkillId(allJobs);
		const hasNoActiveFilter =
			(!filters.skill_ids || filters.skill_ids.length === 0) &&
			(!filters.position_titles || filters.position_titles.length === 0) &&
			(!filters.experience_years || filters.experience_years.length === 0);

		if (frontSkillId !== null && hasNoActiveFilter) {
			setFilters((prev) => ({ ...prev, skill_ids: [frontSkillId] }));
			didSetDefaultSkill.current = true;
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
		didSetDefaultSkill.current = false;
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
