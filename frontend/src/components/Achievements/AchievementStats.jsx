import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import RanksModal from "./RanksModal";
import InfoModal from "./InfoModal";
import { Icons } from "../../Utils/Dynamic/RankIcons";
const AchievementStats = ({ currentLevel, progressPercent }) => {
  const { t } = useTranslation();
  const [isRanksOpen, setIsRanksOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  if (!currentLevel) return null;


  const Icon = Icons[currentLevel.icon];

  return (
    <>
      <section className="mb-10 bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800 color-transition relative">

        <div className="color-transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800/60">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 color-transition">
              {t("achievements.yourLevel")}
            </span>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsRanksOpen(true)}
              className="flex items-center justify-center gap-2 flex-1 sm:flex-initial text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 cursor-pointer color-transition"
            >
              <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c-.151-.326-.504-.545-.882-.545s-.731.219-.882.545l-2.4 5.183-5.674.475c-.372.032-.68.286-.78.643-.1.357.012.744.286.994l4.316 3.931-1.303 5.568c-.085.364.054.743.355.961.301.218.704.225 1.01.018l4.896-3.32 4.896 3.32c.306.207.709.2.1.018.301-.218.44-.597.355-.961l-1.303-5.568 4.316-3.931c.274-.25.386-.637.286-.994-.1-.357-.408-.611-.78-.643l-5.674-.475-2.4-5.183z" />
              </svg>
              {t("achievements.ranksList")}
            </button>

            <button
              onClick={() => setIsInfoOpen(true)}
              className="color-transition flex items-center justify-center gap-2 flex-1 sm:flex-initial text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-950 text-blue-600 dark:text-blue-400 cursor-pointer color-transition"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {t("achievements.howToCollect")}
            </button>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6 min-w-[300px] w-full lg:w-auto">
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-full flex items-center justify-center text-white shadow-2xl shadow-blue-500/40 color-transition" style={{ backgroundColor: currentLevel.color }}>
                <Icon className="w-10 h-10 text-white" />

              </div>

              <div className="absolute -bottom-2 -right-2 bg-amber-400 text-slate-900 text-xs font-black px-2 py-1 rounded-md border-2 border-white dark:border-slate-900 color-transition">
                {t("achievements.rankLabel")}
              </div>
            </div>

            <div>
              <h2 className="color-transition text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none color-transition">
                {t(`achievements.ranks.${currentLevel.name.trim()}.name`)}
              </h2>
              <p className="text-slate-500 mt-2 font-medium color-transition">
                {t("achievements.totalReputation")} <span className="color-transition text-blue-600 dark:text-blue-400">
                  {currentLevel.totalPoints.toLocaleString()} {t("achievements.reputation")}
                </span>
              </p>
            </div>
          </div>
          <div className="flex-1 w-full space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 color-transition">
                {t("achievements.progressTo")} {t(`achievements.ranks.${currentLevel.nextName.trim()}.name`)}
              </span>
              <span className="text-sm font-black text-slate-900 dark:text-white color-transition">
                {t("achievements.progressValues", {
                  current: currentLevel.currentXP.toLocaleString(),
                  required: currentLevel.requiredXP.toLocaleString(),
                })}
              </span>
            </div>

            <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-slate-700 color-transition">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1.5, ease: "circOut" }}
              />
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isRanksOpen && <RanksModal isOpen={isRanksOpen} onClose={() => setIsRanksOpen(false)} />}
        {isInfoOpen && <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default AchievementStats;