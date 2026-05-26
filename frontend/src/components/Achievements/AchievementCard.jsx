import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { upwardItemVariants } from "../../Utils/Animations";

import ICON_MAP from "../../Utils/Maps/Icons";
import {
  RARITY_STYLES,
  RARITY_GLOW,
} from "../../Utils/Maps/Rarity";

const AchievementCard = ({ item }) => {
  const { t } = useTranslation();
  const Icon = ICON_MAP[item.icon] || ICON_MAP.star;

  const isUnlocked =
    item.unlocked === 1 || item.unlocked === true || item.unlocked === "1";

  const progress = item.progress ?? 0;
  const requirement = item.requirementValue ?? 1;

  const progressPercent = Math.min((progress / requirement) * 100, 100);
  console.log(item)
  return (
    <motion.div
      layout
      variants={upwardItemVariants}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className={`group relative p-6 rounded-[1.5rem] border transition-all duration-300 color-transition
        ${RARITY_STYLES[item.rarity]}
        ${RARITY_GLOW[item.rarity]}
        ${isUnlocked ? "shadow-sm" : "opacity-60 border-dashed"}
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <div
          className={`
            p-3 rounded-2xl transition-all
            ${isUnlocked
              ? "bg-emerald-100 text-emerald-600"
              : "bg-slate-100 text-slate-400"
            }
          `}
        >
          <Icon className="h-6 w-6" />
        </div>

        <span className="text-[10px] font-black text-slate-400 uppercase">
          +{item.xpReward} {t("achievements.reputation")}
        </span>
      </div>

      <h3
        className={`font-bold text-lg mb-1 transition-colors
          ${isUnlocked ? "text-slate-900 dark:text-white" : "text-slate-500"}
        `}
      >
        {t(`achievements.achievementsData.${item.slug}.title`)}
      </h3>

      <p className="color-transition text-xs text-slate-500 dark:text-slate-400 mb-4 h-10 overflow-hidden">
        {t(`achievements.achievementsData.${item.slug}.desc`)}
      </p>

      <div className="mb-4">
        <span
          className={`
            text-[10px] font-black uppercase px-2 py-1 rounded-full
            ${item.rarity === "legendary"
              ? "bg-yellow-400 text-black"
              : item.rarity === "epic"
                ? "bg-purple-500 text-white"
                : item.rarity === "rare"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-200 text-slate-600"
            }
          `}
        >
          {t(`achievements.${item.rarity}`)}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase">
          <span>{t("achievements.goal", { value: requirement.toLocaleString() })}</span>
          <span>
            {t("achievements.progressValues", {
              current: progress.toLocaleString(),
              required: requirement.toLocaleString(),
            })}
          </span>
        </div>

        <div className="color-transition h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${isUnlocked ? "bg-emerald-500" : "bg-blue-500"
              }`}
            initial={{ width: 0 }}
            animate={{
              width: `${progressPercent}%`,
            }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
      </div>

      {!isUnlocked && (
        <div className="color-transition absolute inset-0 bg-white/5 dark:bg-black/5 backdrop-blur-[1px] rounded-[1.5rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-xl">
            {t("achievements.inProgress")}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AchievementCard;
