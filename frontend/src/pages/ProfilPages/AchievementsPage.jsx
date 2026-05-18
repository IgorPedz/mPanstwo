import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AchievementStats from "../../components/Achievements/AchievementStats";
import AchievementCard from "../../components/Achievements/AchievementCard";
import AchievementsHeader from "../../components/Achievements/AchievementsHeader";

import { containerVariants } from "../../Utils/Animations";

import { useGlobalAchievements } from "../../Hooks/useGlobalAchievements";
import { useFilteredAchievements } from "../../Hooks/useFilteredAchievements";

import AchievementsFilters from "../../components/Achievements/filters/AchievementsFilter";

export default function GlobalUserAchievements() {
  const { achievements, categories, progression, loading } =
    useGlobalAchievements();
  const [rarityFilter, setRarityFilter] = useState("all");
  const [filter, setFilter] = useState("all");
  console.log(progression)
  const filtered = useFilteredAchievements(achievements, filter, rarityFilter);

  if (loading || !progression) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Ładowanie osiągnięć...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full min-h-screen py-8 px-4 md:px-8 color-transition"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div className="max-w-[1800px] mx-auto">
        <AchievementsHeader />

        <AchievementStats
          currentLevel={{
            number: progression.currentRank.level,
            color:progression.currentRank.color,
            name: progression.currentRank.name,
            icon: progression.currentRank.icon,
            nextName: progression.nextRank?.name || "MAX RANGA",
            currentXP: progression.xp,
            requiredXP: progression.nextRank?.requiredXP || progression.xp,
            totalPoints: progression.xp,
          }}
          progressPercent={progression.progressPercent}
        />

        <AchievementsFilters
          categories={categories}
          filter={filter}
          setFilter={setFilter}
          rarityFilter={rarityFilter}
          setRarityFilter={setRarityFilter}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <AchievementCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
