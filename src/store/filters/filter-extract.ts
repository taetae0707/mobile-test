export { useFilterStore } from "./filters-store";
export type { FilterState, FilterActions, FilterStore } from "./types";
import { RecruitmentResponse } from "@api/types";
import { POPULAR_SKILL_NAMES } from "@constants/popularSkillNames";

//RecruitmentResponse 데이터에서 필터 옵션을 추출하는 규칙
//경력, 회사 위치, 인기스킬 옵션을 추출한다.
//jobs 데이터에서 동적으로 생성
export const createDataActions = (set: any, get: () => any) => ({
	extractFilterOptions: (jobs: RecruitmentResponse[]) => {
		// 경력 옵션 추출
		const experienceSet = new Set<string>();
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

		// 인기스킬 내용물 추출
		const popularSkillsMap = new Map<
			number,
			{ skill_id: number; skill_name: string; logo_url: string }
		>();
		jobs.forEach((job) => {
			// job.skills이 배열이 맞는지를 확인
			if (job.skills && Array.isArray(job.skills)) {
				job.skills.forEach((skill) => {
					// 인기스킬 목록에 포함된 스킬만 추가
					if (POPULAR_SKILL_NAMES.includes(skill.skill_name as any)) {
						popularSkillsMap.set(skill.skill_id, {
							skill_id: skill.skill_id,
							skill_name: skill.skill_name,
							logo_url: skill.skill_logo,
						});
					}
				});
			}
		});

		set({
			experienceOptions: Array.from(experienceSet).sort(),
			locationOptions: Array.from(locationSet).sort(),
			popularSkillsOptions: Array.from(popularSkillsMap.values()),
		});
	},
});
