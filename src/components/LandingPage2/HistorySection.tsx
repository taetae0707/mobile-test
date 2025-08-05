import { useEffect, useState } from "react";

//@todo 추후 타입 리팩토링 필요
type ApiRes = {
  mentor: number;
  mentor_field: number;
  normal: number;
  qna: number;
};

export function HistorySection() {
  const [apiRes, setApiRes] = useState<null | ApiRes>(null);

  // @todo: 추후 customAxios로 변경 필요
  const fetchData = async () => {
    try {
      const res = await fetch("https://api.poomasi.kr/activity-stats");

      const data: { data: ApiRes } = await res.json();
      setApiRes(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className="w-full bg-[#fcfcfc] flex justify-center items-center flex-col gap-[200px]
                    h-[985px] max-xl:h-[745px] max-md:h-[445px] max-sm:h-[622px]
                    pr-[228px] max-xl:pr-[190px] max-md:pr-[64px]
                    pl-[228px] max-xl:pl-[190px] max-md:pl-[64px]
                    max-sm:gap-[150px] max-sm:pl-[24px] max-sm:pr-[20px]
    "
    >
      <div
        className={
          "flex justify-between w-full max-sm:flex-col max-sm:gap-[20px]"
        }
      >
        <p
          className={
            "text-[50px] max-xl:text-[36px] max-md:text-[22px] max-sm:text-[24px] font-bold text-left text-black " +
            "w-[574px] max-sm:w-full"
          }
        >
          경험을 나누고, 함께 성장하는
          <br />
          우리는 품앗이에요.
        </p>
        <p className="w-[707px] max-xl:w-[443px] max-md:w-[347px] max-sm:w-full text-[24px] max-xl:text-[20px] max-md:text-[16px] max-sm:text-[16px] text-left text-[#595959]">
          “누구에게나 배울 점이 있다”라는 생각으로 시작했어요.조금 앞서 걸어간
          선배들과 그 뒤를 따라 걷게 될 후배들 모두 품앗이를 통해 연결될 수
          있기를 바라요.
        </p>
      </div>
      <div
        className="w-full h-[202px] max-xl:h-[145px] max-md:h-[90px] flex justify-between
                      max-sm:grid max-sm:grid-cols-2 max-sm:h-auto
      "
      >
        <HistoryCount count={apiRes?.mentor ?? 0} addText={"번의 품을"} />
        <HistoryCount
          count={apiRes?.mentor_field ?? 0}
          addText={"명의 새싹님들과"}
        />
        <HistoryCount count={apiRes?.normal ?? 0} addText={"개의 분야에서"} />
        <HistoryCount count={apiRes?.qna ?? 0} addText={"명의 품앗이꾼과"} />
      </div>
    </div>
  );
}

function HistoryCount({ count, addText }: { count: number; addText: string }) {
  return (
    <div>
      <p className="text-[136px] max-xl:text-[94px] max-md:text-[48px] font-medium text-center text-black">
        {count}+
      </p>
      <p className="text-[24px] max-xl:text-[20px] max-md:text-[16px] text-center text-[#595959]">
        {count + addText}
      </p>
    </div>
  );
}
