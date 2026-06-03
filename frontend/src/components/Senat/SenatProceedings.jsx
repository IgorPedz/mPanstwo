import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon, ArrowTopRightOnSquareIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { sectionVariants } from "../../Utils/Animations";

const PROC_PER_PAGE = 2;

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: () => ({ x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }),
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }),
};

export default function SenatProceedings({ proceedings, loading, IconComponent, colorClass, accentGradient }) {
  const [page, setPage] = useState(0);
  const [dir,  setDir]  = useState(1);
  const totalPages = Math.ceil(proceedings.length / PROC_PER_PAGE);

  return (
    <motion.div
      variants={sectionVariants}
      className="w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
        bg-white dark:bg-slate-900 color-transition overflow-hidden"
    >
      <div className="flex items-center justify-between px-7 md:px-8 pt-7 pb-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 color-transition">
          Ostatnie posiedzenia
        </p>
        <a
          href="https://www.senat.gov.pl/prace/posiedzenia-senatu/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest
            text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors color-transition"
        >
          Wszystkie
          <ArrowTopRightOnSquareIcon className="h-3 w-3" />
        </a>
      </div>

      <div className="px-7 md:px-8 pb-7">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 color-transition">
                <div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 color-transition" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-4/5 color-transition" />
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full w-1/4 color-transition" />
                </div>
              </div>
            ))}
          </div>
        ) : proceedings.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500 color-transition">Brak danych.</p>
        ) : (
          <>
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={page}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {proceedings.slice(page * PROC_PER_PAGE, (page + 1) * PROC_PER_PAGE).map((p, i) => (
                    <a
                      key={i}
                      href={p.href ?? "https://www.senat.gov.pl/prace/posiedzenia/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all color-transition
                        ${p.upcoming
                          ? "border-2 border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-950/20 hover:border-red-400 dark:hover:border-red-600 hover:shadow-md"
                          : "border border-slate-200/70 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md"
                        }`}
                    >
                      <div className={`relative w-full aspect-video flex flex-col items-center justify-center gap-3
                        bg-gradient-to-br ${accentGradient} ${p.upcoming ? "opacity-100" : "opacity-80"}`}>
                        <IconComponent className="h-10 w-10 text-white/60" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Senat RP</span>
                        {p.upcoming && (
                          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-sm text-white">
                            Planowane
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col flex-1 p-4 gap-2">
                        <p className={`text-xs font-black leading-snug transition-colors color-transition
                          ${p.upcoming
                            ? "text-red-900 dark:text-red-100 group-hover:text-red-700 dark:group-hover:text-red-200"
                            : "text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-100"
                          }`}>
                          {p.title}
                        </p>
                        {p.dates?.length > 0 && (
                          <div className="flex items-center gap-1.5 mt-auto pt-1">
                            <CalendarDaysIcon className={`h-3.5 w-3.5 shrink-0 ${p.upcoming ? "text-red-400 dark:text-red-500" : "text-slate-400 dark:text-slate-500"}`} />
                            <span className={`text-[10px] font-bold color-transition ${p.upcoming ? "text-red-500 dark:text-red-400" : "text-slate-400 dark:text-slate-500"}`}>
                              {p.dates.join(" · ")}
                            </span>
                          </div>
                        )}
                      </div>
                    </a>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between mt-5">
              <div className="flex items-center gap-2">
                <button onClick={() => { setDir(-1); setPage((p) => p - 1); }} disabled={page === 0}
                  className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer
                    bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400
                    hover:bg-slate-200 dark:hover:bg-slate-700
                    disabled:opacity-30 disabled:cursor-not-allowed transition-all color-transition">
                  <ArrowLeftIcon className="h-4 w-4" />
                </button>
                <button onClick={() => { setDir(1); setPage((p) => p + 1); }} disabled={page >= totalPages - 1}
                  className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer
                    bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400
                    hover:bg-slate-200 dark:hover:bg-slate-700
                    disabled:opacity-30 disabled:cursor-not-allowed transition-all color-transition">
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button key={i}
                      onClick={() => { setDir(i > page ? 1 : -1); setPage(i); }}
                      className={`rounded-full transition-all cursor-pointer color-transition
                        ${i === page
                          ? `w-4 h-1.5 ${colorClass.replace("text-", "bg-")}`
                          : "w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700"
                        }`} />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">
                  {page + 1} / {totalPages}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
