export function UsingGuideSection() {
  const introCardDataList = [
    {
      index: 1,
      content: `카카오 계정으로 간단히 로그인하면\n서비스를 바로 이용할 수 있어요.`,
    },
    {
      index: 2,
      content: `관심있는 품앗이꾼을 찾아주세요.\n언제든지 멘토에게 질문할 수 있어요.`,
    },
    {
      index: 3,
      content: `도움이 필요한 내용을 자유롭게 질문하고,\n깊이 이야기하며 답을 찾아가요.`,
    },
  ];

  return (
    <div
      className="w-full overflow-hidden bg-white flex justify-center items-center
                     h-[1259px] max-xl:h-[845px] max-md:h[536px] max-sm:h-[540px]
    "
    >
      <div
        className={
          "h-full w-[1460px] max-xl:w-[1060px] max-md:w-[640px] max-sm:w-[340px] flex flex-col justify-center gap-[110px] max-sm:gap-[60px]"
        }
      >
        <p className="text-[50px] max-xl:text-[36px] max-md:text-[22px] max-sm:text-[24px] font-bold text-left text-black">
          <span className=" font-bold text-black">
            품앗이 이용방법,
            <br />
            어렵지 않아요!
          </span>
        </p>
        <div className={"w-full max-sm:overflow-auto"}>
          <div className={"inline-flex items-center max-sm:gap-[30px] w-auto"}>
            {introCardDataList.map((data) => (
              <UsingGuideCard
                key={data.index}
                index={data.index}
                content={data.content}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function UsingGuideCard({
  index,
  content,
}: {
  index: number;
  content: string;
}) {
  return (
    <div
      className="w-[470px] max-xl:w-[340px] max-md:w-[205px] max-sm:w-[225px]
                  h-[550px] max-xl:h-[400px] max-md:h-[265px] max-sm:h-[290px]
                   overflow-hidden rounded-[40px] bg-neutral-100 flex flex-col"
    >
      <div className="w-full h-[366px] bg-[#d9d9d9] text-[50px] font-bold text-left text-black flex justify-center items-center">
        TBD
      </div>
      <div
        className={"p-[28px] max-sm:pl-[12px] max-sm:pt-[16px] flex flex-col"}
      >
        <p className="text-[20px] max-xl:text-[16px] max-md:text-[12px] max-sm:text-[12px] font-bold text-left text-black">
          STEP 0{index}
        </p>
        <p className="text-[20px] max-xl:text-[17px] max-md:text-[14px] max-sm:text-[14px] text-left text-[#595959] whitespace-pre-line">
          {content}
        </p>
      </div>
    </div>
  );
}
