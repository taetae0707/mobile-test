import { create } from "zustand";
import { FilterStore } from "./types";
import { createDataActions } from "./filter-extract";
import { createModalActions } from "./modal-actions";
import { createFilterActions } from "./filter-actions";
import { createComputedActions } from "./computed-actions";

export const useFilterStore = create<FilterStore>((set, get) => ({
	basicPositionId: 1, // 기본값: Web Frontend
	experienceOptions: [],
	locationOptions: [],
	popularSkillsOptions: [],
	selectedPositions: [],
	selectedCompanies: [],
	selectedExperience: [],
	selectedLocations: [],
	selectedSkills: [],
	isModalOpen: false,
	activeModalType: null,

	// 액션들을 각각의 모듈에서 가져와서 합치기
	...createDataActions(set, get),
	...createModalActions(set, get),
	...createFilterActions(set, get),
	...createComputedActions(get),
}));

// 타입과 함께 export
export type { FilterState, FilterActions, FilterStore } from "./types";
