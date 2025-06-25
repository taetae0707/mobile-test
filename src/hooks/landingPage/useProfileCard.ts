"use client";

import { useRouter } from "next/navigation";
import { ProfileData } from "@types";
import { useState } from "react";
import { useAccountStore } from "@store/account";

export function useProfileCard() {
  const router = useRouter();
  const { accessToken } = useAccountStore((state) => state);

  const [selectedCardKey, setSelectedCardKey] = useState<
    "WebInstructions" | "MobileInstructions" | null
  >(null);

  const handleProfileClick = (profile: ProfileData) => {
    if (accessToken === null) {
      // setUseGuideModal(true);
      setSelectedCardKey("MobileInstructions");
      return;
    }
    // if (accessToken === null && !isMobile) {
    // 	setSelectedCardKey("WebInstructions");
    // 	return;
    // }

    if (accessToken !== null) {
      //질문페이지 이동 시작 시간 저장
      localStorage.setItem("QnaPage_start_time", String(Date.now()));
      router.push(`/${profile.nickname}`);
    }
  };

  return {
    handleProfileClick,
    // useGuideModal,
    // setUseGuideModal,
    selectedCardKey,
    setSelectedCardKey,
  };
}
