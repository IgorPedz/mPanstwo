import { useMemo } from "react";

const RARITY_WEIGHTS = {
  common: 1, 
  rare: 2,
  epic: 3,
  legendary: 4
};

export function useFilteredAchievements(achievements, filter, rarityFilter) {
  return useMemo(() => {
    if (!achievements) return [];

    return achievements
      .filter((a) => {
        const categoryMatch = filter === "all" || a.category?.slug === filter;
        const rarityMatch = rarityFilter === "all" || a.rarity === rarityFilter;
        return categoryMatch && rarityMatch;
      })
      .sort((a, b) => {
        const weightA = RARITY_WEIGHTS[a.rarity?.toLowerCase()] || 99;
        const weightB = RARITY_WEIGHTS[b.rarity?.toLowerCase()] || 99;

        if (weightA !== weightB) {
          return weightA - weightB;
        }

        if (a.unlocked !== b.unlocked) {
          return a.unlocked ? -1 : 1;
        }


        const aReq = a.requirementValue || 0;
        const bReq = b.requirementValue || 0;
        const aProg = a.progress || 0;
        const bProg = b.progress || 0;

        const aRatio = aReq > 0 ? aProg / aReq : 0;
        const bRatio = bReq > 0 ? bProg / bReq : 0;

        if (aRatio !== bRatio) {
          return bRatio - aRatio;
        }

        return aReq - bReq;
      });
  }, [achievements, filter, rarityFilter]);
}