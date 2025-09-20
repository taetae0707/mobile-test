import { useQuery } from "@tanstack/react-query";
import { RecruitmentApi } from "@api/companies/recruitment-api";
import { RecruitmentResponse, RecruitmentFilters } from "@api/types/job.types";

//채용공고 API를 React Query로 불러오고 캐시/에러/재시도 등을 관리
export function useRecruitmentQuery(filters?: RecruitmentFilters) {
	return useQuery<RecruitmentResponse[]>({
		queryKey: ["jobs", filters],
		queryFn: () => RecruitmentApi.getRecruitments(filters),
		staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
		gcTime: 10 * 60 * 1000, // 10분 후 가비지 컬렉션
		refetchOnWindowFocus: false,
		retry: 1,
	});
}
