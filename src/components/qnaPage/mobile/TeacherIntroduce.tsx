import styled from "@emotion/styled";
import { useDetailPageContext } from "@hooks/qnaPage/provider/DetailPageProvider";

import { EditPencilButton } from "@components/Common/button/editButton/EditPencilButton";
import { useEditAuthority, useMentoProfileEdit } from "@hooks/qnaPage";
import { MentoDescriptionArea } from "@qnaPage/web/MentoDescriptionArea.tsx";

export function TeacherIntroduce() {
  const { teacherAccount } = useDetailPageContext();
  const { isAuthority } = useEditAuthority();

  const { isEditing, editedText, loading, handleEditClick, handleTextChange } =
    useMentoProfileEdit(
      teacherAccount?.description || "" /* onUpdateRequest 콜백 함수 */,
    );

  return (
    <>
      <Header>
        <ProfilePictureWrapper>
          <ProfileImage
            src={teacherAccount?.profile_image}
            alt={"profile-image"}
          />
        </ProfilePictureWrapper>

        <HeaderBody>
          <ProfileSection className="ProfileSection-fisrt">
            <HeaderName>{teacherAccount?.name}</HeaderName>
            <HeaderField>{teacherAccount?.field}</HeaderField>
          </ProfileSection>
          <HeaderJob className="ProfileSection-second">
            {"現 " + teacherAccount?.company1 + " " + teacherAccount?.job1}
          </HeaderJob>
        </HeaderBody>
      </Header>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            marginTop: "30px",
            fontWeight: "700",
            fontSize: "1.1rem",
            color: "#0E0E0E",
            lineHeight: "150%",
          }}
        >
          품앗이꾼 소개
        </div>
        {isAuthority && (
          <EditPencilButton
            isEditing={isEditing}
            onClick={handleEditClick}
            loading={loading}
          />
        )}
      </div>
      {/* <Description readOnly value={teacherAccount?.description} /> */}
      <MentoDescriptionArea
        value={editedText}
        isEditing={isEditing}
        onChange={handleTextChange}
      />
    </>
  );
}

const Header = styled.div`
  width: 100%;
  display: flex;
  /* background-color: green; */

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    border-bottom: 1px solid #eaebed;
    border-top: 1px solid #eaebed;
    padding: 2.5rem;
    padding-bottom: 24px;
    padding-top: 24px;
  }
`;

const ProfilePictureWrapper = styled.div`
  display: flex;

  width: 140px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;

  @media (max-width: 1024px) {
    width: 90px;
    height: auto;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const ProfileSection = styled.div`
  display: flex;
  align-items: flex-end;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.125rem;
    gap: 0.6rem;
  }
`;

const HeaderBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-left: 30px;
  padding-top: 40px;
  /* background-color: blue; */

  @media (max-width: 1024px) {
    padding-top: 10px;
    margin-left: 0;
    align-items: center;
    gap: 10px;
  }
`;
const HeaderName = styled.div`
  font-weight: bold;
  font-size: 40px;

  @media (max-width: 1024px) {
    font-size: 1rem;
  }
`;
const HeaderField = styled.div`
  margin-left: 10px;
  font-weight: bold;
  font-size: 30px;
  color: var(--gray-color);

  @media (max-width: 1024px) {
    margin-left: 0;
    color: #006837;
    font-size: 1rem;
  }
`;
const HeaderJob = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: var(--light-gray-color);
  @media (max-width: 1024px) {
    font-size: 16px;
  }

  // iphone mini
  @media (max-width: 1024px) {
    font-size: 13px;
  }
`;
