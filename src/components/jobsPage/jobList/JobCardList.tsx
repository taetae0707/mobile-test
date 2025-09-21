import { JobCard } from "@jobsPage/JobList/JobCard";
import { RecruitmentResponse } from "@api/types/job.types";

interface JobListProps {
	jobs: RecruitmentResponse[];
	loading: boolean;
	error: string | null;
	onJobClick?: (job: RecruitmentResponse) => void;
}

// SRP: 채용공고 리스트 렌더링만 담당
export function JobList({ jobs, loading, error, onJobClick }: JobListProps) {
	// 로딩 상태 렌더링 - SRP: 로딩 UI만 담당
	const renderLoadingState = () => {
		return (
			<section
				className="space-y-4"
				aria-label="채용공고 로딩 중">
				{Array.from({ length: 3 }).map((_, index) => (
					<div
						key={index}
						className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
						<div className="flex items-start gap-4">
							{/* 로고 스켈레톤 */}
							<div className="flex-shrink-0">
								<div className="w-16 h-16 rounded-full bg-gray-200"></div>
							</div>

							{/* 콘텐츠 스켈레톤 */}
							<div className="flex-1 space-y-3">
								<div className="space-y-2">
									<div className="h-4 bg-gray-200 rounded w-1/3"></div>
									<div className="h-6 bg-gray-200 rounded w-3/4"></div>
								</div>
								<div className="flex gap-2">
									<div className="h-6 bg-gray-200 rounded w-16"></div>
									<div className="h-6 bg-gray-200 rounded w-12"></div>
								</div>
								<div className="flex gap-2">
									<div className="h-6 bg-gray-200 rounded-full w-6"></div>
									<div className="h-6 bg-gray-200 rounded-full w-6"></div>
									<div className="h-6 bg-gray-200 rounded-full w-6"></div>
								</div>
								<div className="h-4 bg-gray-200 rounded w-1/2"></div>
							</div>
						</div>
					</div>
				))}
			</section>
		);
	};

	// 에러 상태 렌더링 - SRP: 에러 UI만 담당
	const renderErrorState = () => {
		return (
			<section className="text-center py-12">
				<div className="text-red-500">
					<svg
						className="mx-auto h-12 w-12 text-red-400 mb-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<p className="text-lg font-medium text-red-900 mb-2">
						오류가 발생했습니다
					</p>
					<p className="text-red-600">{error}</p>
				</div>
			</section>
		);
	};

	// 빈 상태 렌더링 - SRP: 빈 상태 UI만 담당
	const renderEmptyState = () => {
		return (
			<section className="text-center py-12">
				<div className="text-gray-500">
					<svg
						className="mx-auto h-12 w-12 text-gray-400 mb-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
					<p className="text-lg font-medium text-gray-900 mb-2">
						채용공고가 없습니다
					</p>
				</div>
			</section>
		);
	};

	// 정상 상태 렌더링 - SRP: 채용공고 리스트 UI만 담당
	const renderJobList = () => {
		return (
			<section
				className="space-y-4"
				aria-label={`총 ${jobs.length}개의 채용공고`}>
				<div className="mb-4">
					<p className="text-sm text-gray-600">
						총
						<span className="font-semibold text-gray-900">{jobs.length}건</span>
					</p>
				</div>

				{jobs.map((job) => (
					<JobCard
						key={job.public_id}
						job={job}
						onClick={onJobClick}
					/>
				))}
			</section>
		);
	};

	// OCP: 새로운 상태 추가 시 기존 코드 수정 없이 확장 가능
	// 상태별 렌더링 결정 - SRP: 상태 판단만 담당
	if (loading) {
		return renderLoadingState();
	}

	if (error) {
		return renderErrorState();
	}

	if (jobs.length === 0) {
		return renderEmptyState();
	}

	return renderJobList();
}
