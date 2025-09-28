// 기술 스택 API 응답 타입
export interface SkillResponse {
	skill_name: string;
	skill_id: number;
	public_id: string;
	logo_url: string;
	designed_logo_url: string;
	official_homepage_url: string;
	created_at: string;
	updated_at: string;
}

// Skills API 응답 래퍼
export interface SkillsApiResponse {
	status_code: number;
	message: string;
	data: SkillResponse[];
}
