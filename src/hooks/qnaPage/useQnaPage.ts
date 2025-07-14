import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAccountStore } from "@store/index.ts";
import { useToastMessageStore } from "@toast";
import { useDetailPageContext } from "@hooks/qnaPage/provider/DetailPageProvider.tsx";
import { useMobileStore } from "@store/useMobileStore.ts";
import { isAxiosError } from "axios";
import { AccountType, RequestApi } from "@api/index.ts";

export function useQnaPage() {
	const router = useRouter();
	const params = useParams();
	const id = params?.nickname as string;

	const { publicId, accountType } = useAccountStore();
	const { setErrorToastMessage } = useToastMessageStore();
	const { isMobile } = useMobileStore();
	const { pageLoading, setTeacherAccount, setPageLoading, teacherAccount } =
		useDetailPageContext();

	const [isAnswerAuthority, setIsAnswerAuthority] = useState<boolean>(false);

	const handleError = useCallback(
		(message: string) => {
			setErrorToastMessage(message);
			router.push("/");
		},
		[setErrorToastMessage, router]
	);

	const getTeacherData = useCallback(async () => {
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
	}, [id, handleError, setTeacherAccount, setPageLoading]);

	useEffect(() => {
		const switchStart = Number(localStorage.getItem("QnaPage_start_time"));

		if (switchStart) {
			const switchEnd = Date.now();
			localStorage.removeItem("QnaPage_start_time");
		}
	}, []);

	useEffect(() => {
		if (!publicId) {
			handleError("로그인을 먼저 진행해주세요.");
			return;
		}

		scroll(0, 0);
		getTeacherData();
	}, [publicId, getTeacherData, handleError]);

	useEffect(() => {
		if (teacherAccount) {
			setIsAnswerAuthority(
				teacherAccount.public_id === publicId &&
					accountType === AccountType.MENTOR
			);
		}
	}, [teacherAccount]);

	return {
		isMobile,
		pageLoading,
		isAnswerAuthority,
	};
}
