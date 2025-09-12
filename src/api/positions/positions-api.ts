import customAxios from "../customAxios";
import { PositionResponse, PositionsApiResponse } from "@api/types";

const PATH = "v1/capability/positions";

// 포지션 API 호출
export const PositionsApi = {
	// 포지션 목록 조회
	getPositions: async (): Promise<PositionResponse[]> => {
		try {
			const response = await customAxios.get<
				PositionResponse[],
				PositionsApiResponse
			>(PATH);
			return response.data;
		} catch (error) {
			throw new Error("포지션 목록을 불러오는데 실패했습니다.");
		}
	},
};
