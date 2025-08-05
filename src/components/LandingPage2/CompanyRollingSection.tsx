import { useEffect, useState } from "react";

type ApiImage = {
  id: number;
  url: string;
};

type ApiRes = ApiImage[]; // 배열 타입으로 변경

export function CompanyRollingSection() {
  const [apiRes, setApiRes] = useState<null | ApiRes>(null);

  // @todo: 추후 customAxios로 변경 필요
  const fetchData = async () => {
    try {
      const res = await fetch("https://api.poomasi.kr/tech-urls");
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
    <div className="w-full h-[348px] flex justify-center items-center overflow-hidden">
      <ul className="w-[1440px] h-[80px] flex flex-nowrap gap-[200px]">
        <li className="flex gap-[200px] h-[42px] items-center animate-rolling_1 whitespace-nowrap min-w-max">
          {apiRes?.map((apiImage) => (
            <span
              key={"original-" + apiImage.id}
              className="h-[42px] inline-block flex-shrink-0"
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <img
                src={apiImage.url}
                alt="회사 로고"
                style={{
                  height: "100%",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </span>
          ))}
        </li>
        <li className="flex gap-[200px] h-[42px] items-center animate-rolling_2 min-w-max">
          {apiRes?.map((apiImage) => (
            <span
              key={"clone-" + apiImage.id}
              className="h-[42px] inline-block flex-shrink-0"
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <img
                src={apiImage.url}
                alt="회사 로고"
                style={{
                  height: "100%",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </span>
          ))}
        </li>
      </ul>
    </div>
  );
}
