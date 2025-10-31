"use client";

import { useParams } from "next/navigation";
import { useParentCompaniesQuery } from "@queries/useParentCompaniesQuery";
import { CompanyInfo } from "@components/jobsPage/CompanyInfo";
import { CompanyNavList } from "@components/jobsPage/CompanyNav/CompanyNavList";
import { JobList } from "@components/jobsPage/JobList";
import {
	BasicFilter,
	FilterButtonsRow,
	FilterModal,
} from "@components/jobsPage/Filter";
import { useModalFilters } from "@hooks/jobsPage/useModalFilters";
import { useFilterStore } from "@store/filters";
import { RecruitmentResponse } from "@api/types/job.types";
import { useMemo, useEffect } from "react";

export default function CompanyJobsPage() {
	const params = useParams();
	const companyName = params?.companyName as string;

	const {
		data: companies = [],
		isLoading: companiesLoading,
		error: companiesError,
	} = useParentCompaniesQuery();

	// URL 파라미터에서 받은 회사 영어 이름으로 회사 정보 찾기
	const selectedCompany = useMemo(() => {
		if (!companyName || !companies.length) return null;

		return (
			companies.find((company) => company.english_name === companyName) || null
		);
	}, [companyName, companies]);

	// 필터링 및 채용공고 가져오기
	const {
		allJobs,
		filteredJobs,
		loading: jobsLoading,
		error: jobsError,
		clearFilters,
		refetch,
	} = useModalFilters();

	const { extractFilterOptions, selectAllCompanies } = useFilterStore();

	// jobs 데이터가 로드되면 필터 옵션 추출
	useEffect(() => {
		if (allJobs.length > 0) {
			extractFilterOptions(allJobs);
		}
	}, [allJobs, extractFilterOptions]);

	// URL 파라미터로 받은 회사를 필터에 초기 설정
	useEffect(() => {
		if (selectedCompany) {
			// 회사 이름(한글)을 필터에 설정
			selectAllCompanies([selectedCompany.name]);
		}
	}, [selectedCompany, selectAllCompanies]);

	const handleResetAllFilters = () => {
		clearFilters();
		// 필터 초기화 후 다시 회사 필터 설정
		if (selectedCompany) {
			selectAllCompanies([selectedCompany.name]);
		}
	};

	const handleJobClick = (job: RecruitmentResponse) => {
		console.log("선택된 채용공고:", job.title);
	};

	const renderErrorState = () => (
		<div className="text-center py-8">
			<div
				className="text-red-500 bg-red-50 border border-red-200 rounded-lg p-4"
				role="alert"
				aria-live="polite">
				{companiesError
					? companiesError instanceof Error
						? companiesError.message
						: "회사 목록을 불러오는데 실패했습니다."
					: "회사를 찾을 수 없습니다."}
			</div>
		</div>
	);

	// 선택된 회사가 없고 로딩이 완료된 경우 에러 처리
	if (!companiesLoading && !selectedCompany && companyName) {
		return (
			<main className="max-w-7xl mx-auto px-4 pb-16">
				<section className="bg-white rounded-lg shadow-sm p-6 mb-8">
					<CompanyNavList
						companies={companies}
						selectedCompany={null}
						onCompanySelect={() => {}}
						loading={false}
					/>
				</section>
				<section className="bg-white rounded-lg shadow-sm p-6">
					{renderErrorState()}
				</section>
			</main>
		);
	}

	if (companiesError) {
		return (
			<main className="max-w-7xl mx-auto px-4 pb-16">
				<section className="bg-white rounded-lg shadow-sm p-6 mb-8">
					<CompanyNavList
						companies={companies}
						selectedCompany={null}
						onCompanySelect={() => {}}
						loading={false}
					/>
				</section>
				<section className="bg-white rounded-lg shadow-sm p-6">
					{renderErrorState()}
				</section>
			</main>
		);
	}

	return (
		<main className="max-w-7xl mx-auto px-4 pb-16">
			<section className="bg-white rounded-lg shadow-sm p-6 mb-8">
				<CompanyNavList
					companies={companies}
					selectedCompany={selectedCompany}
					onCompanySelect={() => {}}
					loading={companiesLoading}
				/>
			</section>

			{/* 선택된 회사 정보 표시 */}
			{selectedCompany && (
				<section className="bg-white rounded-lg shadow-sm p-6 mb-8">
					<CompanyInfo company={selectedCompany} />
				</section>
			)}

			{selectedCompany && (
				<section className="bg-white rounded-lg shadow-sm p-6">
					<div className="mb-6">
						<h2 className="text-xl font-bold text-gray-900 mb-4">
							채용중인 공고 탐색하기
						</h2>
					</div>

					{/* 기본 필터 UI */}
					<div className="py-6 space-y-6">
						<FilterButtonsRow
							totalJobsCount={filteredJobs.length}
							onResetFilters={handleResetAllFilters}
						/>
					</div>

					<JobList
						jobs={filteredJobs}
						loading={jobsLoading}
						error={jobsError}
						onJobClick={handleJobClick}
					/>
				</section>
			)}

			<FilterModal />
		</main>
	);
}
