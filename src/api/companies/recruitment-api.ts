import customAxios from "../customAxios";
import { RecruitmentResponse, RecruitmentFilters } from "@api/types/job.types";

const PATH = "v1/companies-recruitments";

// 채용공고 API 호출
export const RecruitmentApi = {
	// 채용공고 목록 조회 (필터 옵션 포함)
	getRecruitments: async (
		filters?: RecruitmentFilters
	): Promise<RecruitmentResponse[]> => {
		try {
			// const params = new URLSearchParams();

			// // 스킬 ID 필터 적용
			// if (filters?.skill_ids && filters.skill_ids.length > 0) {
			// 	filters.skill_ids.forEach((id) => {
			// 		params.append("skill_ids", id.toString());
			// 	});
			// }

			// // 경력 필터 적용
			// if (filters?.experience_years && filters.experience_years.length > 0) {
			// 	filters.experience_years.forEach((experience) => {
			// 		params.append("experience_years", experience);
			// 	});
			// }

			// const queryString = params.toString();
			// const url = queryString ? `${PATH}?${queryString}` : PATH;

			// 첫 번째 제네릭은 data의 타입, 두 번째 제네릭은 응답 래퍼 전체 타입
			const response = await customAxios.get<
				RecruitmentResponse[],
				{ status_code: number; message: string; data: RecruitmentResponse[] }
			>(PATH);
			return response.data;
		} catch (error) {
			throw new Error("채용공고를 불러오는데 실패했습니다.");
		}
	},
};

// 편의 함수들
export const getRecruitments = (filters?: RecruitmentFilters) =>
	RecruitmentApi.getRecruitments(filters);
