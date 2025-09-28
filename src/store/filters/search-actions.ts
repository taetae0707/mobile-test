import { FilterStore, SkillOption } from "./types";

// 검색 관련 액션들 (SOLID 원칙에 따라 검색 기능만 담당)
export const createSearchActions = (set: any, get: () => FilterStore) => ({
	// 실시간 검색 (skill_name으로 필터링)
	setSearchQuery: (query: string) => {
		const { allSkillsOptions } = get();

		if (!query.trim()) {
			set({
				searchQuery: query,
				filteredSearchSkills: [],
			});
			return;
		}

		// skill_name으로 필터링 (대소문자 구분 없음)
		const filtered = allSkillsOptions.filter((skill: SkillOption) =>
			skill.skill_name.toLowerCase().includes(query.toLowerCase())
		);

		set({
			searchQuery: query,
			filteredSearchSkills: filtered,
		});
	},

	// 검색 스킬 선택/해제 (skill_id 기반)
	toggleSearchSkill: (skillId: number) => {
		const { selectedSearchSkills } = get();
		const newSelected = selectedSearchSkills.includes(skillId)
			? selectedSearchSkills.filter((id: number) => id !== skillId)
			: [...selectedSearchSkills, skillId];

		set({ selectedSearchSkills: newSelected });
	},

	// 검색 관련 초기화
	clearSearchSkills: () => {
		set({
			selectedSearchSkills: [],
			searchQuery: "",
			filteredSearchSkills: [],
		});
	},
});
