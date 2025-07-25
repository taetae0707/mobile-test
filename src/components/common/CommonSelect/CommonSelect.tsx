"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styled from "@emotion/styled";
import { colors } from "@styles/foundation/color.ts";
import Image from "next/image";
// import {CAREER_YEAR_OPTIONS} from 'api/enums'

type CommonSelectProps = {
	title: string; //셀렉트 박스의 제목
	value: string; //현재 선택된 값
	options: { value: string; label: string }[];
	onChange: (value: string) => void;
};

export function CommonSelect({
	title,
	value,
	options,
	onChange,
}: CommonSelectProps) {
	const [isSelectShow, setIsSelectShow] = useState(false);
	const selectRef = useRef<HTMLDivElement>(null);
	const optionValue = useMemo(
		() => options.find((option) => option.value === value)?.label ?? "",
		[value]
	);
	//앞의 결과가 null 또는 undefined면, 대신에 빈 문자열 ''을 써라

	const handleValueClick = () => {
		setIsSelectShow((prev) => !prev);
	};

	const handleOptionValueClick = (value: string) => {
		onChange(value);
		setIsSelectShow(false);
	};

	useEffect(() => {
		// 외부 클릭 감지를 위한 이벤트 핸들러: 드롭다운 메뉴 바깥을 클릭했을 때 메뉴를 닫기 위해
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setIsSelectShow(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		// 컴포넌트 언마운트 시 이벤트 리스너 제거
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [selectRef]);

	return (
		<CustomSelectTitleContainer>
			<CommonSelectTitle>{title}</CommonSelectTitle>
			<CustomSelectContainer ref={selectRef}>
				<CustomSelectValue onClick={handleValueClick}>
					<span>{optionValue}</span>
					<Image
						src={"/images/icon-select-dropdown.svg"}
						alt={"dropdown"}
						width={14}
						height={10}
					/>
				</CustomSelectValue>
				{isSelectShow && (
					<CustomSelectOptions>
						{options.map((option) => (
							<li
								key={option.value}
								onClick={() => handleOptionValueClick(option.value)}>
								{option.label}
							</li>
						))}
					</CustomSelectOptions>
				)}
			</CustomSelectContainer>
		</CustomSelectTitleContainer>
	);
}

const CustomSelectTitleContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;

	border-radius: 100px;
	border: 1px solid #c5c8cd;
	background: #fff;

	padding: 10px 16px;

	@media (max-width: 1024px) {
		padding: 4px 8px;
		gap: 6px;
	}
`;

const CommonSelectTitle = styled.label`
	font-weight: bold;
	font-size: 16px;
	color: ${colors.gray800};
	white-space: nowrap;
	cursor: pointer; // 커서 포인터 추가

	@media (max-width: 1024px) {
		font-size: 0.75rem;
		margin-left: 5px;
	}
`;

const CustomSelectContainer = styled.div`
	position: relative;
`;

const CustomSelectValue = styled.div`
	display: flex;
	align-items: center;
	padding: 8px;
	border-radius: 4px;
	cursor: pointer;
	width: 100%;
	gap: 12px;

	color: #3ecdba;
	font-size: 16px;
	font-weight: 600;
	line-height: 150%;

	img {
		width: 14px;
		height: 10px;
	}

	@media (max-width: 1024px) {
		gap: 8px;
		font-size: 0.75rem;
	}
`;

const CustomSelectOptions = styled.ul`
	position: absolute;
	top: 100%;
	right: 0;
	background-color: white;
	border: 1px solid #ccc;
	border-radius: 20px;
	list-style-type: none;
	min-width: 100%; // 최소 너비는 부모 요소와 동일
	width: max-content; // 내용물에 맞게 확장
	z-index: 10; // 다른 요소 위에 표시되도록 설정

	li {
		padding: 10px 20px;
		white-space: nowrap; // 텍스트 줄바꿈 방지
		cursor: pointer;
	}
`;
