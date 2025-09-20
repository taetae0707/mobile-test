import { CompanyNavIcon } from "@jobsPage/CompanyNav/CompanyNavIcon";
import { CircleBorder } from "@jobsPage/CompanyNav/CircleBorder";
import { CompanyParentResponse } from "@api/types/company.types";
import { useCompanyJobStatus } from "@hooks/jobsPage/useCompanyJobStatus";

interface CompanyCategoryListProps {
	companies: CompanyParentResponse[];
	selectedCompany: CompanyParentResponse | null;
	onCompanySelect: (company: CompanyParentResponse | null) => void;
	loading?: boolean;
}

// SRP: 회사 카테고리 목록 관리만 담당
export function CompanyNavList({
	companies,
	selectedCompany,
	onCompanySelect,
	loading,
}: CompanyCategoryListProps) {
	const { getCompanyStatus, isLoading: jobStatusLoading } =
		useCompanyJobStatus();
	if (loading || jobStatusLoading) {
		return (
			<section
				className="flex justify-center py-12"
				aria-label="회사 목록 로딩">
				<p className="text-gray-500">회사 목록을 불러오는 중...</p>
			</section>
		);
	}

	return (
		<section
			className="w-full px-4"
			aria-label="네카쿠배라 채용공고 필터">
			<h3 className="sr-only">네카쿠배라 채용공고 필터 목록</h3>

			<nav
				className="flex items-center gap-[46px] py-6 overflow-x-auto scrollbar-hide mt-[80px] max-sm:mt-[46px]"
				role="tablist"
				aria-label="회사 선택 탭">
				{/* 각 회사별 버튼들 */}
				{companies.map((company) => {
					const jobStatus = getCompanyStatus(company.name);
					return (
						<CompanyNavIcon
							key={company.public_id}
							company={company}
							isSelected={selectedCompany?.public_id === company.public_id}
							onClick={onCompanySelect}
							hasNewJobs={jobStatus.hasNewJobs}
							hasActiveJobs={jobStatus.hasActiveJobs}
						/>
					);
				})}
			</nav>
		</section>
	);
}
