import { useQuery } from "@tanstack/react-query";
import { SkillsApi } from "@api/companies/skills-api";
import { SkillResponse } from "@api/types/skill.types";

export function useSkillsQuery() {
	return useQuery<SkillResponse[]>({
		queryKey: ["skills"],
		queryFn: async () => {
			const skillsData = await SkillsApi.getSkills();
			return skillsData;
		},
		staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
		gcTime: 10 * 60 * 1000, // 10분 후 가비지 컬렉션
		refetchOnWindowFocus: false,
	});
}
