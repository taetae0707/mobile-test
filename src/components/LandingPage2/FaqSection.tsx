import NextImage from "next/image";
import { useState } from "react";

export function FaqSection() {
  const FaqList = [
    {
      question: "누구나 질문할 수 있나요?",
      answer:
        "연령, 직업 상관없이 고민이 있고 경험을 나누고 싶은 누구나 품앗이 서비스를 자유롭게 이용할 수 있어요.",
    },
    {
      question: "질문은 어떻게 하면 되나요?",
      answer:
        "품앗이 서비스에 접속하여 질문을 작성하고 제출하면 됩니다. 질문은 자유롭게 작성할 수 있으며, 다른 사용자들이 답변을 달아줄 것입니다.",
    },
    {
      question: "질문은 무료인가요?",
      answer: "네, 품앗이 서비스에서 질문하는 것은 무료입니다.",
    },
    {
      question: "품앗이꾼으로 활동하고 싶어요.",
      answer:
        "품앗이꾼으로 활동하고 싶다면, 품앗이 서비스에 가입하고 프로필을 작성한 후, 다른 사용자들의 질문에 답변을 달아주시면 됩니다.",
    },
  ];

  return (
    <div
      className="w-full overflow-hidden bg-[#fcfcfc] flex justify-between items-center
                  pl-[230px] max-xl:pl-[150px] max-md:pl-[64px] max-sm:pl-[20px]
                  pr-[80px] max-xl:pr-[60px] max-md:pr-[60px] max-sm:pr-[24px]
                  h-[994px] max-xl:h-[693px] max-md:h[465px] max-sm:h-[558px]
                  "
    >
      <div
        className={
          "flex justify-between items-center w-full max-sm:flex-col max-sm:items-start max-sm:gap-[40px]"
        }
      >
        <p className="text-[50px] max-xl:text-[36px] max-md:text-[22px] max-sm:text-[24px] font-bold text-left text-black self-start">
          품앗이 FAQ
        </p>
        <div className="flex flex-col justify-start items-start w-[1039px] max-xl:w-[760px] max-md:w-[420px] max-sm:w-[327px] gap-[40px]">
          {FaqList.map((faq, index) => (
            <FaqCard key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FaqCard({ question, answer }: { question: string; answer: string }) {
  const [isOpenSummary, setIsOpenSummary] = useState<boolean>(false);

  return (
    <div
      className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-3 border-b-[1px] border-[#D9D9D9] pb-[15px]"
      onClick={() => setIsOpenSummary((prev) => !prev)}
    >
      <div className="flex justify-between items-center">
        <p
          className="flex-grow-0 flex-shrink-0 font-bold text-left text-black
                      w-[985px] max-xl:w-[720px] max-md:w-[364px] max-sm:w-[300px]
                      text-[24px] max-xl:text-[20px] max-md:text-[16px] max-sm:text-[18px]"
        >
          {question}
        </p>
        <NextImage
          src={
            isOpenSummary ? "/images/plus-icon.png" : "/images/minus-icon.png"
          }
          alt={"FAQ 요약 열기 / 닫기"}
          width={24}
          height={24}
          className="flex-grow-0 flex-shrink-0 w-6 h-6"
        />
      </div>
      <div
        className={`self-stretch flex-grow-0 flex-shrink-0 w-[1039px] text-2xl text-left text-[#595959] overflow-hidden transition-[max-height] duration-300 ease-in-out 
        ${isOpenSummary ? "max-h-[500px]" : "max-h-0"}
        w-[1039px] max-xl:w-[760px] max-md:w-[420px] max-sm:w-[327px]
        text-[24px] max-xl:text-[20px] max-md:text-[16px] max-sm:text-[18px]
        `}
      >
        <p className="p-2">{answer}</p>
      </div>
    </div>
  );
}
