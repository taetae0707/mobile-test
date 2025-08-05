import NextImage from "next/image";

export function QuestionMoveSection() {
  return (
    <div
      className={
        "w-full bg-white flex justify-center items-center flex-col gap-[30px] " +
        "h-[471px] max-xl:h-[350px] max-md:h-[206px] max-sm:h-[170px] "
      }
    >
      <p
        className={
          "font-bold text-left " +
          "text-[40px] max-md:text-[20px] max-sm:text-[16px]"
        }
      >
        <span className="font-bold text-[#bfbfbf]">인사이트가 필요 할땐</span>
        <span className="font-bold text-black"> 품앗이에서.</span>
      </p>
      <div className="flex justify-center items-center gap-4 px-6 py-3.5 rounded-[33px] bg-white border-black border-[1px]">
        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-3">
          <p
            className={
              "flex-grow-0 flex-shrink-0 font-bold text-left text-black " +
              "text-[20px] max-md:text-[14px] max-sm:text-[14px]"
            }
          >
            질문하기
          </p>
          <NextImage
            src="/images/top-arrow.png"
            width={20}
            height={20}
            alt={"아래로 스크롤하는 화살표"}
            className={
              "w-[20px] max-md:w-[8px] max-sm:w-[12px] " +
              "h-[20px] max-md:h-[8px] max-sm:h-[12px]"
            }
          />
        </div>
      </div>
    </div>
  );
}
