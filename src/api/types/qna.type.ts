export interface GetQnaListResponse {
	public_id: string;
	career_year: string;
	is_secret: number;
	is_major: number;
	question_text: string;
	answer_text: string;
	questioner_public_id: string;
	answerer_public_id: string;
	created_at: string;
	updated_at: string;
	portfolio_link: string;
}

export interface GetQnaStatusResponse {
	account_count: number;
	post_count: number;
}
