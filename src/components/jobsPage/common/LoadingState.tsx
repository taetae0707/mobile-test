interface LoadingStateProps {
	type: "loading" | "error" | "empty";
	message?: string;
}

export function LoadingState({ type, message }: LoadingStateProps) {
	if (type === "loading") {
		return (
			<section
				className="text-center py-12"
				aria-label="로딩 중">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
				<p className="text-gray-600">{message || "데이터를 불러오는 중..."}</p>
			</section>
		);
	}

	if (type === "error") {
		return (
			<section className="text-center py-12">
				<div className="text-red-500">
					<svg
						className="mx-auto h-12 w-12 text-red-400 mb-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<p className="text-lg font-medium text-red-900 mb-2">
						로딩에 실패했습니다
					</p>
					<p className="text-red-600">
						{message || "데이터를 불러올 수 없습니다."}
					</p>
				</div>
			</section>
		);
	}

	// type === 'empty'
	return (
		<section className="text-center py-12">
			<div className="text-gray-500">
				<svg
					className="mx-auto h-12 w-12 text-gray-400 mb-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
					/>
				</svg>
				<p className="text-lg font-medium text-gray-900 mb-2">
					데이터가 없습니다
				</p>
				<p className="text-gray-600">{message || "표시할 내용이 없습니다."}</p>
			</div>
		</section>
	);
}
