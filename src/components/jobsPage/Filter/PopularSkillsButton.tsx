"use client";

import React from "react";
import Image from "next/image";

import {
	POPULAR_SKILLS_CONFIG,
	PopularSkillConfig,
} from "@constants/popularSkills";

interface PopularSkillsButtonProps {
	title: string;
	skills: PopularSkillConfig[];
	selectedSkills: number[];
	onToggle: (skillId: number) => void;
}

export function PopularSkillsButton({
	title,
	skills,
	selectedSkills,
	onToggle,
}: PopularSkillsButtonProps) {
	return (
		<div className="mb-8">
			<div className="flex items-center justify-between gap-4 mb-4">
				<h3 className="text-lg font-medium text-gray-900">{title}</h3>
				<span className="text-sm text-gray-500">중복 선택 가능</span>
			</div>
			<div className="grid grid-cols-5 gap-3">
				{skills.map((skill) => {
					const isSelected = selectedSkills.includes(skill.skill_id);

					return (
						<button
							key={skill.skill_id}
							onClick={() => onToggle(skill.skill_id)}
							className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg border transition-colors ${
								isSelected
									? "bg-blue-50 text-blue-700 border-blue-300"
									: "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
							}`}>
							<div className="w-6 h-6 relative flex-shrink-0">
								<Image
									src={skill.logo_url}
									alt={skill.displayName}
									width={24}
									height={24}
									className="object-contain"
									onError={(e) => {
										console.error(`이미지 로드 실패: ${skill.displayName}`);
									}}
								/>
							</div>
							<span>{skill.displayName}</span>
						</button>
					);
				})}
			</div>
		</div>
	);
}
