// 인기 스택 설정 - 유지보수를 위해 별도 파일로 관리
export interface PopularSkillConfig {
	displayName: string; // 화면에 표시될 이름
	apiSearchTerms: string[]; // API에서 검색할 키워드들 (대소문자 무관)
	logo_url: string;
	skill_id: number;
}

export const POPULAR_SKILLS_CONFIG: PopularSkillConfig[] = [
	{
		displayName: "React",
		skill_id: 6,
		apiSearchTerms: ["react", "reactjs", "react.js"],
		logo_url:
			"https://poomasi-prod.s3.ap-northeast-2.amazonaws.com/positions/skill/logo_url/a1a268ba-4bf6-443e-83ce-b4771c4dd61a.png",
	},
	{
		displayName: "Next.js",
		skill_id: 9,
		apiSearchTerms: ["next.js", "nextjs", "next"],
		logo_url:
			"https://poomasi-prod.s3.ap-northeast-2.amazonaws.com/positions/skill/logo_url/791e6b0c-d289-41eb-806d-2d7612356d33.png",
	},
	{
		displayName: "C++",
		skill_id: 57,
		apiSearchTerms: ["c++", "cpp", "cplusplus"],
		logo_url:
			"https://poomasi-prod.s3.ap-northeast-2.amazonaws.com/positions/skill/logo_url/1c34b9f3-b917-4b73-9f49-61694dea1e62.png",
	},
	{
		displayName: "JAVA",
		skill_id: 58,
		apiSearchTerms: ["java", "openjdk"],
		logo_url:
			"https://poomasi-prod.s3.ap-northeast-2.amazonaws.com/positions/skill/logo_url/e025c554-f58e-45e7-bc75-e643e9ee24ea.png",
	},
	{
		displayName: "Python",
		skill_id: 55,
		apiSearchTerms: ["python", "py"],
		logo_url:
			"https://poomasi-prod.s3.ap-northeast-2.amazonaws.com/positions/skill/logo_url/e311dac2-984b-4c0d-bf68-45ade1512cc6.png",
	},
];

// 매칭된 인기 스택 데이터 타입
// export interface PopularSkillData {
// 	displayName: string;
// 	skill_id: number;
// 	name: string; // API에서 가져온 실제 이름
// 	designed_logo_url: string;
// 	logo_url: string;
// }
