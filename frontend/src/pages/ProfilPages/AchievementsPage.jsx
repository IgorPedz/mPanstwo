import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import axios from "axios";

import AchievementStats from "../../components/Achievements/AchievementStats";
import AchievementCard from "../../components/Achievements/AchievementCard";
import AchievementsHeader from "../../components/Achievements/AchievementsHeader";
import AchievementsTabs from "../../components/Achievements/AchievementsTab";
import AchievementRarityFilter from "../../components/Achievements/AchievementRarityFilter";

import { containerVariants } from "../../Utils/Animations";
import { useUser } from "../../Contexts/UserContext";
export default function GlobalUserAchievements() {
  const { user } = useUser();

  const [rarityFilter, setRarityFilter] = useState("all");
  const [filter, setFilter] = useState("all");

  const [achievements, setAchievements] = useState([]);
  const [categories, setCategories] = useState([]);

  const [progression, setProgression] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [achievementsRes, progressionRes, categoriesRes] =
          await Promise.all([
            axios.get("http://localhost:5000/achievements"),

            axios.get(`http://localhost:5000/progression/${user.id}`),

            axios.get("http://localhost:5000/category"),
          ]);

        setAchievements(achievementsRes.data);

        setProgression(progressionRes.data);

        setCategories(categoriesRes.data);
      } catch (err) {
        console.error("Achievements fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const rarityOrder = {
    common: 0,
    rare: 1,
    epic: 2,
    legendary: 3,
  };

  const filtered = achievements
    .filter((a) => {
      const categoryMatch = filter === "all" || a.category.slug === filter;

      const rarityMatch = rarityFilter === "all" || a.rarity === rarityFilter;

      return categoryMatch && rarityMatch;
    })
    .sort((a, b) => {
      return rarityOrder[a.rarity] - rarityOrder[b.rarity];
    });

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

            name: progression.currentRank.name,

            nextName: progression.nextRank?.name || "MAX RANGA",

            currentXP: progression.xp,

            requiredXP: progression.nextRank?.requiredXP || progression.xp,

            totalPoints: progression.xp,
          }}
          progressPercent={progression.progressPercent}
        />

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
