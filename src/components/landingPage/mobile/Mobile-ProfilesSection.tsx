"use Client";

import styled from "@emotion/styled";
import { ProfileCard } from "@components/profileCards/ProfileCard";
import { ProfileBadge } from "@components/common/badge";
import { useProfileList } from "@hooks/landingPage/useProfileList";
import { getMobileVw } from "@utils/responsive";
import { useSwiper } from "@hooks/landingPage/useSwiper";
import { useMemo } from "react";

export function MobileProfilesSection() {
	const { selectedField, handleClickBadge, accountList, badgeList } =
		useProfileList();

	const filteredForPagination = useMemo(() => {
		return selectedField === null
			? accountList
			: accountList.filter((account) => account.field === selectedField);
	}, [accountList, selectedField]);

	const chunkArray = <T,>(arr: T[], targetNumber: number): T[][] => {
		const result: T[][] = [];
		for (let i = 0; i < arr.length; i += targetNumber) {
			result.push(arr.slice(i, i + targetNumber));
		}
		return result;
	};
	const chunkedProfiles = chunkArray(filteredForPagination, 3);

	// useSwiper에 전체리스트 갯수를 전달 (훅에서는 totalItems로 받음)
	const { swiperRef, currentPage, totalPages } = useSwiper(
		filteredForPagination.length
	);

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
			<PaginationBox>
				<span style={{ color: "#3ecdba" }}>{currentPage}</span> / {totalPages}
			</PaginationBox>
			{/* useRef을 이용하며 특정 DOM 요소에 직접 useSwiper훅을 연결 */}
			<PoomProfileCardList ref={swiperRef}>
				{" "}
				{chunkedProfiles.map((group, index) => (
					<SnapWrapper
						key={index}
						className="swiper-slide">
						{group.map((account) => (
							<ProfileCard
								key={account.public_id}
								profileData={account}
							/>
						))}
					</SnapWrapper>
				))}
			</PoomProfileCardList>
		</ProfilesSectionContainer>
	);
}

const SnapWrapper = styled.div`
	scroll-snap-align: start;
	flex: 0 0 90%;
	flex-shrink: 0; // 줄어들지 않도록 고정
	display: flex;
	flex-direction: column;
	/* gap: ${getMobileVw(12)}; */
`;

const ProfilesSectionContainer = styled.div`
	margin-top: ${getMobileVw(40)};
	padding: 0 ${getMobileVw(20)};
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	@media (max-width: 1024px) {
		margin-bottom: 60px;
	}
`;

const SectionTitle = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	width: 100%;
	gap: ${getMobileVw(20)};
	@media (max-width: 1024px) {
		gap: 1rem;
	}
`;

const SubHead = styled.div`
	color: #0e0e0e;
	font-size: 1.5rem;
	font-weight: 600;
	line-height: 1.5;
`;

const BadgeContainer = styled.div`
	width: 100%;
	display: flex;
	overflow-x: auto;
	white-space: nowrap;
	gap: 3px;
	-webkit-overflow-scrolling: touch;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const PaginationBox = styled.div`
	align-self: flex-end;
	margin-top: ${getMobileVw(8)};
	font-size: 1rem;
	color: #888;
	@media (max-width: 1024px) {
		margin-top: 0;
	}
`;

const PoomProfileCardList = styled.div`
	display: flex;
	width: 100%;
	overflow-x: auto;
	scroll-snap-type: x mandatory;
	gap: ${getMobileVw(30)};
	padding-bottom: ${getMobileVw(16)};
	/* padding-left: ${getMobileVw(20)};  */
	padding-right: ${getMobileVw(20)};
	-webkit-overflow-scrolling: touch;

	&::-webkit-scrollbar {
		display: none;
	}
	@media (max-width: 1024px) {
		gap: 1rem;
	}
`;
