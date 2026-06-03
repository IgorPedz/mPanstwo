import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { sectionVariants } from "../../Utils/Animations";

const ITEMS_PER_PAGE = 2;

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: () => ({ x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }),
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }),
};

export default function MinistryNews({ news, loading, website, title, IconComponent, colorClass, accentGradient }) {
  const [page, setPage] = useState(0);
  const [dir, setDir]   = useState(1);
  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);

  const goPrev = () => { setDir(-1); setPage((p) => p - 1); };
  const goNext = () => { setDir( 1); setPage((p) => p + 1); };

  return (
    <motion.div
      variants={sectionVariants}
      className="w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
        bg-white dark:bg-slate-900 color-transition overflow-hidden"
    >
      <div className="flex items-center justify-between px-7 md:px-8 pt-7 pb-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 color-transition">
          Aktualności
        </p>
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest
              text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors color-transition"
          >
            Wszystkie
            <ArrowTopRightOnSquareIcon className="h-3 w-3" />
          </a>
        )}
      </div>

      <div className="px-7 md:px-8 pb-7">
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 color-transition">
                <div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 color-transition" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-4/5 color-transition" />
                  <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-3/5 color-transition" />
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full w-1/4 color-transition" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && news.length === 0 && (
          <p className="text-sm text-slate-400 dark:text-slate-500 color-transition">Brak aktualności.</p>
        )}

        {!loading && news.length > 0 && (
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
                  {news.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE).map((item, i) => (
                    <a
                      key={i}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col rounded-2xl overflow-hidden cursor-pointer
                        border border-slate-200/70 dark:border-slate-700/50
                        bg-slate-50 dark:bg-slate-800/40
                        hover:border-slate-300 dark:hover:border-slate-600
                        hover:shadow-md transition-all color-transition"
                    >
                      <div className="w-full aspect-video overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 color-transition">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${accentGradient} flex flex-col items-center justify-center gap-2 opacity-80`}>
                            {IconComponent && <IconComponent className="h-10 w-10 text-white/60" />}
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/50 px-4 text-center line-clamp-2">
                              {title}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col flex-1 p-4 gap-2">
                        <p className="text-xs font-black leading-snug line-clamp-2
                          text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-100
                          transition-colors color-transition">
                          {item.title}
                        </p>
                        {item.lead && (
                          <p className="text-[11px] leading-relaxed line-clamp-3 text-slate-500 dark:text-slate-400 color-transition">
                            {item.lead}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-auto pt-1">
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">
                            {item.date}
                          </span>
                          <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600
                            group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors color-transition" />
                        </div>
                      </div>
                    </a>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between mt-5">
              <div className="flex items-center gap-2">
                <button onClick={goPrev} disabled={page === 0}
                  className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer
                    bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400
                    hover:bg-slate-200 dark:hover:bg-slate-700
                    disabled:opacity-30 disabled:cursor-not-allowed transition-all color-transition">
                  <ArrowLeftIcon className="h-4 w-4" />
                </button>
                <button onClick={goNext} disabled={page >= totalPages - 1}
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
                    <button
                      key={i}
                      onClick={() => { setDir(i > page ? 1 : -1); setPage(i); }}
                      className={`rounded-full transition-all cursor-pointer color-transition
                        ${i === page
                          ? `w-4 h-1.5 ${colorClass.replace("text-", "bg-")}`
                          : "w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700"
                        }`}
                    />
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
