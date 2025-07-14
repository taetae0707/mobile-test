import * as React from "react";
import { useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useToastMessageStore } from "@toast";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
	function Alert(props, ref) {
		return (
			<MuiAlert
				elevation={6}
				ref={ref}
				variant="filled"
				{...props}
			/>
		);
	}
);

export function Toast() {
	const {
		errorToastMessage,
		successToastMessage,
		removeErrorToastMessage,
		removeSuccessToastMessage,
	} = useToastMessageStore((state) => state);

	// 3초 후에 자동으로 토스트 메시지 닫기
	useEffect(() => {
		const timer = setTimeout(() => {
			removeErrorToastMessage();
		}, 3000);

		return () => {
			clearTimeout(timer);
		};
	}, [errorToastMessage]);

	// 3초 후에 자동으로 토스트 메시지 닫기
	useEffect(() => {
		const timer = setTimeout(() => {
			removeSuccessToastMessage();
		}, 3000);

		return () => {
			clearTimeout(timer);
		};
	}, [successToastMessage]);

	return (
		<>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={errorToastMessage !== ""}
				autoHideDuration={3000}
				onClick={removeErrorToastMessage}>
				<Alert
					onClose={removeErrorToastMessage}
					severity="error"
					sx={{ marginBottom: "30px" }}>
					{errorToastMessage}
				</Alert>
			</Snackbar>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={successToastMessage !== ""}
				autoHideDuration={3000}
				onClick={removeSuccessToastMessage}>
				<Alert
					onClose={removeSuccessToastMessage}
					severity="success"
					sx={{ marginBottom: "30px" }}>
					{successToastMessage}
				</Alert>
			</Snackbar>
		</>
	);
}
