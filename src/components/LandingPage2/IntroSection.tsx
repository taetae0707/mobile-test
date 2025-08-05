import NextImage from "next/image";

export function IntroSection() {
  return (
    <section
      className={
        "w-full " +
        "h-[1080px] max-xl:h-[810px] max-md:h-[432px] max-sm:h-[812px] " +
        "flex justify-center items-center " +
        "relative z-0"
      }
    >
      <NextImage
        src="/images/typo+img.png"
        width={1025}
        height={902}
        alt={"품앗이 메인 이미지"}
        className={
          "h-[902px] max-xl:h-[676px] max-md:h-[370px] max-sm:h-[360px] " +
          "w-[1025px] max-xl:w-[769px] max-md:w-[370px] max-sm:w-[360px] "
        }
      />
      <NextImage
        src="/images/bottom-arrow.png"
        width={24}
        height={24}
        alt={"아래로 스크롤하는 화살표"}
        className={"absolute bottom-10"}
      />
    </section>
  );
}
