import { useQuery } from "@tanstack/react-query";
import { RequestApi } from "@api/request-api";
import { CompanyParentResponse } from "@api/types/company.types";

export function useCompaniesQuery() {
	return useQuery<CompanyParentResponse[]>({
		queryKey: ["companies"],
		queryFn: async () => {
			const response = await RequestApi.companies.getParentCompanies();
			return response.data ?? [];
		},
		staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
		gcTime: 10 * 60 * 1000, // 10분 후 가비지 컬렉션
		refetchOnWindowFocus: false,
	});
}
