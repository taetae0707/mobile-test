import styled from "@emotion/styled";
import Image from "next/image";

type CloseButtonProps = {
  onClick: () => void;
  style?: React.CSSProperties;
};
// type CloseButtonProps = {
//   onClick: () => void
//   children?: React.ReactNode
// }

export const CloseButton = ({ onClick, style }: CloseButtonProps) => {
  return (
    <CloseBtn onClick={onClick} style={style}>
      <Image
        src={"/images/button-close.svg"}
        width={14}
        height={14}
        alt="닫기 버튼"
      />
    </CloseBtn>
  );
};

const CloseBtn = styled.button`
  width: 1rem;
  height: 1rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1024px) {
    width: 0.8rem;
    height: 0.8rem;
  }
`;
