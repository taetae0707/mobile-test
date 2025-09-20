import { FilterStore } from "./types";

export const createFilterActions = (set: any, get: () => FilterStore) => ({
    // 필터 토글
    togglePosition: (position: string) => {
        const { selectedPositions } = get();
        const newSelected = selectedPositions.includes(position)
            ? selectedPositions.filter((p) => p !== position)
            : [...selectedPositions, position];
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

    toggleSkill: (skill: string) => {
        const { selectedSkills } = get();
        const newSelected = selectedSkills.includes(skill)
            ? selectedSkills.filter((s) => s !== skill)
            : [...selectedSkills, skill];
        set({ selectedSkills: newSelected });
    },

    // 필터 초기화
    clearAllFilters: () => {
        set({
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
});