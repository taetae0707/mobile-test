"use client";

import Image from "next/image";
import { CompanyParentResponse } from "@api/types/company.types";
import { useState } from "react";

interface CompanyInfoProps {
	company: CompanyParentResponse;
}

// SRP: 회사 정보 표시만 담당
export function CompanyInfo({ company }: CompanyInfoProps) {
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		setImageError(true);
	};

	return (
		<section className="flex flex-col gap-6 py-8">
			{/* 회사 로고 */}
			<figure className="relative w-16 h-16">
				{imageError ? (
					<div className="w-full h-full rounded-2xl bg-green-500 flex items-center justify-center">
						<span className="text-white text-2xl font-bold">
							{company.name.charAt(0)}
						</span>
					</div>
				) : (
					<Image
						src={company.logo_url}
						alt={`${company.name} 로고`}
						width={64}
						height={64}
						className="w-full h-full object-cover rounded-2xl"
						onError={handleImageError}
						priority
					/>
				)}
			</figure>

			{/* 회사 이름 */}
			<div className="flex flex-col gap-2">
				<h2 className="text-4xl font-bold text-gray-900">
					{company.name}
					{company.english_name && (
						<span className="font-bold ml-2">({company.english_name})</span>
					)}
				</h2>
			</div>

			{/* 회사 설명 */}
			{company.description && (
				<div className="max-w-3xl">
					<p className="text-base text-gray-900 leading-relaxed whitespace-pre-line">
						{company.description}
					</p>
				</div>
			)}
		</section>
	);
}
