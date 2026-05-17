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
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
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