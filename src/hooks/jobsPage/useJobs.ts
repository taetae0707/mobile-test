import { RecruitmentFilters } from "@api/types/job.types";
import { useJobsQuery } from "../queries/useJobsQuery";


export function useJobs(filters?: RecruitmentFilters) {
	const {
		data: jobs = [],
		isLoading,
		error,
		refetch,
		isError,
	} = useJobsQuery(filters);

	// 에러 없음 → null
	// 에러 있음 + Error 객체임 → error.message
	// 에러 있음 + 다른 값(string, object 등) → "채용공고를 불러오는데 실패했습니다."

	const errorMessage =
		isError && error
			? error instanceof Error
				? error.message
				: "채용공고를 불러오는데 실패했습니다."
			: null;

	return {
		jobs,
		loading: isLoading,
		error: errorMessage,
		refetch,
	};
}
