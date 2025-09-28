// 인기 스킬 이름 목록 - API에서 필터링할 때 사용
export const POPULAR_SKILL_NAMES = [
	"React",
	"Next.js",
	"Kotlin",
	"Java",
	"Spring",
] as const;

export type PopularSkillName = (typeof POPULAR_SKILL_NAMES)[number];
