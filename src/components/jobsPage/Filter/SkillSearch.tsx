"use client";

import { ChangeEvent } from "react";
import Image from "next/image";
import { SkillOption } from "@store/filters";

interface SkillSearchProps {
	searchQuery: string;
	filteredSkills: SkillOption[];
	selectedSkills: number[];
	onSearchChange: (query: string) => void;
	onSkillToggle: (skillId: number) => void;
	onClearSearch: () => void;
}

export function SkillSearch({
	searchQuery,
	filteredSkills,
	selectedSkills,
	onSearchChange,
	onSkillToggle,
	onClearSearch,
}: SkillSearchProps) {
	// 검색 입력 핸들러
	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;
		onSearchChange(query);
	};

	// 스킬 선택 핸들러 (ID 기반)
	const handleSkillClick = (skill: SkillOption) => {
		onSkillToggle(skill.skill_id);
	};

	// 스킬 선택 여부 확인
	const isSkillSelected = (skillId: number) => {
		return selectedSkills.includes(skillId);
	};

	return (
		<div className="mb-8">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-medium text-gray-900">기술스택</h3>
				<span className="text-sm text-gray-500">중복 선택 가능</span>
			</div>

			{/* 검색 입력창 */}
			<div className="mb-4 relative">
				<input
					type="text"
					value={searchQuery}
					onChange={handleSearchChange}
					placeholder="기술 스택을 입력하세요"
					className="w-full px-4 py-2 pr-20 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
				/>

				{/* 검색 아이콘과 X 버튼 */}
				<div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
					{/* 검색 아이콘 */}
					<button
						type="button"
						onClick={() => onSearchChange(searchQuery)} // 현재 검색어로 다시 검색
						className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</button>
				</div>
			</div>

			{/* 검색 결과 */}
			{searchQuery && (
				<div className="flex flex-wrap gap-2 items-center">
					{filteredSkills.length > 0 ? (
						<>
							{filteredSkills.map((skill) => (
								<button
									key={skill.skill_id}
									onClick={() => handleSkillClick(skill)}
									className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
										isSkillSelected(skill.skill_id)
											? "bg-blue-50 text-blue-700 border-blue-300"
											: "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
									}`}>
									{skill.logo_url && (
										<div className="w-6 h-6 relative flex-shrink-0">
											<Image
												src={skill.logo_url}
												alt={skill.skill_name}
												width={24}
												height={24}
												className="object-contain"
												onError={(e) => {
													console.error(
														`이미지 로드 실패: ${skill.skill_name}`
													);
												}}
											/>
										</div>
									)}
									<span>{skill.skill_name}</span>
								</button>
							))}

							{/* X 버튼 - 검색 결과 옆에 위치 */}
							<button
								type="button"
								onClick={onClearSearch}
								className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors">
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
								<span>초기화</span>
							</button>
						</>
					) : (
						<div className="text-sm text-gray-500 py-4">
							"{searchQuery}"에 대한 검색 결과가 없습니다.
						</div>
					)}
				</div>
			)}

			{/* 선택된 스킬들 표시 */}
			{/* 
				{selectedSkills.length > 0 && (
					<div className="mt-4 pt-4 border-t border-gray-200">
						<div className="text-sm font-medium text-gray-700 mb-2">
							선택된 기술스택 ({selectedSkills.length}개)
						</div>
						<div className="flex flex-wrap gap-2">
							
							{selectedSkills.map((skillId) => {
								// 여기서는 부모 컴포넌트에서 선택된 스킬 정보를 전달받아야 함
								return (
									<div
										key={skillId}
										className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
										선택된 스킬 ID: {skillId}
									</div>
								);
							})}
						</div>
					</div>
				)}	
			*/}
		</div>
	);
}
