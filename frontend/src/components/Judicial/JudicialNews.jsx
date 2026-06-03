import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

import { sectionVariants } from "../../Utils/Animations";

import JudicialNewsCard from "./JudicialNewsCard";
import JudicialNewsSkeleton from "./JudicialNewsSkeleton";

const ITEMS_PER_PAGE = 2;

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),

  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },

  exit: (dir) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  }),
};

export default function JudicialNews({
  news,
  loading,
  website,
  colorClass,
  accentGradient,
  IconComponent,
  institutionName,
}) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);

  const currentNews = useMemo(
    () => news.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE),
    [news, page],
  );

  if (!loading && news.length === 0) {
    return null;
  }

  return (
    <motion.div
      variants={sectionVariants}
      className="
        rounded-3xl overflow-hidden
        border border-slate-200/70 dark:border-slate-800/60
        bg-white dark:bg-slate-900
      "
    >
      <div className="flex items-center justify-between px-7 md:px-8 pt-7 pb-5">
        <p
          className="
            text-[10px] font-black uppercase tracking-widest
            text-slate-400 dark:text-slate-500
          "
        >
          Aktualności
        </p>

        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-1
              text-[10px] font-black uppercase tracking-widest
              text-slate-400 dark:text-slate-500
              hover:text-slate-700
              dark:hover:text-slate-200
            "
          >
            Wszystkie
            <ArrowTopRightOnSquareIcon className="h-3 w-3" />
          </a>
        )}
      </div>

      <div className="px-7 md:px-8 pb-7">
        {loading ? (
          <JudicialNewsSkeleton />
        ) : (
          <>
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {currentNews.map((item) => (
                    <JudicialNewsCard
                      key={item.url}
                      item={item}
                      IconComponent={IconComponent}
                      accentGradient={accentGradient}
                      institutionName={institutionName}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-5">
                <div className="flex gap-2">
                  <button
                    disabled={page === 0}
                    onClick={() => {
                      setDirection(-1);
                      setPage((p) => p - 1);
                    }}
                    className="
                      w-9 h-9 rounded-xl flex items-center justify-center
                      bg-slate-100 dark:bg-slate-800
                      disabled:opacity-30
                    "
                  >
                    <ArrowLeftIcon className="h-4 w-4" />
                  </button>

                  <button
                    disabled={page >= totalPages - 1}
                    onClick={() => {
                      setDirection(1);
                      setPage((p) => p + 1);
                    }}
                    className="
                      w-9 h-9 rounded-xl flex items-center justify-center
                      bg-slate-100 dark:bg-slate-800
                      disabled:opacity-30
                    "
                  >
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    {Array.from({
                      length: totalPages,
                    }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setDirection(index > page ? 1 : -1);
                          setPage(index);
                        }}
                        className={`
                          rounded-full transition-all
                          ${
                            index === page
                              ? `w-4 h-1.5 ${colorClass.replace(
                                  "text-",
                                  "bg-",
                                )}`
                              : "w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700"
                          }
                        `}
                      />
                    ))}
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                    {page + 1} / {totalPages}
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
