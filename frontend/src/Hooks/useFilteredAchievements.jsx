import { useMemo } from "react";

// Definiujemy sztywne wagi dla rzadkości. 
// Niższy numer = wyższy priorytet na liście (zwykłe na górze, legendarne na dole)
const RARITY_WEIGHTS = {
  normal: 1,
  common: 1,    // na wypadek gdyby w bazie było 'common' zamiast 'normal'
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
        // PRIORYTET 1: Status odblokowania (Zrobione na samą górę)
        if (a.unlocked !== b.unlocked) {
          return a.unlocked ? -1 : 1; // true (zrobione) wskakuje wyżej (-1)
        }

        // PRIORYTET 2: Rzadkość (Zwykłe -> Rzadkie -> Epickie -> Legendarne)
        const weightA = RARITY_WEIGHTS[a.rarity?.toLowerCase()] || 99;
        const weightB = RARITY_WEIGHTS[b.rarity?.toLowerCase()] || 99;

        if (weightA !== weightB) {
          return weightA - weightB; // Niższa waga (np. 1 czyli zwykłe) ląduje wyżej
        }

        // PRIORYTET 3: Postęp (Ratio) - gdy status i rzadkość są takie same
        const aReq = a.requirementValue || 0;
        const bReq = b.requirementValue || 0;
        const aProg = a.progress || 0;
        const bProg = b.progress || 0;

        const aRatio = aReq > 0 ? aProg / aReq : 0;
        const bRatio = bReq > 0 ? bProg / bReq : 0;

        if (aRatio !== bRatio) {
          return bRatio - aRatio; // Większy postęp na górę grupy
        }

        // Fallback: po wartości wymagania
        return aReq - bReq;
      });
  }, [achievements, filter, rarityFilter]);
}