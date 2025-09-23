"use client";

interface FilterButtonProps {
	title: string;
	options: Array<{ id: string | number; name: string }>;
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
	// 전체 선택 상태 확인
	const isAllSelected =
		options.length > 0 && selectedItems.length === options.length;

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
				{allOptions.map((option) => {
					// "전체" 옵션의 선택 상태는 모든 옵션이 선택되었는지로 판단
					const isSelected =
						option.id === "all"
							? isAllSelected
							: title === "직군선택"
								? selectedItems.includes(option.id)
								: selectedItems.includes(option.name);

					return (
						<button
							key={option.id}
							onClick={() => {
								if (option.id === "all") {
									// "전체" 클릭 시 모든 옵션 선택/해제 토글
									if (isAllSelected) {
										// 모든 옵션 해제
										options.forEach((opt) => {
											if (title === "직군선택") {
												onToggle(opt.id, opt.name);
											} else {
												onToggle(opt.name);
											}
										});
									} else {
										// 모든 옵션 선택
										options.forEach((opt) => {
											if (title === "직군선택") {
												if (!selectedItems.includes(opt.id)) {
													onToggle(opt.id, opt.name);
												}
											} else {
												if (!selectedItems.includes(opt.name)) {
													onToggle(opt.name);
												}
											}
										});
									}
								} else {
									// 일반 옵션 클릭
									if (title === "직군선택") {
										onToggle(option.id, option.name);
									} else {
										onToggle(option.name);
									}
								}
							}}
							className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
								isSelected
									? "bg-blue-50 text-blue-700 border-blue-300"
									: "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
							}`}>
							{option.name}
						</button>
					);
				})}
			</div>
		</div>
	);
}
