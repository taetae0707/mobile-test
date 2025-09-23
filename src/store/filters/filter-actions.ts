import { FilterStore } from "./types";

//사용자가 선택한 필터 값들을 스토어에 저장하는 규칙
export const createFilterActions = (set: any, get: () => FilterStore) => ({
	// 기본 필터 액션
	setBasicPositionId: (positionId: number) => {
		set({ basicPositionId: positionId });
	},

	togglePosition: (positionId: number, positionName?: string) => {
		const { selectedPositions } = get();
		const newSelected = selectedPositions.includes(positionId)
			? selectedPositions.filter((p) => p !== positionId)
			: [...selectedPositions, positionId];
		set({ selectedPositions: newSelected });
	},

	toggleCompany: (company: string) => {
		const { selectedCompanies } = get();
		const newSelected = selectedCompanies.includes(company)
			? selectedCompanies.filter((c) => c !== company)
			: [...selectedCompanies, company];
		set({ selectedCompanies: newSelected });
	},

	toggleExperience: (experience: string) => {
		const { selectedExperience } = get();
		const newSelected = selectedExperience.includes(experience)
			? selectedExperience.filter((e) => e !== experience)
			: [...selectedExperience, experience];
		set({ selectedExperience: newSelected });
	},

	toggleLocation: (location: string) => {
		const { selectedLocations } = get();
		const newSelected = selectedLocations.includes(location)
			? selectedLocations.filter((l) => l !== location)
			: [...selectedLocations, location];
		set({ selectedLocations: newSelected });
	},

	toggleSkill: (skillId: number) => {
		const { selectedSkills } = get();
		const newSelected = selectedSkills.includes(skillId)
			? selectedSkills.filter((s) => s !== skillId) //선택값이 기존 목록에 잇으면, 기존 목록에서 제거
			: [...selectedSkills, skillId]; //선택값이 기존 목록에 없으면, 새로운 선택값을 추가
		set({ selectedSkills: newSelected });
	},

	// 필터 초기화
	clearAllFilters: () => {
		set({
			basicPositionId: 1, // Web Frontend로 초기화
			selectedPositions: [],
			selectedCompanies: [],
			selectedExperience: [],
			selectedLocations: [],
			selectedSkills: [],
		});
	},

	clearPositions: () => set({ selectedPositions: [] }),
	clearCompanies: () => set({ selectedCompanies: [] }),
	clearExperience: () => set({ selectedExperience: [] }),
	clearLocations: () => set({ selectedLocations: [] }),
	clearSkills: () => set({ selectedSkills: [] }),

	// 전체 선택/해제 액션
	selectAllPositions: (positionIds: number[]) => {
		set({ selectedPositions: positionIds });
	},

	selectAllCompanies: (companyNames: string[]) => {
		set({ selectedCompanies: companyNames });
	},

	selectAllExperience: (experienceTypes: string[]) => {
		set({ selectedExperience: experienceTypes });
	},

	selectAllLocations: (locationNames: string[]) => {
		set({ selectedLocations: locationNames });
	},

	selectAllSkills: (skillIds: number[]) => {
		set({ selectedSkills: skillIds });
	},
});
