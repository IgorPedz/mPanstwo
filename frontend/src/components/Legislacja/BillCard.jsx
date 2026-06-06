import { motion } from "framer-motion";
import { CalendarDaysIcon, ChevronRightIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { TYPE_BADGE, TYPE_GRADIENT, getTypeLabel, formatDate } from "./legislacjaConstants";
import { upwardItemVariants } from "../../Utils/Animations";
import { useTranslation } from "react-i18next";

export default function BillCard({ bill, onNavigate }) {
  const { t } = useTranslation();
  const badge    = TYPE_BADGE[bill.type]    ?? TYPE_BADGE.inny;
  const gradient = TYPE_GRADIENT[bill.type] ?? TYPE_GRADIENT.inny;

  return (
    <motion.div
      variants={upwardItemVariants}
      whileHover={{ y: -4 }}
      className="group relative bg-white dark:bg-slate-900 p-6 rounded-[1.5rem] overflow-hidden
        border border-slate-200 dark:border-slate-800 shadow-sm
        hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-md
        transition-all duration-300 cursor-pointer color-transition h-full flex flex-col"
      onClick={() => onNavigate(bill.number)}
    >
      <div className="absolute -right-3 -bottom-3 pointer-events-none opacity-[0.025] dark:opacity-[0.04]">
        <DocumentTextIcon className="h-28 w-28" />
      </div>

      <div className="relative z-10 flex flex-col h-full gap-3">
        <div className="flex items-start justify-between gap-2">
          <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest color-transition ${badge}`}>
            {getTypeLabel(t, bill.type)}
          </span>
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition shrink-0">
            #{bill.number}
          </span>
        </div>

        <p className="text-sm font-bold leading-snug text-slate-900 dark:text-white color-transition
          transition-colors line-clamp-3 flex-1">
          {bill.title}
        </p>

        <div className="flex items-center justify-between gap-2 mt-auto pt-1">
          <div className="flex items-center gap-3">
            {bill.deliveryDate && (
              <div className="flex items-center gap-1.5">
                <CalendarDaysIcon className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">
                  {formatDate(bill.deliveryDate)}
                </span>
              </div>
            )}
            {bill.hasPDF && (
              <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded
                bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 color-transition">
                PDF
              </span>
            )}
          </div>
          <ChevronRightIcon className="h-4 w-4 text-slate-300 dark:text-slate-600
            group-hover:text-indigo-400 dark:group-hover:text-indigo-500
            group-hover:translate-x-0.5 transition-all color-transition shrink-0" />
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full
        transition-all duration-700 bg-gradient-to-r ${gradient}`} />
    </motion.div>
  );
}
