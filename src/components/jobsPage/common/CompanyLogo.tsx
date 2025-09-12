import { useState } from "react";
import Image from "next/image";

interface CompanyLogoProps {
	logoUrl: string;
	companyName: string;
	size?: "sm" | "md" | "lg";
}

export function CompanyLogo({
	logoUrl,
	companyName,
	size = "md",
}: CompanyLogoProps) {
	const [imageError, setImageError] = useState(false);

	const sizeClasses = {
		sm: "w-12 h-12",
		md: "w-16 h-16",
		lg: "w-20 h-20",
	};

	const textSizes = {
		sm: "text-lg",
		md: "text-xl",
		lg: "text-2xl",
	};

	const imageSizes = {
		sm: 48,
		md: 64,
		lg: 80,
	};

	return (
		<div className="flex-shrink-0">
			<div
				className={`${sizeClasses[size]} rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center`}>
				{logoUrl && !imageError ? (
					<Image
						src={logoUrl}
						alt={`${companyName} 로고`}
						width={imageSizes[size]}
						height={imageSizes[size]}
						className="w-full h-full object-cover"
						onError={() => setImageError(true)}
					/>
				) : (
					<span
						className={`text-white ${textSizes[size]} font-bold bg-green-500 w-full h-full flex items-center justify-center`}>
						{companyName?.charAt(0) || "N"}
					</span>
				)}
			</div>
		</div>
	);
}
