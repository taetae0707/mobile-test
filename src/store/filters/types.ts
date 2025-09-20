import { RecruitmentResponse } from "@api/types";

export interface FilterState {
	// 동적 필터 옵션들 (jobs 데이터에서 추출)
	experienceOptions: string[];
	locationOptions: string[];

	// 선택된 필터들
	selectedPositions: string[];
	selectedCompanies: string[];
	selectedExperience: string[];
	selectedLocations: string[];
	selectedSkills: string[];

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

	// 필터 선택
	togglePosition: (position: string) => void;
	toggleCompany: (company: string) => void;
	toggleExperience: (experience: string) => void;
	toggleLocation: (location: string) => void;
	toggleSkill: (skill: string) => void;

	// 필터 초기화
	clearAllFilters: () => void;
	clearPositions: () => void;
	clearCompanies: () => void;
	clearExperience: () => void;
	clearLocations: () => void;
	clearSkills: () => void;

	// 필터 적용
	applyFilters: () => void;
}

export type FilterStore = FilterState & FilterActions;
