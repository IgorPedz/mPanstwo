import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AchievementStats from "../../components/Achievements/AchievementStats";
import AchievementCard from "../../components/Achievements/AchievementCard";
import AchievementsHeader from "../../components/Achievements/AchievementsHeader";
import AchievementsTabs from "../../components/Achievements/AchievementsTab";
import { achievementsData, categories } from "../../components/Achievements/AchievementData"; 
import { containerVariants } from "../../Utils/Animations";

export default function GlobalUserAchievements() {
  const [filter, setFilter] = useState("all");

  const currentLevel = {
    number: 4,
    name: "Analityk Sejmowy",
    nextName: "Komisarz Obywatelski",
    currentXP: 2450,
    requiredXP: 3000,
    totalPoints: 12450
  };

  const filtered = filter === "all" 
    ? achievementsData 
    : achievementsData.filter(a => a.cat === filter);

  const progressPercent = (currentLevel.currentXP / currentLevel.requiredXP) * 100;

  return (
    <motion.div 
      className="w-full min-h-screen py-8 px-4 md:px-8 color-transition"
      initial="hidden" animate="show" variants={containerVariants}
    >
      <div className="max-w-[1800px] mx-auto">
        <AchievementsHeader />

        <AchievementStats 
          currentLevel={currentLevel} 
          progressPercent={progressPercent} 
        />

        <AchievementsTabs 
          categories={categories} 
          activeCategory={filter} 
          setActiveCategory={setFilter} 
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