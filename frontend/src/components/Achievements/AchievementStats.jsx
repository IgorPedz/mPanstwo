import { motion } from "framer-motion";

const AchievementStats = ({ currentLevel, progressPercent }) => {
  if (!currentLevel) return null;

  return (
    <section className="mb-10 bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800 color-transition">

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

        <div className="flex items-center gap-6 min-w-[300px]">

          <div className="relative">

            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-blue-500/40 color-transition">
              {currentLevel.number}
            </div>

            <div className="absolute -bottom-2 -right-2 bg-amber-400 text-slate-900 text-xs font-black px-2 py-1 rounded-md border-2 border-white dark:border-slate-900 color-transition">
              RANGA
            </div>

          </div>

          <div>

            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none color-transition">
              {currentLevel.name}
            </h2>

            <p className="text-slate-500 mt-2 font-medium color-transition">
              Łączny XP:{" "}
              <span className="text-blue-600">
                {currentLevel.totalPoints.toLocaleString()} XP
              </span>
            </p>

          </div>

        </div>

        {/* RIGHT: PROGRESS */}
        <div className="flex-1 w-full space-y-4">

          <div className="flex justify-between items-end">

            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 color-transition">
              Postęp do: {currentLevel.nextName}
            </span>

            <span className="text-sm font-black text-slate-900 dark:text-white color-transition">
              {currentLevel.currentXP} XP
              {" / "}
              {currentLevel.requiredXP} XP
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
  );
};

export default AchievementStats;