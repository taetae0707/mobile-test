import guide01 from "@images/landingPage/landing-guide01.png";
import guide02 from "@images/landingPage/landing-guide02.png";
import guide03 from "@images/landingPage/landing-guide03.png";
import type { StaticImageData } from "next/image";

//모바일 스와이프용
type SwiperModal = {
	title: string;
	type: "swiper";
	content: { image: StaticImageData; text: string }[];
};

//사진없는 텍스트용
type TextModal = {
	title: string;
	type: "text";
	content: string;
};

//웹용
// type WebInstructions = {
// 	title: string;
// 	type: "WebInstructions";
// 	content: { image: StaticImageData; text: string }[];
// };

type ModalType = SwiperModal | TextModal;

/*
Record<Keys, ValueType>
Keys: 문자열 리터럴 타입 집합
ValueType: 값의 타입
*/
export const modalData: Record<
	"MobileInstructions" | "Guideline" | "DetailGuide",
	ModalType
> = {
	// WebInstructions: {
	// 	title: "이용방법",
	// 	type: "WebInstructions",
	// 	content: [
	// 		{
	// 			image: guide01,
	// 			text: "1. 카카오톡으로 간편하게 로그인해요",
	// 		},
	// 		{
	// 			image: guide02,
	// 			text: "2. 관심 있는 분야의 품앗이꾼을 찾아요",
	// 		},
	// 		{
	// 			image: guide03,
	// 			text: "3. 도움이 필요한 내용을 자유롭게 질문해요",
	// 		},
	// 	],
	// },
	MobileInstructions: {
		title: "이용방법",
		type: "swiper",
		content: [
			{
				image: guide01,
				text: "1. 카카오톡으로 간편하게 로그인해요",
			},
			{
				image: guide02,
				text: "2. 관심 있는 분야의 품앗이꾼을 찾아요",
			},
			{
				image: guide03,
				text: "3. 도움이 필요한 내용을 자유롭게 질문해요",
			},
		],
	},
	Guideline: {
		title: "품앗이 규칙",
		type: "text",
		content:
			"품삯은 받고 있지 않아요. 대신 서로 돕고 마음을 나누는 따뜻한 공간이 될 수 있도록 과도한 질문은 자제 부탁드려요.",
	},
	DetailGuide: {
		title: "세부 안내",
		type: "text",
		content:
			"품앗이꾼은 빠르게 답변드리기 위해 노력하고 있어요. 다만 일정에 따라 답변이 조금 늦어질 수 있는 점, 너그럽게 양해 부탁드려요 :D",
	},
};
