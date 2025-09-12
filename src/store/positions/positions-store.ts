import { create } from "zustand";
import { PositionResponse } from "@api/types";
import { PositionsApi } from "@api/positions";

interface PositionsState {
	// 상태
	positions: PositionResponse[];
	selectedPositions: string[];
	loading: boolean;
	error: string | null;

	// 액션
	fetchPositions: () => Promise<void>;
	setSelectedPositions: (positions: string[]) => void;
	clearSelectedPositions: () => void;
	initializeWithWebFrontend: () => Promise<void>;
}

export const usePositionsStore = create<PositionsState>((set, get) => ({
	// 초기 상태
	positions: [],
	selectedPositions: [],
	loading: false,
	error: null,

	// 포지션 목록 가져오기
	fetchPositions: async () => {
		set({ loading: true, error: null });
		try {
			const positions = await PositionsApi.getPositions();
			set({ positions, loading: false });
		} catch (error) {
			set({
				error:
					error instanceof Error
						? error.message
						: "포지션 데이터를 불러오는데 실패했습니다.",
				loading: false,
			});
		}
	},

	// 선택된 포지션 설정
	setSelectedPositions: (selectedPositions: string[]) => {
		set({ selectedPositions });
	},

	// 선택된 포지션 초기화
	clearSelectedPositions: () => {
		set({ selectedPositions: [] });
	},

	// Web Frontend 기본값으로 초기화
	initializeWithWebFrontend: async () => {
		const { positions, fetchPositions } = get();

		// 포지션 데이터가 없으면 먼저 가져오기
		if (positions.length === 0) {
			await fetchPositions();
		}

		const currentPositions = get().positions;
		// Web Frontend 포지션 찾기
		const webFrontendPosition = currentPositions.find(
			(position) =>
				position.title.toLowerCase().includes("web frontend") ||
				position.title.toLowerCase().includes("웹 프론트엔드") ||
				position.title.toLowerCase().includes("프론트엔드")
		);

		if (webFrontendPosition) {
			set({ selectedPositions: [webFrontendPosition.title] });
		} else {
			// Web Frontend가 없으면 프론트엔드 관련 포지션들 선택
			const frontendPositions = currentPositions
				.filter(
					(position) =>
						position.title.toLowerCase().includes("frontend") ||
						position.title.toLowerCase().includes("프론트엔드")
				)
				.map((position) => position.title);

			set({ selectedPositions: frontendPositions });
		}
	},
}));
