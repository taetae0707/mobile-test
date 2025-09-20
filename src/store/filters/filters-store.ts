import { create } from "zustand";
import { FilterStore } from "./types";
import { createDataActions } from "./data-actions";
import { createModalActions } from "./modal-actions";
import { createFilterActions } from "./filter-actions";

export const useFilterStore = create<FilterStore>((set, get) => ({
	// 초기 상태
	experienceOptions: [],
	locationOptions: [],
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
}));

// 타입과 함께 export
export type { FilterState, FilterActions, FilterStore } from "./types";
