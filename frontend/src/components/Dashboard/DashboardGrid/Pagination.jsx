import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
  if (totalPages <= 1) return null;

  const buttonClass = `
    group cursor-pointer p-3
    bg-white dark:bg-slate-900 
    border-2 border-slate-900 dark:border-slate-100
    rounded-2xl color-transition
    disabled:opacity-30 disabled:cursor-not-allowed
    hover:bg-slate-900 hover:text-white 
    dark:hover:bg-white dark:hover:text-slate-900 dark:text-white
    active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
  `;

  return (
    <div className="flex items-center justify-center gap-6 mt-6">
      <button
        disabled={currentPage === 0}
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
        className={buttonClass}
      >
        <ChevronLeftIcon className="h-5 w-5 stroke-[3]" />
      </button>

      <div className="flex items-center  gap-3 px-6 py-2 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border-2 border-transparent  color-transition">
        <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentPage}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="color-transition absolute text-[20px] font-black text-slate-900 dark:text-white"
            >
              {currentPage + 1}
            </motion.span>
          </AnimatePresence>
        </div>
        
        <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
          z
        </span>
        
        <span className="color-transition text-[20px] font-black text-slate-900 dark:text-white w-8 text-center">
          {totalPages}
        </span>
      </div>

      <button
        disabled={currentPage === totalPages - 1}
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
        className={buttonClass}
      >
        <ChevronRightIcon className="h-5 w-5 stroke-[3]" />
      </button>
    </div>
  );
}