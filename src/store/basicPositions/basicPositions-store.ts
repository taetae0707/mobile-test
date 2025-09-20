import { create } from "zustand";

interface PositionsState {
	selectedPositionIds: number[];
	setSelectedPositionIds: (positionIds: number[]) => void;
	clearSelectedPositionIds: () => void;
}

export const useBasicPositionsStore = create<PositionsState>((set) => ({
	// 초기 상태
	selectedPositionIds: [],

	// 선택된 포지션 ID 설정
	setSelectedPositionIds: (selectedPositionIds: number[]) => {
		set({ selectedPositionIds });
	},

	// 선택된 포지션 ID 초기화
	clearSelectedPositionIds: () => {
		set({ selectedPositionIds: [] });
	},
}));
