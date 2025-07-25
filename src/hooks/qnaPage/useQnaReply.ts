// useQnaReply.ts
import { useState } from "react";
import { RequestApi } from "api/request-api";
import { useQueryClient } from "@tanstack/react-query";

//왜 여러 입력창이 동시에 존재하면 객체로 관리해야 하는지"

//refetch: react-query의 데이터를 새로고침해주는 함수
//왜 refetch를 파라미터로 넘길까? 댓글(답글)을 등록한 후에 Q&A 목록을 다시 불러와야(갱신해야) 하기 때문
export function useQnaReply(refetch: () => void) {
	const queryClient = useQueryClient();
	const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
	/*
  Record는 <키의타입, 값의타입>인 객체를 만든다.
  - 첫 번째 string은 질문 id
  - 두 번째 string은 그 질문에 입력한 답변 텍스트
  */
	//포커스인 QnA 항목의 id를 저장 for ui변경
	const [focusedId, setFocusedId] = useState<string | null>(null);

	const handleReplySubmit = async (qnaId: string) => {
		const text = replyTexts[qnaId]?.trim();
		if (!text) return;
		try {
			await RequestApi.posts.postQnaAnswer(qnaId, text);
			setReplyTexts((prev) => ({ ...prev, [qnaId]: "" }));
			//답변 등록 성공하면, "입력창의 값"을 빈 문자열로 초기화

			// 모든 qnaList 관련 캐시를 무효화하여 탭 전환 시에도 최신 데이터를 보장
			queryClient.invalidateQueries({
				queryKey: ["qnaList"],
			});
		} catch (err) {
			console.error("댓글 등록 실패:", err);
		}
	};

	return {
		replyTexts,
		setReplyTexts,
		focusedId,
		setFocusedId,
		handleReplySubmit,
	};
}
