"use client";

import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useParams, useRouter } from "next/navigation";
import { useAccountStore } from "@store/index.ts";
import { useToastMessageStore } from "@toast";
import { useDetailPageContext } from "@hooks/qnaPage/provider/DetailPageProvider.tsx";
import { useMobileStore } from "@store/useMobileStore.ts";
import { isAxiosError } from "axios";
import { AccountType, RequestApi } from "@api/index.ts";
import { TeacherIntroduce } from "@components/qnaPage/web/TeacherIntroduce.tsx";
import { QuestionField } from "@components/qnaPage/web/QuestionField.tsx";
import { QuestionList } from "@components/qnaPage/web/QuestionList.tsx";
import { MobileQnaPage } from "@app/[nickname]/MobileQnaPage";

// const TeacherIntroduce = dynamic(
// 	() =>
// 		import("@components/qnaPage/web/TeacherIntroduce.tsx").then(
// 			(mod) => mod.TeacherIntroduce
// 		),
// 	{
// 		loading: () => <div>멘토 정보 로딩중...</div>,
// 		ssr: false,
// 	}
// );
// const QuestionField = dynamic(
// 	() =>
// 		import("@components/qnaPage/web/QuestionField.tsx").then(
// 			(mod) => mod.QuestionField
// 		),
// 	{
// 		loading: () => <div>질문 입력창 로딩중...</div>,
// 		ssr: false,
// 	}
// );
// const QuestionList = dynamic(
// 	() =>
// 		import("@components/qnaPage/web/QuestionList.tsx").then(
// 			(mod) => mod.QuestionList
// 		),
// 	{
// 		loading: () => <div>질문 목록 로딩중...</div>,
// 		ssr: false,
// 	}
// );
// const MobileQnaPage = dynamic(
// 	() =>
// 		import("@app/[nickname]/MobileQnaPage").then((mod) => mod.MobileQnaPage),
// 	{
// 		loading: () => <div>모바일 페이지 로딩중...</div>,
// 		ssr: false,
// 	}
// );

// 실제 QnaPage 컴포넌트 (Context 소비자)
export default function QnaPageContent() {
  useEffect(() => {
    const switchStart = Number(localStorage.getItem("QnaPage_start_time"));

    if (switchStart) {
      const switchEnd = Date.now();
      /*console.log(
        "프로필 카드 클릭 → 페이지 도착까지 걸린 시간(ms):",
        switchEnd - switchStart,
      );*/
      localStorage.removeItem("QnaPage_start_time");
    }
  }, []);

  const router = useRouter();
  const params = useParams();
  const id = params?.nickname as string;

  const { publicId, accountType } = useAccountStore();
  const { setErrorToastMessage } = useToastMessageStore();
  const { isMobile } = useMobileStore();
  const { pageLoading, setTeacherAccount, setPageLoading, teacherAccount } =
    useDetailPageContext();

  const [isAnswerAuthority, setIsAnswerAuthority] = useState<boolean>(false);

  const handleError = (message: string) => {
    setErrorToastMessage(message);
    router.push("/");
  };

  const getTeacherData = async () => {
    if (!id) {
      handleError("잘못된 접근입니다.");
      return;
    }

    try {
      const res = await RequestApi.accounts.getAccount(id);
      setTeacherAccount(res.data);
      setPageLoading(true);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        handleError("로그인 토큰이 만료되었습니다. 다시 로그인 해주세요.");
      } else {
        handleError("품앗이꾼 정보를 가져오는 데 실패했습니다.");
      }
    }
  };

  useEffect(() => {
    if (!publicId) {
      handleError("로그인을 먼저 진행해주세요.");
      return;
    }

    scroll(0, 0);
    getTeacherData();
  }, [publicId]);

  useEffect(() => {
    if (teacherAccount) {
      setIsAnswerAuthority(
        teacherAccount.public_id === publicId &&
          accountType === AccountType.MENTOR,
      );
    }
  }, [teacherAccount]);

  // console.log("isMobile", isMobile);

  return isMobile ? (
    <MobileQnaPage />
  ) : (
    <Container>
      <PageContainer>
        <PageContent>
          {!pageLoading ? (
            <>Loading...</>
          ) : (
            <>
              <TeacherIntroduce />
              <Seperator />
              {!isAnswerAuthority && <QuestionField />}
              <QuestionList />
            </>
          )}
        </PageContent>
      </PageContainer>
    </Container>
  );
}

// 스타일 컴포넌트는 그대로 유지...

const Container = styled.div`
  width: 100%;
  padding-top: 80px;

  @media (max-width: 1024px) {
    padding-top: 0;
  }
`;
const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 5% 0 5%;
  /* background-color: pink; */
`;
const PageContent = styled.div`
  width: 1320px;
  margin-bottom: 50px;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;
const Seperator = styled.div`
  height: 4px;
  width: 100%;
  border-top: 1px solid #eaebed;
  margin-top: 30px;

  @media (max-width: 1024px) {
    height: 1px;
    border-top: 1px solid #eaebed;
  }
`;
