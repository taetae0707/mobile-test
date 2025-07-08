import { CareerYearType, QnaAskerType } from "@types";
// import requestHandler from 'api/request-handler'
import { GetQnaListResponse, GetQnaStatusResponse } from "api/types/qna.type";
import customAxios from "api/customAxios.ts";

const PATH = "/posts"; // QnA 관련 API 요청의 기본 경로

//질문을 등록할 때 서버에 전달할 데이터를 정의한 타입
export interface PostQnaParams {
	// id: string | undefined
	nickname: string | null;
	isSecret: boolean;
	careerYear: CareerYearType;
	isMajor: boolean;
	questionText: string;
	// portfolioLink: string;
	portfolio_link?: string;
}

//질문에 대한 답변을 등록한 뒤 서버로부터 받을 응답 데이터 구조
export type PostQnaAnswerResponse = {
	public_id: string;
	answer_text: string;
};

//질문 등록하는 API
export const PostsApi = {
	postQna: async ({
		nickname,
		isSecret,
		careerYear,
		isMajor,
		questionText,
		portfolio_link,
	}: PostQnaParams) => {
		return await customAxios.post<null>(PATH + "/qna", {
			nickname,
			is_secret: isSecret,
			career_year: careerYear,
			is_major: isMajor,
			question_text: questionText,
			portfolio_link: portfolio_link,
		});
	},
	/* postQna : 질문 등록하는 API/함수
  ✅ 어떤 기능?
  → 사용자가 새로운 질문을 등록할 때 서버에 보내는 함수.

  ✅ 어떻게 동작해?
  1. customAxios.post()를 사용해 서버에 POST 요청을 보냄.
  2. URL 경로는 /posts/qna
  3. 그 밑은 서버에 보낼 데이터
  */

	getQnaList: async (type: string = QnaAskerType.ALL, id?: string) => {
		return await customAxios.get<GetQnaListResponse[]>(
			PATH + `/qna?type=${type}&nickname=${id}`
		); // API 엔드포인트
	},
	/* getQnaList: 질문 목록 조회하는 함수
  ✅ 어떤 기능?
  → 서버에서 질문 리스트를 받아와서 화면에 보여줄 수 있게 해주는 함수.

  ✅ 동작 원리:
  customAxios.get()을 사용해서 서버에 GET 요청을 보냄.

  주소는 /posts/qna?type=타입&nickname=아이디
  -type은 어떤 질문을 가져올지 기준.
  -예: ALL(전체), MINE(내가 한 질문), ANSWERED(답변 완료) 등등
  */

	getQnaStatus: async () => {
		return await customAxios.get<GetQnaStatusResponse>(PATH + `/qna/status`);
	},
	/* getQnaStatus: 질문 상태 확인
    ✅ 어떤 기능?
    → 현재 질문들에 대한 상태 정보(예: 총 질문 수, 답변된 개수)를 받아오는 함수.

    ✅ 동작 원리:
    GET 요청을 /posts/qna/status로 보냄.

    별도의 id나 type 같은 조건 없이, 전체 상태를 보여주는 거야.
  */

	//질문에 답변 등록
	postQnaAnswer: async (id: string, answerText: string) => {
		return await customAxios.post<PostQnaAnswerResponse>(
			PATH + `/qna/${id}/answer`,
			{
				answer_text: answerText,
			}
		);
	},
	/*
    postQnaAnswer: 질문에 답변 등록
    ✅ 어떤 기능?
    → 특정 질문에 대해 답변을 등록할 때 사용하는 함수야.

    ✅ 동작 순서:
    URL이 /posts/qna/{id}/answer 형태야.

    이때 {id}는 답변을 달고 싶은 질문 ID를 뜻해.

    보낼 데이터는 아래 하나뿐:

    answer_text: 답변 내용 (텍스트만) 
  */
};
