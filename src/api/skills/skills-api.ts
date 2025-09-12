import customAxios from "../customAxios";
import { SkillResponse, SkillsApiResponse } from "../types/skill.types";

const PATH = "v1/capability/skills";

// 기술 스택 API 호출
export const SkillsApi = {
	// 기술 스택 목록 조회 - PositionsApi와 동일한 패턴으로 수정
	getSkills: async (): Promise<SkillResponse[]> => {
		try {
			console.log("Skills API 호출 시작:", PATH);
			const response = await customAxios.get<
				SkillResponse[],
				SkillsApiResponse
			>(PATH);
			console.log("Skills API 응답:", response);

			// PositionsApi와 동일하게 response.data 반환
			return response.data;
		} catch (error) {
			console.error("Skills API 에러:", error);
			throw new Error("기술 스택 목록을 불러오는데 실패했습니다.");
		}
	},
};
