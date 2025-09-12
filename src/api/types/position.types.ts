// 포지션 API 응답 타입
export interface PositionResponse {
	title: string;
	description: string;
	public_id: string;
	created_at: string;
	updated_at: string;
	position_id: number;
}

// API 응답 래퍼
export interface PositionsApiResponse {
	status_code: number;
	message: string;
	data: PositionResponse[];
}
