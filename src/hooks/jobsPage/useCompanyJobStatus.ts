"use client";

import { useMemo } from "react";
import { useParentCompaniesQuery } from "@queries/useParentCompaniesQuery";
import { useRecruitmentQuery } from "@queries/useRecruitmentQuery";
import { checkCompanyJobStatus } from "@utils/companyJobStatus";
import { CompanyJobStatus } from "@api/types/company.types";

/**
 * 모회사별 채용공고 상태를 관리하는 Hook
 */
export function useCompanyJobStatus() {
	const { data: companies = [], isLoading: companiesLoading } =
		useParentCompaniesQuery();
	const { data: allJobs = [], isLoading: jobsLoading } = useRecruitmentQuery();

	// 각 모회사별 채용공고 상태 계산
	const companyStatuses = useMemo(() => {
		if (!companies.length || !allJobs.length) {
			return {} as Record<string, CompanyJobStatus>;
		}

		return companies.reduce(
			(acc, company) => {
				acc[company.name] = checkCompanyJobStatus(company.name, allJobs);
				return acc;
			},
			{} as Record<string, CompanyJobStatus>
		);
	}, [companies, allJobs]);

	// 특정 모회사의 상태를 가져오는 함수
	const getCompanyStatus = (companyName: string): CompanyJobStatus => {
		return (
			companyStatuses[companyName] || {
				hasActiveJobs: false,
				hasNewJobs: false,
				activeJobCount: 0,
				newJobCount: 0,
			}
		);
	};

	return {
		companyStatuses,
		getCompanyStatus,
		isLoading: companiesLoading || jobsLoading,
	};
}
