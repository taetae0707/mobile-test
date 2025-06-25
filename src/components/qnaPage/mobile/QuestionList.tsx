import { ProfileBadge } from "@components/common/badge";
import { AccountType, QnaAskerType } from "@types";
import { GetQnaListResponse } from "api/types/qna.type";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import { useCallback, useEffect, useState } from "react";
import { useDetailPageContext } from "@hooks/qnaPage/provider/DetailPageProvider";
import { useParams } from "next/navigation";

import { QuestionCard } from "@components/qnaPage/mobile/QuestionCard.tsx";
import { AnswerCard } from "@components/qnaPage/mobile/AnswerCard.tsx";
import { useAccountStore } from "@store/account";
import SendIcon from "@mui/icons-material/Send";
import { colors } from "@styles/foundation/color";
import { useEditAuthority, useQnaList } from "@hooks/qnaPage";
import { useQnaReply } from "@hooks/qnaPage/useQnaReply";
import { getMobileVw } from "@utils/responsive";
import { match } from "ts-pattern";

export function QuestionList() {
  const params = useParams(); // Next.js 방식
  const id = params?.nickname as string;

  const { publicId, accountType } = useAccountStore();
  const { teacherAccount, isQuestionListFetched, setIsQuestionListFetched } =
    useDetailPageContext();

  //Q&A 리스트 상태관리
  const [qnaAskerType, setQnaAskerType] = useState<QnaAskerType>(
    QnaAskerType.ALL,
  );
  // Q&A 리스트 가져오기 (React Query)
  const qnaData = useQnaList(qnaAskerType, id);

  // [추가] 답글 textarea/포커스 상태
  const {
    replyTexts,
    setReplyTexts,
    focusedId,
    setFocusedId,
    handleReplySubmit,
  } = useQnaReply(qnaData.refetch);

  const { isAuthority } = useEditAuthority();

  //비밀질문 여부
  const getIsSecretQuestion = useCallback((question: GetQnaListResponse) => {
    if (
      accountType === AccountType.MENTOR &&
      teacherAccount?.public_id === publicId
    ) {
      return false; //비밀 여부 상관없이 볼 수 있음
    }

    // 비밀질문이 아닌 경우 모두 확인 가능
    if (question.is_secret === 0) {
      return false;
    }

    // 비밀질문인 경우, 본인만 확인가능
    if (question.is_secret === 1) {
      return question.questioner_public_id !== publicId;
    }

    return true;
  }, []);

  //데이터 refetch
  useEffect(() => {
    if (isQuestionListFetched) {
      qnaData.refetch().finally(() => setIsQuestionListFetched(false));
    }
  }, [isQuestionListFetched, setIsQuestionListFetched]);

  return (
    <QuestionListBody>
      <div
        style={{
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        질문 History
      </div>

      <BadgeContainer>
        <ProfileBadge
          onClick={() => setQnaAskerType(QnaAskerType.ALL)}
          badgeString={"전체"}
          selected={QnaAskerType.ALL === qnaAskerType}
        />
        <ProfileBadge
          onClick={() => setQnaAskerType(QnaAskerType.ME)}
          badgeString={"내 질문"}
          selected={QnaAskerType.ME === qnaAskerType}
        />
      </BadgeContainer>

      {match(qnaData)
        .with({ isLoading: true }, () => (
          <InfoText>질문을 가져오는 중입니다..</InfoText>
        ))
        .with({ isError: true }, () => (
          <InfoText>
            질문을 가져오던 도중, 실패하였습니다. 다시 시도해주세요.
          </InfoText>
        ))
        .with({ data: [] }, () => <InfoText>아직 질문이 없네요 :D</InfoText>)
        .otherwise(({ data }) =>
          data?.map((qna) => (
            <QnaSection key={qna.public_id}>
              <QuestionArea>
                <QuestionCard
                  question={qna}
                  isSecret={getIsSecretQuestion(qna)}
                  key={qna.public_id}
                  onUpdateRequest={() => {
                    if (setIsQuestionListFetched) {
                      setIsQuestionListFetched(true);
                    }
                  }}
                />
              </QuestionArea>
              {isAuthority && !qna.answer_text && (
                <ReplyTextareaWrapper>
                  <ReplyTextarea
                    value={replyTexts[qna.public_id] || ""}
                    onChange={(e) =>
                      setReplyTexts((prev) => ({
                        ...prev,
                        [qna.public_id]: e.target.value,
                      }))
                    }
                    onFocus={() => setFocusedId(qna.public_id)}
                    onBlur={() => setFocusedId(null)}
                    isFocused={focusedId === qna.public_id}
                    placeholder="답글을 입력해주세요."
                    maxLength={1000}
                  />
                  <ReplyButton onClick={() => handleReplySubmit(qna.public_id)}>
                    <SendIcon style={{ fontSize: "15px" }} />
                  </ReplyButton>
                </ReplyTextareaWrapper>
              )}

              {qna.answer_text && (
                <AnswerCard
                  question={qna}
                  answerText={qna.answer_text}
                  isMyAnswer={getIsSecretQuestion(qna)}
                  teacherName={teacherAccount?.name ?? ""}
                  answerDate={qna.updated_at}
                  onUpdateRequest={() => setIsQuestionListFetched(true)}
                />
              )}
            </QnaSection>
          )),
        )}
    </QuestionListBody>
  );
}

const ReplyTextareaWrapper = styled.div`
  display: flex;
  @media (max-width: 1024px) {
    gap: 14px;
  }
`;

const ReplyTextarea = styled.textarea<{ isFocused: boolean }>`
  height: ${(props) => (props.isFocused ? "140px" : "40px")};
  resize: none;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  margin-top: 10px;
  transition: height 0.2s ease;
  color: ${colors.gray500};
  @media (max-width: 1024px) {
    width: ${getMobileVw(290)};
    resize: none;
    border-radius: 8px;
    padding: 10px;
    margin-top: 10px;
  }
`;

const ReplyButton = styled.button`
  margin-top: 8px;
  background-color: ${colors.green200};
  color: ${colors.green600};
  padding: 6px 10px;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
`;

const QuestionListBody = styled.div`
  margin-top: 70px;
  width: 100%;

  @media (max-width: 1024px) {
    margin-top: 0;
  }
`;

const BadgeContainer = styled(Grid)`
  width: 100%;
`;

const QnaSection = styled.div`
  margin-bottom: 50px;

  @media (max-width: 1024px) {
    margin-bottom: 30px;
  }
`;

const InfoText = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 24px;
`;

const QuestionArea = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  gap: 20px;
`;

export const QuestionAnswerButton = styled.div`
  display: inline-flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  background: #b2ebe3;

  color: #08ae98;

  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  @media (max-width: 1024px) {
    width: 14%;
  }
`;
