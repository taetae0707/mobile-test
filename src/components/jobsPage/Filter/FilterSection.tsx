"use client";

interface FilterSectionProps {
	title: string;
	options: Array<{ id: string | number; name: string }>;
	selectedItems: (string | number)[];
	onToggle: (item: string | number, itemName?: string) => void;
}

export function FilterSection({
	title,
	options,
	selectedItems,
	onToggle,
}: FilterSectionProps) {
	return (
		<div className="mb-8">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-medium text-gray-900">{title}</h3>
				<span className="text-sm text-gray-500">중복 선택 가능</span>
			</div>
			<div className="flex flex-wrap gap-2">
				{options.map((option) => {
					// 직군선택일 경우 ID로 비교, 그 외에는 이름으로 비교
					const isSelected =
						title === "직군선택"
							? selectedItems.includes(option.id)
							: selectedItems.includes(option.name);

					return (
						<button
							key={option.id}
							onClick={() =>
								title === "직군선택"
									? onToggle(option.id, option.name)
									: onToggle(option.name)
							}
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
