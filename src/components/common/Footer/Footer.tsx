"use client";

import styled from "@emotion/styled";
import { getMobileVw } from "@utils/responsive";
import { colors } from "@styles/foundation/color";
import { useAccountStore, useAccountStoreData } from "@store/account";
import { requestForToken } from "@utils/fcm/firebase.ts";
import customAxios from "@api/customAxios.ts";

export function Footer() {
  const { setFcmToken } = useAccountStore();
  const { getAccountToken } = useAccountStoreData();

  const requestPermission = async () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          // FCM 토큰 요청
          requestForToken().then((token) => {
            if (token) {
              setFcmToken(token); // FCM 토큰 저장

              // 로그인 된 경우에만 서버에 토큰 전송
              if (getAccountToken()) {
                customAxios.patch("/accounts/device-token", {
                  device_token: token,
                });
              }
            }
          });
        }
      });
    } else {
      console.log("알림이 되지 않아요!");
    }
  };

  return (
    <FooterContainer>
      <FooterWrapper>
        <InquireText>
          <Mail href="mailto://poomasiofficial@gmail.com">
            poomasiofficial@gmail.com
          </Mail>
        </InquireText>
        <InquireText onClick={requestPermission}>
          Copyright ⓒ Poomasi. All Rights Reserved
        </InquireText>
      </FooterWrapper>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  width: 100%;
  margin-top: 60px;
  border-top: 1px solid #eaebed;

  @media (max-width: 1024px) {
    padding: 30px ${getMobileVw(20)};
    margin-top: 0;
  }
`;

const FooterWrapper = styled.div`
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${colors.gray600};

  @media (max-width: 1320px) {
    padding: 0 5%;
  }

  @media (max-width: 1024px) {
    font-size: 10px;
    flex-direction: column;
    gap: 12px;
    padding-left: 0;
    height: auto;
  }
`;

const InquireText = styled.div`
  color: ${colors.gray600};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  @media (max-width: 1024px) {
    font-size: 12px;
  }
`;

const Mail = styled.a`
  text-decoration: none;
  color: ${colors.gray600};

  &:hover {
    color: white;
    background-color: gray;
    transition: 0.5s ease;
  }
`;
