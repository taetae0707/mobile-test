import styled from "@emotion/styled";
import { ProfileCard } from "@components/profileCards/ProfileCard";
import { ProfileBadge } from "@components/common/badge";
import { useProfileList } from "@hooks/landingPage/useProfileList";

export function ProfilesSection() {
	const { selectedField, handleClickBadge, accountList, badgeList } =
		useProfileList();

	return (
		<ProfilesSectionContainer id="profileSection">
			<SectionTitle>
				<SubHead>품앗이꾼</SubHead>
				<BadgeContainer>
					<ProfileBadge
						onClick={() => handleClickBadge(null)}
						badgeString={"전체"}
						selected={selectedField === null}
					/>
					{badgeList.map((badge) => (
						<ProfileBadge
							key={badge}
							onClick={() => handleClickBadge(badge)}
							badgeString={badge}
							selected={badge === selectedField}
						/>
					))}
				</BadgeContainer>
			</SectionTitle>

			<PoomProfileCardList className="PoomProfileCardList">
				{accountList
					.filter((account) => {
						if (selectedField === null) {
							return true;
						}

						return account.field === selectedField;
					})
					.map((account) => (
						// console.log(Public ID:`, account.public_id);
						<ProfileCard
							key={account.public_id}
							profileData={account}
						/>
					))}
			</PoomProfileCardList>
		</ProfilesSectionContainer>
	);
}

const ProfilesSectionContainer = styled.div`
	width: 100%;
	max-width: 1320px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;

	@media (max-width: 1320px) {
		padding: 0 5%; //gg..
	}
`;

const SectionTitle = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: start;
	width: 100%;
	gap: 26px 42px;
`;

const SubHead = styled.div`
	color: #0e0e0e;
	font-size: 36px;
	font-style: normal;
	font-weight: 700;
	line-height: 150%; /* 54px */
`;

const BadgeContainer = styled.div`
	width: 100%;
`;

const PoomProfileCardList = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 26px;

	@media (max-width: 1320px) {
	}
`;
