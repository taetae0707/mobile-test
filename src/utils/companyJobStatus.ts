import { RecruitmentResponse } from "@api/types/job.types";
import { CompanyJobStatus } from "@api/types/company.types";

/**
 * 모회사별 채용공고 상태를 확인하는 순수 함수
 * @param companyName 모회사명
 * @param allJobs 모든 채용공고 목록
 * @returns 해당 모회사의 채용공고 상태
 */
export const checkCompanyJobStatus = (
	companyName: string,
	allJobs: RecruitmentResponse[]
): CompanyJobStatus => {
	// 해당 모회사의 채용공고만 필터링
	const companyJobs = allJobs.filter(
		(job) => job.parent_company_name === companyName
	);

	const now = new Date();
	const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

	let activeJobCount = 0;
	let newJobCount = 0;

	companyJobs.forEach((job) => {
		// 모든 채용공고를 활성화된 것으로 간주 (is_closed 정의가 불명확하므로)
		activeJobCount++;

		// created_at 기준으로 7일 이내 확인
		const jobDate = new Date(job.created_at);
		if (jobDate >= sevenDaysAgo) {
			newJobCount++;
		}
	});

	return {
		hasActiveJobs: activeJobCount > 0,
		hasNewJobs: newJobCount > 0,
		activeJobCount,
		newJobCount,
	};
};
