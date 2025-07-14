import {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import { AccountResponse } from "api/types/account.types";

interface DetailPageProviderProps {
	teacherAccount: AccountResponse | null;
	setTeacherAccount: (accountRes: AccountResponse) => void;
	pageLoading: boolean;
	setPageLoading: (loading: boolean) => void;
	isQuestionListFetched: boolean;
	setIsQuestionListFetched: (isFetched: boolean) => void;
}

const DetailPageContext = createContext<DetailPageProviderProps>({
	teacherAccount: null,
	setTeacherAccount: () => {},
	pageLoading: false,
	setPageLoading: () => {},
	isQuestionListFetched: false,
	setIsQuestionListFetched: () => {},
});

// 실제 데이터를 만들고 관리하며, 감싸고 있는 모든 children에게 데이터를 공급해주는 역할
export function DetailPageContextProvider({ children }: PropsWithChildren) {
	const [teacherAccount, setTeacherAccount] = useState<AccountResponse | null>(
		null
	);
	const [pageLoading, setPageLoadingState] = useState<boolean>(false);
	const [isQuestionListFetched, setIsQuestionListFetched] =
		useState<boolean>(false);

	// 강제 리렌더링을 위한 카운터
	const [updateCounter, setUpdateCounter] = useState(0);

	// console.log(updateCounter);

	// 디버그용 세터 함수 개선
	const setPageLoading = useCallback((value: boolean) => {
		/*console.log("🔍 setPageLoading이 호출됨:", value, new Date().toISOString());*/
		setPageLoadingState(value);
		// 상태 업데이트 강제
		setUpdateCounter((prev) => prev + 1);
	}, []);

	const providerValue = useMemo(
		() => ({
			teacherAccount,
			setTeacherAccount,
			pageLoading,
			setPageLoading,
			isQuestionListFetched,
			setIsQuestionListFetched,
		}),
		[teacherAccount, pageLoading, isQuestionListFetched]
	);

	return (
		<DetailPageContext.Provider value={providerValue}>
			{children}
		</DetailPageContext.Provider>
	);
}

//context를 꺼내 쓰는 훅
export function useDetailPageContext() {
	//useContext: 특정 context에 접근해서 저장된 값을 꺼내오는 함수
	const context = useContext(DetailPageContext);
	if (context === undefined) {
		throw new Error(
			"useDetailPageContext 는 DetailPageContextProvider 안에서만 사용 가능합니다."
		);
	}
	return context;
}

/*
이 코드의 역할
-특정 페이지에서만 사용하는 데이터를 여러 컴포넌트가 함께 공유하기 위함

1. Prop Drilling 회피
- 만약 Context 없이 상태를 공유하려면, 부모 → 자식 → 손자 → 증손자… 형태로 계속 props를 내려줘야 해요.

- Context를 쓰면 <DetailPageContextProvider> 한 번 감싸 놓고, 내부 어디서든 useDetailPageContext() 훅만 호출해서 바로 상태를 읽거나 갱신할 수 있어요.


2. 컴포넌트 트리 상에서 데이터 공유

3. 데이터 변경 시 자동 리렌더링


*/
