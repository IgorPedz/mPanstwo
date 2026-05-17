import { useMemo } from "react";

export function useFilteredAchievements(achievements, filter, rarityFilter) {
  return useMemo(() => {
    if (!achievements) return [];

    return achievements
      .filter((a) => {
        const categoryMatch =
          filter === "all" || a.category.slug === filter;

        const rarityMatch =
          rarityFilter === "all" || a.rarity === rarityFilter;

        return categoryMatch && rarityMatch;
      })
      .sort((a, b) => {
        if (a.unlocked !== b.unlocked) {
          return b.unlocked - a.unlocked;
        }

        const aReq = a.requirementValue || 0;
        const bReq = b.requirementValue || 0;

        const aProg = a.progress || 0;
        const bProg = b.progress || 0;

        const aRatio = aProg / (aReq || 1);
        const bRatio = bProg / (bReq || 1);

        if (aRatio !== bRatio) {
          return bRatio - aRatio;
        }

        return aReq - bReq;
      });
  }, [achievements, filter, rarityFilter]);
}