import { motion } from "framer-motion";

export default function LessonSidebar({ modulesCount, doneCount, allDone }) {
  return (
    <div className="hidden lg:block sticky top-8 space-y-6 h-fit w-full">
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8 shadow-sm color-transition">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Twój Postęp
        </h3>

        <div className="color-transition mt-5 h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
            initial={{ width: 0 }}
            animate={{
              width: `${(doneCount / modulesCount) * 100}%`,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="color-transition text-sm font-bold text-slate-700 dark:text-slate-300">
            Ukończono moduły
          </p>
          <p className="color-transition text-sm font-black text-slate-900 dark:text-white">
            {doneCount} / {modulesCount}
          </p>
        </div>

        <div className="color-transition mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 space-y-4 text-sm font-medium">
          <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-2">📘 Wszystkie sekcje</span>
            <span className="color-transition font-bold text-slate-900 dark:text-white">
              {modulesCount}
            </span>
          </div>

          <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-2">🧠 Test sprawdzający</span>
            <span
              className={`color-transition px-2 py-0.5 rounded-md text-xs font-bold ${allDone ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}
            >
              {allDone ? "Gotowy" : "Zablokowany"}
            </span>
          </div>

          <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-2">📊 Wynik procentowy</span>
            <span className="font-black text-indigo-500 text-base">
              {Math.round((doneCount / modulesCount) * 100)}%
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/40 p-6 color-transition">
        <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-4">
          Szybkie nawigowanie
        </h4>
        <div className="space-y-3 text-xs font-medium text-slate-500 dark:text-slate-400">
          <div className="flex items-center justify-between">
            <span>Zamknięcie modułu</span>
            <kbd className="color-transition px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px] shadow-sm">
              ESC
            </kbd>
          </div>
          <div className="flex items-center justify-between">
            <span>Zatwierdzenie zmian</span>
            <kbd className="color-transition px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px] shadow-sm">
              ENTER
            </kbd>
          </div>
          <p className="color-transition text-[11px] text-slate-400 dark:text-slate-500 pt-2 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
            💡 *Wskazówka: Możesz wracać do ukończonych modułów w dowolnym momencie, aby odświeżyć swoją wiedzę.*
          </p>
        </div>
      </div>
    </div>
  );
}