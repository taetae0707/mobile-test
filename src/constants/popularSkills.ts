// 인기 스택 설정 - 유지보수를 위해 별도 파일로 관리
export interface PopularSkillConfig {
	displayName: string; // 화면에 표시될 이름
	apiSearchTerms: string[]; // API에서 검색할 키워드들 (대소문자 무관)
}

export const POPULAR_SKILLS_CONFIG: PopularSkillConfig[] = [
	{
		displayName: "React",
		apiSearchTerms: ["react", "reactjs", "react.js"],
	},
	{
		displayName: "Next.js",
		apiSearchTerms: ["next.js", "nextjs", "next"],
	},
	{
		displayName: "C++",
		apiSearchTerms: ["c++", "cpp", "cplusplus"],
	},
	{
		displayName: "JAVA",
		apiSearchTerms: ["java", "openjdk"],
	},
	{
		displayName: "Python",
		apiSearchTerms: ["python", "py"],
	},
];

// 매칭된 인기 스택 데이터 타입
export interface PopularSkillData {
	displayName: string;
	skill_id: number;
	name: string; // API에서 가져온 실제 이름
	designed_logo_url: string;
	logo_url: string;
}
