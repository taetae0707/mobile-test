// import { FilterStore } from "./types"; // 더 이상 필요하지 않음

export const createModalActions = (set: any, get: () => any) => ({
	// 모달 제어
	openModal: (type: string) => {
		set({ isModalOpen: true, activeModalType: type });
		// 데이터 로딩은 React Query 훅에서 자동으로 처리됨
	},

	closeModal: () => {
		set({ isModalOpen: false, activeModalType: null });
	},

	// 필터 적용
	applyFilters: () => {
		const state = get();

		console.log("필터 적용됨:", {
			positions: state.selectedPositions,
			companies: state.selectedCompanies,
			experience: state.selectedExperience,
			locations: state.selectedLocations,
			skills: state.selectedSkills,
		});

		setTimeout(() => {
			set({ isModalOpen: false, activeModalType: null });
		}, 0);
	},
});
