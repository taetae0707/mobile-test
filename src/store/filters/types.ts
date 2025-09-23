import { RecruitmentResponse } from "@api/types";

export interface FilterState {
	// 동적 필터 옵션들 (jobs 데이터에서 추출)
	experienceOptions: string[];
	locationOptions: string[];

	// 기본 필터 상태 (BasicFilter에서 사용)
	basicPositionId: number; // 기본값: 1 (Web Frontend)

	// 선택된 필터들 (모달에서 사용)
	selectedPositions: number[]; // 포지션은 ID로 저장
	selectedCompanies: string[];
	selectedExperience: string[];
	selectedLocations: string[];
	selectedSkills: number[];

	// UI 상태
	isModalOpen: boolean;
	activeModalType: string | null;
}

export interface FilterActions {
	// 필터 옵션 추출
	extractFilterOptions: (jobs: RecruitmentResponse[]) => void;

	// 모달 제어
	openModal: (type: string) => void;
	closeModal: () => void;

	// 기본 필터 액션
	setBasicPositionId: (positionId: number) => void;

	// 모달 필터 선택
	togglePosition: (positionId: number, positionName?: string) => void;
	toggleCompany: (company: string) => void;
	toggleExperience: (experience: string) => void;
	toggleLocation: (location: string) => void;
	toggleSkill: (skillId: number) => void;

	// 필터 초기화
	clearAllFilters: () => void;
	clearPositions: () => void;
	clearCompanies: () => void;
	clearExperience: () => void;
	clearLocations: () => void;
	clearSkills: () => void;

	// 필터 적용
	applyFilters: () => void;

	// 계산된 값 제공
	getAppliedFilters: () => any;
	getPositionDisplayText: (positions: any[]) => string;
}

export type FilterStore = FilterState & FilterActions;
