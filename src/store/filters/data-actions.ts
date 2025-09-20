export { useFilterStore } from "./filters-store";
export type { FilterState, FilterActions, FilterStore } from "./types";
import { RecruitmentResponse } from "@api/types";

export const createDataActions = (set: any, get: () => any) => ({
	// 필터 옵션 추출 (jobs 데이터에서 동적으로 생성)
	extractFilterOptions: (jobs: RecruitmentResponse[]) => {
		// 경력 옵션 추출
		const experienceSet = new Set<string>();
		experienceSet.add("전체");
		jobs.forEach((job) => {
			if (job.experience_years) {
				experienceSet.add(job.experience_years);
			}
		});

		// 위치 옵션 추출
		const locationSet = new Set<string>();
		locationSet.add("전체");
		jobs.forEach((job) => {
			if (job.company_address_depth1) {
				locationSet.add(job.company_address_depth1);
			}
		});

		set({
			experienceOptions: Array.from(experienceSet).sort(),
			locationOptions: Array.from(locationSet).sort(),
		});
	},
});
