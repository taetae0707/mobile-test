// 스킬 항목
export interface JobSkill {
	skill_id: number;
	skill_name: string;
	skill_logo: string;
}

// 채용 항목(응답의 data[])
export interface RecruitmentResponse {
	title: string;
	link: string;
	recruitment_id: number;
	public_id: string;

	// 모회사 회사 정보
	parent_company_id: number;
	parent_company_name: string;
	parent_company_logo_url: string;

	//자회사 정보
	company_id: number;
	company_name: string;
	company_english_name: string;
	company_description: string;
	company_logo_url: string;
	company_addres: string; // [원문 유지: addres]
	company_address_depth1: string;
	company_address_depth2: string;
	company_address_depth3: string;
	company_longitude: number;
	company_latitude: number;
	company_founded_date: string;

	// 포지션
	position_id: number;
	position_title: string;
	position_description: string;

	// 공고 본문/상태
	contents: string;
	experience_years: string; // 서버가 문자열 제공
	is_closed: boolean;

	// 타임스탬프
	posted_date: string;
	created_at: string;
	updated_at: string;

	// 스킬 배열
	skills: JobSkill[];
}

// 제네릭 API 래퍼 (OCP: 다른 엔드포인트에도 재사용)
export interface ApiResponse<T> {
	status_code: number;
	message: string;
	data: T;
}

// 최종 응답 타입
export type RecruitmentApiResponse = ApiResponse<RecruitmentResponse[]>;

// --- 선택 필터 타입 (요청 파라미터) ---
// export type ExperienceLevel = "인턴" | "주니어" | "시니어";

export interface RecruitmentFilters {
	skill_ids?: number[];
	experience_years?: string[];
	position_titles?: string[];
	position_ids?: number[];
	company_names?: string[];
	locations?: string[];
}
