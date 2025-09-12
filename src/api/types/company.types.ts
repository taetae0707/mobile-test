// 백엔드 응답에 맞는 모회사 타입 정의
export interface CompanyParentResponse {
	public_id: string;
	name: string;
	english_name: string;
	description: string;
	logo_url: string;
	created_at: string;
	updated_at: string;
}
