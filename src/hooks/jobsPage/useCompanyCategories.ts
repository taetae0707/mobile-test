"use client";

import { useState } from "react";
import { CompanyParentResponse } from "@api/types/company.types";
import { useCompaniesQuery } from "../queries/useCompaniesQuery";

// SRP: 모회사 카테고리 관련 로직만 담당
export function useCompanyCategories() {
	const [selectedCompany, setSelectedCompany] =
		useState<CompanyParentResponse | null>(null);

	const {
		data: companies = [],
		isLoading: loading,
		error: queryError,
	} = useCompaniesQuery();

	const error = queryError
		? queryError instanceof Error
			? queryError.message
			: "회사 목록을 불러오는데 실패했습니다."
		: null;

	const handleCompanySelect = (company: CompanyParentResponse | null) => {
		setSelectedCompany(company);
	};

	return {
		companies,
		loading,
		error,
		selectedCompany,
		handleCompanySelect,
	};
}
