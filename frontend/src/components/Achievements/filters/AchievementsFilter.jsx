import AchievementsTabs from "./AchievementsTab";
import AchievementRarityFilter from "./AchievementRarityFilter";

export default function AchievementsFilters({
  categories,
  filter,
  setFilter,
  rarityFilter,
  setRarityFilter,
}) {
  return (
     <div className="flex w-full justify-between items-center gap-3">
      <AchievementsTabs
        categories={categories}
        activeCategory={filter}
        setActiveCategory={setFilter}
      />

      <AchievementRarityFilter
        activeRarity={rarityFilter}
        setActiveRarity={setRarityFilter}
      />
    </div>
  );
}