import { RecruitmentResponse } from "@api/types/job.types";
import { CompanyLogo, SkillIcon, Badge, LoadingState } from "@jobsPage/Common";

interface JobCardProps {
	job: RecruitmentResponse;
	onClick?: (job: RecruitmentResponse) => void;
}

export function JobCard({ job, onClick }: JobCardProps) {
	const handleClick = (e: React.MouseEvent) => {
		onClick?.(job);
	};

	return (
		<a
			href={job.link}
			target="_blank"
			rel="noopener noreferrer"
			className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
			onClick={handleClick}
			aria-label={`${job.title} 채용공고`}>
			<div className="flex items-start gap-4">
				{/* 회사 로고 */}
				<CompanyLogo
					logoUrl={job.parent_company_logo_url}
					companyName={job.parent_company_name}
				/>

				{/* 채용공고 정보 */}
				<div className="flex-1 min-w-0">
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-2 mb-1">
							<span className="text-sm text-gray-600">{job.company_name}</span>
						</div>
						{/* 채용공고 제목 */}
						<h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
							{job.title}
						</h3>
						{/* 뱃지들 - 지역, 경력, 포지션 */}
					</div>
					<div className="flex items-center gap-2 mb-4">
						{job.company_address_depth1 && (
							<Badge
								text={job.company_address_depth1}
								variant="blue"
							/>
						)}
						<Badge
							text={job.experience_years || "경력무관"}
							variant="green"
						/>
						{job.position_title && (
							<Badge
								text={job.position_title}
								variant="gray"
							/>
						)}
					</div>

					{/* 기술 스택 */}
					<div className="flex items-center gap-2">
						{job.skills.slice(0, 5).map((skill) => (
							<SkillIcon
								key={skill.skill_id}
								skill={skill}
							/>
						))}
						{job.skills.length > 5 && (
							<span className="text-gray-400 text-sm ml-1">
								+{job.skills.length - 5}
							</span>
						)}
					</div>
				</div>
			</div>
		</a>
	);
}
