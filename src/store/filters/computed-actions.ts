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

		// 스킬 필터
		if (state.selectedSkills.length > 0) {
			filters.skill_ids = state.selectedSkills;
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
});
