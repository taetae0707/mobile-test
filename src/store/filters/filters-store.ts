import { create } from "zustand";
import {
	PositionResponse,
	RecruitmentResponse,
	SkillResponse,
} from "@api/types";
import { CompanyParentResponse } from "@api/types";
import { PositionsApi } from "@api/positions";
import { CompaniesApi } from "@api/companies";
import { SkillsApi } from "@api/skills";
import {
	POPULAR_SKILLS_CONFIG,
	PopularSkillData,
	PopularSkillConfig,
} from "@constants/popularSkills";

export interface FilterState {
	// 원본 데이터
	jobs: RecruitmentResponse[];
	positions: PositionResponse[];
	companies: CompanyParentResponse[];
	skills: SkillResponse[];

	// 동적 필터 옵션들 (jobs 데이터에서 추출)
	experienceOptions: string[];
	locationOptions: string[];
	popularSkills: PopularSkillData[]; // 인기 스택 (설정된 스킬들)

	// 선택된 필터들
	selectedPositions: string[];
	selectedCompanies: string[];
	selectedExperience: string[];
	selectedLocations: string[];
	selectedSkills: string[]; // 선택된 스킬명들

	// UI 상태
	isModalOpen: boolean;
	activeModalType: string | null;
	loading: boolean;
	error: string | null;
}

interface FilterActions {
	// 데이터 설정
	setJobs: (jobs: RecruitmentResponse[]) => void;
	fetchPositions: () => Promise<void>;
	fetchCompanies: () => Promise<void>;
	fetchSkills: () => Promise<void>;

	// 필터 옵션 추출
	extractFilterOptions: () => void;

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

type FilterStore = FilterState & FilterActions;

export const useFilterStore = create<FilterStore>((set, get) => ({
	// 초기 상태
	jobs: [],
	positions: [],
	companies: [],
	skills: [],
	experienceOptions: [],
	locationOptions: [],
	popularSkills: [],
	selectedPositions: [],
	selectedCompanies: [],
	selectedExperience: [],
	selectedLocations: [],
	selectedSkills: [],
	isModalOpen: false,
	activeModalType: null,
	loading: false,
	error: null,

	// jobs 데이터 설정
	setJobs: (jobs: RecruitmentResponse[]) => {
		set({ jobs });
		// jobs 데이터가 설정되면 필터 옵션들을 추출
		get().extractFilterOptions();
	},

	// 필터 옵션 추출
	extractFilterOptions: () => {
		const { jobs } = get();

		// 경력 옵션 추출
		const experienceSet = new Set<string>();
		experienceSet.add("전체"); // 기본 옵션
		jobs.forEach((job) => {
			if (job.experience_years) {
				experienceSet.add(job.experience_years);
			}
		});

		// 위치 옵션 추출
		const locationSet = new Set<string>();
		locationSet.add("전체"); // 기본 옵션
		jobs.forEach((job) => {
			if (job.company_address_depth1) {
				locationSet.add(job.company_address_depth1);
			}
		});

		set({
			experienceOptions: Array.from(experienceSet).sort(),
			locationOptions: Array.from(locationSet).sort(),
		});
	},

	// 데이터 로딩 - usePositionsStore에서 데이터 가져오기 (중복 호출 방지)
	fetchPositions: async () => {
		set({ loading: true, error: null });
		try {
			// usePositionsStore에서 이미 로드된 데이터 가져오기
			const positionsStore = await import("@store/positions");
			const { positions: existingPositions, fetchPositions: fetchFromStore } =
				positionsStore.usePositionsStore.getState();

			if (existingPositions.length === 0) {
				// 데이터가 없으면 positions 스토어에서 가져오기
				await fetchFromStore();
				const { positions } = positionsStore.usePositionsStore.getState();
				set({ positions, loading: false });
			} else {
				// 이미 있는 데이터 사용
				set({ positions: existingPositions, loading: false });
			}
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : "포지션 데이터 로딩 실패",
				loading: false,
			});
		}
	},

	fetchCompanies: async () => {
		// 이미 로드된 데이터가 있으면 재사용
		const { companies } = get();
		if (companies.length > 0) {
			console.log("Companies 데이터 재사용 (중복 호출 방지)");
			return;
		}

		set({ loading: true, error: null });
		try {
			console.log("Companies API 최초 호출");
			const response = await CompaniesApi.getParentCompanies();
			set({ companies: response.data, loading: false });
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : "회사 데이터 로딩 실패",
				loading: false,
			});
		}
	},

	fetchSkills: async () => {
		// 이미 로드된 데이터가 있으면 재사용
		const { skills } = get();
		if (skills.length > 0) {
			console.log("Skills 데이터 재사용 (중복 호출 방지)");
			return;
		}

		set({ loading: true, error: null });
		try {
			console.log("Skills API 최초 호출");
			const skills = await SkillsApi.getSkills();

			// 인기 스택 설정에 따라 매칭되는 스킬 찾기
			const popularSkills: PopularSkillData[] = [];

			POPULAR_SKILLS_CONFIG.forEach((config: PopularSkillConfig) => {
				// 각 설정에 대해 API에서 매칭되는 스킬 찾기
				const matchedSkill = skills.find((skill) =>
					config.apiSearchTerms.some((term: string) =>
						skill.name.toLowerCase().includes(term.toLowerCase())
					)
				);

				if (matchedSkill) {
					popularSkills.push({
						displayName: config.displayName,
						skill_id: matchedSkill.skill_id,
						name: matchedSkill.name,
						designed_logo_url: matchedSkill.designed_logo_url,
					});
				}
			});

			console.log("매칭된 인기 스택:", popularSkills);
			set({ skills, popularSkills, loading: false });
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : "기술 스택 데이터 로딩 실패",
				loading: false,
			});
		}
	},

	// 모달 제어
	openModal: (type: string) => {
		set({ isModalOpen: true, activeModalType: type });

		// 필요한 데이터 로딩
		const {
			positions,
			companies,
			skills,
			fetchPositions,
			fetchCompanies,
			fetchSkills,
		} = get();

		// 모든 모달에서 회사 데이터가 필요할 수 있으므로 항상 로드
		if (companies.length === 0) {
			fetchCompanies();
		}

		// 포지션 데이터도 직군선택에서 필요
		if (
			(type === "all" ||
				type === "company" ||
				type === "experience" ||
				type === "location") &&
			positions.length === 0
		) {
			fetchPositions();
		}

		// 인기스택 섹션을 위해 스킬 데이터 로드
		if (skills.length === 0) {
			fetchSkills();
		}
	},

	closeModal: () => {
		set({ isModalOpen: false, activeModalType: null });
	},

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

	// 필터 적용
	applyFilters: () => {
		const state = get();

		// 필터 적용 로그
		console.log("필터 적용됨:", {
			positions: state.selectedPositions,
			companies: state.selectedCompanies,
			experience: state.selectedExperience,
			locations: state.selectedLocations,
			skills: state.selectedSkills,
		});

		// 모달 닫기 (약간의 지연을 두어 상태 변경이 먼저 감지되도록)
		setTimeout(() => {
			set({ isModalOpen: false, activeModalType: null });
		}, 0);
	},
}));
