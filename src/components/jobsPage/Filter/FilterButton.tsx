"use client";

import Image from "next/image";

interface FilterButtonProps {
	title: string;
	options: Array<{ id: string | number; name: string; logo_url?: string }>;
	selectedItems: (string | number)[];
	onToggle: (item: string | number, itemName?: string) => void;
	showSelectAllOption?: boolean;
}

export function FilterButton({
	title,
	options,
	selectedItems,
	onToggle,
	showSelectAllOption = false,
}: FilterButtonProps) {
	const isPositionType = title === "직군선택";
	const isSkillType = title === "인기스택";

	//전체 선택인지 확인
	const isAllSelected =
		options.length > 0 && selectedItems.length === options.length;

	//어떤 옵션이 선택되었는지 확인하는 함수: true or false 반환
	//화면에 어떻게 보일지를 결정
	const isFilterSelected = (option: {
		id: string | number;
		name: string;
		logo_url?: string;
	}) => {
		if (option.id === "all") return isAllSelected;
		return isPositionType
			? selectedItems.includes(option.id) //직군선택일 경우 ID로 비교
			: selectedItems.includes(option.name); //그 외에는 이름으로 비교
	};

	//필터 클릭 시, onToggle실행하는 함수
	//클릭한 필터의 속성을 onToggle로 전달하면 -> toggleCompany 등 함수 실행(useFilterStore의 함수)
	const handleFilterClick = (option: {
		id: string | number;
		name: string;
		logo_url?: string;
	}) => {
		if (isPositionType || isSkillType) {
			onToggle(option.id, option.name);
		} else {
			onToggle(option.name);
		}
	};

	// '전체'필터 선택/해제 핸들러
	const handleSelectAll = () => {
		if (isAllSelected) {
			// 모든 옵션 해제
			options.forEach((opt) => handleFilterClick(opt));
		} else {
			// 모든 옵션 선택
			options.forEach((opt) => {
				const isSelected = isPositionType
					? selectedItems.includes(opt.id) //id로 선택한 필터목록에 있는지 확인
					: selectedItems.includes(opt.name); //name으로 ..

				//
				if (!isSelected) handleFilterClick(opt); //모든 옵션 선택
			});
		}
	};

	// 옵션 클릭 핸들러
	const handleClick = (option: {
		id: string | number;
		name: string;
		logo_url?: string;
	}) => {
		if (option.id === "all") {
			handleSelectAll();
		} else {
			handleFilterClick(option);
		}
	};

	// "전체" 옵션을 맨 앞에 추가
	const allOptions = showSelectAllOption
		? [{ id: "all", name: "전체" }, ...options]
		: options;

	return (
		<div className="mb-8">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-medium text-gray-900">{title}</h3>
				<span className="text-sm text-gray-500">중복 선택 가능</span>
			</div>
			<div className="flex flex-wrap gap-2">
				{allOptions.map((option) => (
					<button
						key={option.id}
						onClick={() => handleClick(option)}
						className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
							isFilterSelected(option)
								? "bg-blue-50 text-blue-700 border-blue-300"
								: "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
						}`}>
						{option.logo_url && (
							<div className="w-6 h-6 relative flex-shrink-0">
								<Image
									src={option.logo_url}
									alt={option.name}
									width={24}
									height={24}
									className="object-contain"
									onError={(e) => {
										console.error(`이미지 로드 실패: ${option.name}`);
									}}
								/>
							</div>
						)}
						<span>{option.name}</span>
					</button>
				))}
			</div>
		</div>
	);
}
