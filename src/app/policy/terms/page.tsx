"use client";

import { useState } from "react";
import { PolicyHeader } from "@app/policy/header";
import { Version250721 } from "@app/policy/terms/versions";
import styled from "@emotion/styled";

const dateList = ["2025.07.21"];

export default function TermsPolicyPage() {
  const [dateListIndex, setDateListIndex]: [number, Function] =
    useState<number>(0);

  return (
    <Container>
      <PolicyHeader
        title="서비스 이용약관"
        titleHighlightColor="#FFDBDB"
        dateList={dateList}
        dateListIndex={dateListIndex}
        setDateListIndex={setDateListIndex}
      />
      {
        {
          "2025.07.21": <Version250721 />,
        }[dateList[dateListIndex]]
      }
    </Container>
  );
}

const Container = styled.div`
  width: 1024px;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 5% 40px;
`;
