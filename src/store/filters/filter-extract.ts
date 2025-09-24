export { useFilterStore } from "./filters-store";
export type { FilterState, FilterActions, FilterStore } from "./types";
import { RecruitmentResponse } from "@api/types";

//RecruitmentResponse 데이터에서 필터 옵션을 추출하는 규칙
//경력, 회사 위치 옵션을 추출한다.
//jobs 데이터에서 동적으로 생성
export const createDataActions = (set: any, get: () => any) => ({
	extractFilterOptions: (jobs: RecruitmentResponse[]) => {
		// 경력 옵션 추출
		const experienceSet = new Set<string>();
		// experienceSet.add("경력무관");
		jobs.forEach((job) => {
			if (job.experience_years) {
				experienceSet.add(job.experience_years);
			}
		});

		// 위치 옵션 추출
		const locationSet = new Set<string>();
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
