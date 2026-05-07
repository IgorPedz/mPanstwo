import { motion } from "framer-motion";

const AchievementStats = ({ currentLevel, progressPercent }) => {
  return (
    <section className="mb-10 bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800 color-transition">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        
        <div className="flex items-center gap-6 min-w-[300px]">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-blue-500/40 color-transition">
              {currentLevel.number}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-amber-400 text-slate-900 text-xs font-black px-2 py-1 rounded-md border-2 border-white dark:border-slate-900 color-transition">
              PRO
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none color-transition">
              {currentLevel.name}
            </h2>
            <p className="text-slate-500 mt-2 font-medium color-transition">
              Łączny kapitał: <span className="text-blue-600">{currentLevel.totalPoints.toLocaleString()} XP</span>
            </p>
          </div>
        </div>

        <div className="flex-1 w-full space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 color-transition">
              Postęp do: {currentLevel.nextName}
            </span>
            <span className="text-sm font-black text-slate-900 dark:text-white color-transition">
              {currentLevel.currentXP} / {currentLevel.requiredXP} XP
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

        <div className="flex gap-10">
          <StatBox value="42" label="Oceny" />
          <StatBox value="15" label="Ankiety" border />
          <StatBox value="#124" label="Ranking" />
        </div>
      </div>
    </section>
  );
};

const StatBox = ({ value, label, border }) => (
  <div className={`text-center ${border ? "border-x border-slate-100 dark:border-slate-800 px-10" : ""} color-transition`}>
    <p className="text-2xl font-black text-slate-900 dark:text-white color-transition">{value}</p>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest color-transition">{label}</p>
  </div>
);

export default AchievementStats;