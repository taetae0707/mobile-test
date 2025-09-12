// utils/jobs.ts
import { RecruitmentResponse } from "@api/types/job.types";

export function findFrontendSkillId(
	jobs: RecruitmentResponse[]
): number | null {
	const frontendJob = jobs.find((job) => job.position_id === 1);
	return frontendJob ? frontendJob.position_id : null;
}
