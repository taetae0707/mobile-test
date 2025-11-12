import { useState } from "react";
import Image from "next/image";
import { JobSkill } from "@api/types/job.types";

interface SkillIconProps {
	skill: JobSkill;
	size?: "sm" | "md" | "lg";
}

export function SkillIcon({ skill, size = "md" }: SkillIconProps) {
	const [imageError, setImageError] = useState(false);

	const sizeClasses = {
		sm: "w-8 h-8",
		md: "w-10 h-10",
		lg: "w-12 h-12",
	};

	const imageSizes = {
		sm: { width: 24, height: 24, className: "w-6 h-6" },
		md: { width: 32, height: 32, className: "w-8 h-8" },
		lg: { width: 40, height: 40, className: "w-10 h-10" },
	};

	const textSizes = {
		sm: "text-xs",
		md: "text-xs",
		lg: "text-sm",
	};

	return (
		<div
			className={`flex items-center justify-center ${sizeClasses[size]} rounded-full border border-gray-200 bg-white`}>
			{skill.skill_logo && !imageError ? (
				<Image
					src={skill.skill_logo}
					alt={skill.skill_name}
					width={imageSizes[size].width}
					height={imageSizes[size].height}
					className={`${imageSizes[size].className} object-contain`}
					onError={() => setImageError(true)}
				/>
			) : (
				<span className={`text-gray-600 ${textSizes[size]} font-medium`}>
					{skill.skill_name.charAt(0).toUpperCase()}
				</span>
			)}
		</div>
	);
}
