import { useQuery } from "@tanstack/react-query";
import { PositionsApi } from "@api/companies/positions-api";
import { PositionResponse } from "@api/types";

export function usePositionsQuery() {
	return useQuery<PositionResponse[]>({
		queryKey: ["positions"],
		queryFn: async () => {
			const positions = await PositionsApi.getPositions();
			return positions;
		},
		staleTime: 5 * 60 * 1000, // 5분 캐시
		gcTime: 10 * 60 * 1000, // 10분 후 GC
		refetchOnWindowFocus: false,
	});
}
