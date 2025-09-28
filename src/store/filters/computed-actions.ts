import { FilterStore } from "./types";
import { RecruitmentFilters } from "@api/types/job.types";
import { PositionResponse } from "@api/types";

//'무엇을' 필터링할지 규칙 정의
export const createComputedActions = (get: () => FilterStore) => ({
	//필터 조건을 정의한 규칙 = 서버에 보낼 API 요청문
	//스토어의 원본 데이터를 아래와 같은 규칙에 따라 정리
	getAppliedFilters: (): RecruitmentFilters => {
		const state = get(); //사용자의 필터 선택 값들이 저장된 스토어의 현재 상태 or 초기값
		const filters: RecruitmentFilters = {};

		filters.position_ids = [
			state.basicPositionId, //기본 필터값(프엔)
			...state.selectedPositions.filter((id) => id !== state.basicPositionId),
			//기본 필터값 제외한 나머지 포지션 필터값
		];

		// 회사 필터
		if (state.selectedCompanies.length > 0) {
			filters.company_names = state.selectedCompanies;
			//필터 객체에 company_names 속성을 추가하고 선택된 회사 목록을 넣겠다
			//사용자가 필터 모달에서 회사를 선택할 때 toggleCompany 함수를 통해 스토어에 저장
			//데이터 흐름: 사용자 선택 → 스토어 저장 → 필터 변환 → 채용공고 필터링
		}

		// 경력 필터
		if (
			state.selectedExperience.length > 0 &&
			!state.selectedExperience.includes("전체")
		) {
			filters.experience_years = state.selectedExperience;
		}

		// 위치 필터
		if (
			state.selectedLocations.length > 0 &&
			!state.selectedLocations.includes("전체")
		) {
			filters.locations = state.selectedLocations;
		}

		// 스킬 필터 - 인기스택 + 검색스택 통합하여 skill_names로 변환
		const allSelectedSkillIds = [
			...state.selectedSkills, // 인기스택 IDs
			...state.selectedSearchSkills, // 검색스택 IDs
		];

		if (allSelectedSkillIds.length > 0) {
			console.log("- 통합 selectedSkills:", allSelectedSkillIds);
			console.log("- popularSkillsOptions:", state.popularSkillsOptions);
			console.log("- allSkillsOptions:", state.allSkillsOptions);

			// 모든 스킬 옵션에서 skill_name 찾기
			const allSkillOptions = [
				...state.popularSkillsOptions, // 인기스택 옵션들
				...state.allSkillsOptions, // 전체스택 옵션들
			];

			const skillNames = allSelectedSkillIds
				.map((skillId) => {
					const skill = allSkillOptions.find((s) => s.skill_id === skillId);
					console.log(`- skillId ${skillId} → skill:`, skill);
					return skill ? skill.skill_name : null;
				})
				.filter(Boolean) as string[];

			console.log("- 최종 skill_names:", skillNames);

			if (skillNames.length > 0) {
				filters.skill_names = skillNames;
			}
		}

		return filters;
	},

	// 포지션 표시 텍스트 계산 (BasicFilter 컴포넌트에서 사용)
	getPositionDisplayText: (positions: PositionResponse[]): string => {
		const { basicPositionId, selectedPositions } = get();

		// 기본 포지션 텍스트 (항상 있음)
		const selectedPosition = positions.find(
			(p) => p.position_id === basicPositionId
		);
		const basicText = selectedPosition
			? selectedPosition.title
			: "Web Frontend";

		// 기본 포지션과 다른 추가 선택된 포지션만 필터링
		// 이제 selectedPositions는 ID 배열이므로 basicPositionId와 비교
		const additionalPositions = selectedPositions.filter(
			(positionId) => positionId !== basicPositionId
		);

		// 기본 포지션과 다른 추가 포지션이 있으면 "외 N개" 표시
		if (additionalPositions.length > 0) {
			return `${basicText} 외 ${additionalPositions.length}개`;
		}

		return basicText;
	},

	// FilterButtonsRow 필터 타입별 텍스트 생성: FilterButtonsRow에서 id값 받아옴
	getFilterDisplayText: (filterType: string): string => {
		const state = get(); //createFilterActions에서 가져옴 ex.toggleCompany

		switch (filterType) {
			case "company":
				if (state.selectedCompanies.length === 0) {
					return "회사별";
				} else if (state.selectedCompanies.length === 1) {
					return state.selectedCompanies[0];
				} else {
					return `${state.selectedCompanies[0]} 외 ${state.selectedCompanies.length - 1}개`;
				}

			case "experience":
				if (state.selectedExperience.length === 0) {
					return "경력 요건";
				} else if (state.selectedExperience.length === 1) {
					return state.selectedExperience[0];
				} else {
					return `${state.selectedExperience[0]} 외 ${state.selectedExperience.length - 1}개`;
				}

			case "skills":
				const totalSelected =
					state.selectedSkills.length + state.selectedSearchSkills.length;

				if (totalSelected === 0) {
					return "기술 스택";
				} else if (totalSelected === 1) {
					// 첫 번째 선택된 스킬 찾기 (인기스택 우선)
					const firstSkillId =
						state.selectedSkills.length > 0
							? state.selectedSkills[0]
							: state.selectedSearchSkills[0];

					const allSkillOptions = [
						...state.popularSkillsOptions,
						...state.allSkillsOptions,
					];
					const skill = allSkillOptions.find(
						(s) => s.skill_id === firstSkillId
					);
					console.log("- 첫 번째 스킬 찾기:", skill);
					const result = skill ? skill.skill_name : "기술 스택";
					console.log("- 결과:", result);
					return result;
				} else {
					// 복수 선택 시
					const firstSkillId =
						state.selectedSkills.length > 0
							? state.selectedSkills[0]
							: state.selectedSearchSkills[0];

					const allSkillOptions = [
						...state.popularSkillsOptions,
						...state.allSkillsOptions,
					];
					const skill = allSkillOptions.find(
						(s) => s.skill_id === firstSkillId
					);
					console.log("- 첫 번째 스킬 찾기:", skill);
					const firstName = skill ? skill.skill_name : "기술 스택";
					const result = `${firstName} 외 ${totalSelected - 1}개`;
					console.log("- 결과:", result);
					return result;
				}

			case "location":
				if (state.selectedLocations.length === 0) {
					return "위치";
				} else if (state.selectedLocations.length === 1) {
					return state.selectedLocations[0];
				} else {
					return `${state.selectedLocations[0]} 외 ${state.selectedLocations.length - 1}개`;
				}

			case "all":
				return "전체필터";

			default:
				return "";
		}
	},
});
