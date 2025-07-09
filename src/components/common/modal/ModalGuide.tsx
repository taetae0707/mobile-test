import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import ModalReference from "@components/common/modal/ModalReference.tsx";
import { modalData } from "@components/common/modal/modalGuide-data";
import NextImage from "next/image";
import { useEffect } from "react";

// dynamic import (SSR 비활성화)
const SlickSlider = dynamic(
  () => import("react-slick").then((mod) => mod.default),
  {
    ssr: false,
  },
);

type GuideModalProps = {
  type: keyof typeof modalData; //MobileInstructions 등등
  onClose: () => void;
};

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

export function ModalGuide({ onClose, type }: GuideModalProps) {
  useEffect(() => {
    // 모달이 열릴 때
    document.body.style.overflow = "hidden";
    return () => {
      // 모달이 닫힐 때
      document.body.style.overflow = "auto";
    };
  }, []);
  //swiper 등등
  const modal = modalData[type];
  /*console.log("modal.type:", modal.type);
  console.log("modal:", modal);*/

  // console.log("🔥 모달 타입 확인:", modal.type);

  // Swiper가 실제로 mount된 후 update를 보장

  // 모바일: 스와이프
  if (modal.type === "swiper") {
    return (
      <ModalReference onClick={onClose}>
        <ModalReference.Header onClickClose={onClose} />
        <ModalReference.Body>
          <BodyPadding>
            <ModalTitle>{modal.title}</ModalTitle>
            <div style={{ width: 320, height: 320, margin: "0 auto" }}>
              <SlickSlider {...sliderSettings}>
                {Array.isArray(modal.content) &&
                  modal.content.map((item, i) => (
                    <div key={i}>
                      <Slide>
                        <NextImage
                          src={item.image}
                          alt={`guide-step-${i + 1}`}
                          width={240}
                          height={180}
                          style={{
                            width: "100%",
                            height: "180px",
                            objectFit: "contain",
                            borderRadius: "16px",
                          }}
                        />
                        <Text>{item.text}</Text>
                      </Slide>
                    </div>
                  ))}
              </SlickSlider>
            </div>
          </BodyPadding>
        </ModalReference.Body>
      </ModalReference>
    );
  }

  return (
    <ModalReference onClick={onClose}>
      <ModalReference.Header onClickClose={onClose} />
      <ModalReference.Body>
        <BodyPadding>
          <ModalTitle>{modal.title}</ModalTitle>
          <GuideInfoText>{modal.content}</GuideInfoText>
        </BodyPadding>
      </ModalReference.Body>
    </ModalReference>
  );
  return null;
}

const ModalTitle = styled.h4`
  color: #0e0e0e;
  text-align: center;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 54px */
  margin-bottom: 16px;
  @media (max-width: 1024px) {
    font-size: 1.125rem;
    font-weight: 700;
    text-align: center;
    padding: 5px;
  }
`;

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  gap: 1rem;
  background: transparent;
`;

const Text = styled.p`
  font-size: 16px;
  text-align: center;
  line-height: 1.5;
  color: #28292a;

  @media (max-width: 1024px) {
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }
`;

const GuideInfoText = styled.div`
  font-size: 1.375rem;
  text-align: center;
  color: #333;
  padding: 2rem;
  border-radius: 16px;
  background: #f7f7f7;
  @media (max-width: 1024px) {
    font-size: 12px;
  }
`;

const BodyPadding = styled.div`
  padding: 1rem 2rem;
  height: 100%;
  box-sizing: border-box;
`;
