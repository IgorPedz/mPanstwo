import { motion } from "framer-motion";

export default function LessonModulesGrid({
  modules,
  courseSlug,
  lessonSlug,
  progress,
  modulesDone,
  setActiveModule,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
      {modules.map((m, i) => {
        const done = !!progress[i];
        const unlocked = i === 0 || modulesDone(i - 1);

        return (
          <motion.button
            key={m.id}
            disabled={!unlocked}
            whileHover={unlocked ? { y: -4, scale: 1.01 } : {}}
            whileTap={unlocked ? { scale: 0.98 } : {}}
            onClick={() => unlocked && setActiveModule({ ...m, index: i })}
            className={`
              w-full flex items-center justify-between text-left p-5 rounded-2xl border color-transition
              lg:flex-col lg:items-start lg:justify-between min-h-[100px] lg:min-h-[160px]
              ${
                unlocked
                  ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md cursor-pointer"
                  : "bg-slate-100/70 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/40 opacity-50 cursor-not-allowed"
              }
            `}
          >
            <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3 w-full">
              <div
                className={`w-10 h-10 rounded-xl grid place-items-center font-black text-sm transition-colors duration-300 shrink-0
                  ${
                    done
                      ? "bg-emerald-500 text-white"
                      : unlocked
                        ? "bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                  }
                `}
              >
                {done ? "✓" : unlocked ? i + 1 : "🔒"}
              </div>

              <div>
                <p className="color-transition font-bold text-slate-900 dark:text-slate-100 text-base line-clamp-1">
                  Moduł {i + 1}
                </p>
                <p className="color-transition text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
                  {m.type || "Teoria"}
                </p>
              </div>
            </div>

            <div className="color-transition hidden lg:flex items-center justify-between w-full mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60">
              <span className="color-transition text-xs font-bold text-slate-400 dark:text-slate-500">
                {done ? "Ukończono" : unlocked ? "Rozpocznij" : "Zablokowane"}
              </span>
              <span className="text-slate-400">→</span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
