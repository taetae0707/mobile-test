import { SKILL_IDS } from "../types/enums";

// skill_id → name 매핑 함수
const SKILL_ID_TO_NAME_MAP = Object.fromEntries(
	Object.entries(SKILL_IDS).map(([name, id]) => [id, name])
	//Object.entries(): 객체를 [key, value] 형태의 배열로 만든다.
);

export const getSkillNameById = (skillId: number): string => {
	return SKILL_ID_TO_NAME_MAP[skillId] || `Unknown Skill (${skillId})`;
};

// name → skill_id 매핑 함수
//스킬의 이름을 알려주면, 해당하는 고유 번호(ID)를 찾아주는 역할
export const getSkillIdByName = (skillName: string): number | null => {
	return SKILL_IDS[skillName as keyof typeof SKILL_IDS] || null;
	//특정 키(key=skillName)에 해당하는 값(value)을 찾는 방법
};
