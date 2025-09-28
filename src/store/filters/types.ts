import { RecruitmentResponse } from "@api/types";

// 공통 스킬 옵션 인터페이스
export interface SkillOption {
	skill_id: number;
	skill_name: string;
	logo_url: string;
}

export interface FilterState {
	// 동적 필터 옵션들 (jobs 데이터에서 추출)
	experienceOptions: string[];
	locationOptions: string[];
	popularSkillsOptions: SkillOption[];

	// 전체 스킬 관련 (검색용)
	allSkillsOptions: SkillOption[];
	searchQuery: string;
	filteredSearchSkills: SkillOption[];
	selectedSearchSkills: number[];

	// 기본 필터 상태 (BasicFilter에서 사용)
	basicPositionId: number; // 기본값: 1 (Web Frontend)

	// 선택된 필터들 (모달에서 사용)
	selectedPositions: number[];
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
	extractAllSkills: (skills: any[]) => void;

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

	// 검색 관련 액션
	setSearchQuery: (query: string) => void;
	toggleSearchSkill: (skillId: number) => void;
	clearSearchSkills: () => void;

	// 필터 초기화
	clearAllFilters: () => void;
	clearPositions: () => void;
	clearCompanies: () => void;
	clearExperience: () => void;
	clearLocations: () => void;
	clearSkills: () => void;

	// 전체 선택/해제
	selectAllPositions: (positionIds: number[]) => void;
	selectAllCompanies: (companyNames: string[]) => void;
	selectAllExperience: (experienceTypes: string[]) => void;
	selectAllLocations: (locationNames: string[]) => void;
	selectAllSkills: (skillIds: number[]) => void;

	// 필터 적용
	applyFilters: () => void;

	// 계산된 값 제공
	getAppliedFilters: () => any;
	getPositionDisplayText: (positions: any[]) => string;
	getFilterDisplayText: (filterType: string) => string;
}

export type FilterStore = FilterState & FilterActions;
