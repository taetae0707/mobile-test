import customAxios from "api/customAxios";
import { PostQnaAnswerResponse } from "api/posts";

export const EditsApi = {
	//질문 수정용
	patchQna: async (
		publicId: string,
		questionText: string,
		portfolioLink: string
	): Promise<void> => {
		return await customAxios
			.patch<void>(`/posts/qna/${publicId}`, {
				question_text: questionText,
				portfolio_link: portfolioLink,
			})
			.then((res) => res.data);
	},

	// 답변 수정용
	patchQnaAnswer: async (
		publicId: string,
		answerText: string
	): Promise<PostQnaAnswerResponse> => {
		return await customAxios
			.patch<PostQnaAnswerResponse>(`/posts/qna/${publicId}/answer`, {
				answer_text: answerText,
			})
			.then((res) => res.data);
	},

	//품앗이꾼 프로필 수정용
	patchMentoProfile: async ({
		description,
		profile_image,
		field,
		company1,
		job1,
		company2,
		job2,
	}: {
		description: string;
		profile_image: string | null;
		field: string | null;
		company1: string | null;
		job1: string | null;
		company2: string | null;
		job2: string | null;
	}): Promise<void> => {
		return await customAxios
			.patch<void>(`/accounts/mentor`, {
				description,
				profile_image,
				field,
				company1,
				job1,
				company2,
				job2,
			})
			.then((res) => res.data);
	},
};
