"use client";

import { useMobileStore } from "@store/useMobileStore.ts";
import { IntroSection } from "@components/LandingPage2/IntroSection.tsx";
import { QuestionMoveSection } from "@components/LandingPage2/QuestionMoveSection.tsx";
import { HistorySection } from "@components/LandingPage2/HistorySection.tsx";
import { CompanyRollingSection } from "@components/LandingPage2/CompanyRollingSection.tsx";
import { UsingGuideSection } from "@components/LandingPage2/UsingGuideSection.tsx";
import { FaqSection } from "@components/LandingPage2/FaqSection.tsx";

export default function LandingPage() {
  const { isMobile } = useMobileStore();

  return (
    <div className="landingPageContainer">
      <IntroSection />
      <QuestionMoveSection />
      <HistorySection />
      <CompanyRollingSection />
      <UsingGuideSection />
      <FaqSection />
    </div>
  );
}
