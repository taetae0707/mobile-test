"use client";

import { useRef } from "react";
import Button from "@mui/material/Button";
import type { SxProps } from "@mui/system";
import type { Theme } from "@mui/material/styles";

interface DebouncedButtonProps {
	className?: string;
	text: string;
	onClick: () => Promise<void>;
	variant?: string;
	sx?: SxProps<Theme>;
	disabled?: boolean; //
}

// 디바운스 로직을 별도의 훅으로 분리 (SRP 적용)
function useDebouncedAsyncCallback(
	callback: () => Promise<void>,
	delay: number = 500
) {
	const isPendingRef = useRef(false);

	const debouncedCallback = async () => {
		if (isPendingRef.current) return;
		isPendingRef.current = true;
		try {
			await callback();
		} finally {
			setTimeout(() => {
				isPendingRef.current = false;
			}, delay);
		}
	};

	return debouncedCallback;
}

export const DebouncedButton = ({
	className,
	text,
	onClick,
	variant,
	sx,
	disabled,
}: DebouncedButtonProps) => {
	// 디바운스 훅 사용
	const handleButtonClick = useDebouncedAsyncCallback(onClick, 500);

	return (
		<Button
			className={className}
			variant={variant as "text" | "outlined" | "contained"}
			sx={sx}
			disabled={disabled}
			onClick={handleButtonClick}>
			{text}
		</Button>
	);
};
