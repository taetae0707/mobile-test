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

// 모회사별 채용공고 상태 타입
export interface CompanyJobStatus {
	hasActiveJobs: boolean; // 현재 채용중인 공고가 있는지
	hasNewJobs: boolean; // 7일 이내 새 공고가 있는지
	activeJobCount: number; // 활성화된 공고 수
	newJobCount: number; // 새 공고 수
}
