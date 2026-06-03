import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { sectionVariants } from "../../Utils/Animations";

export default function PresidentInfo({ infoFields, website }) {
  return (
    <motion.div
      variants={sectionVariants}
      className="rounded-3xl border border-slate-200/70 dark:border-slate-800/60
        bg-white dark:bg-slate-900 p-7 md:p-8 color-transition"
    >
      <p className="text-[10px] font-black uppercase tracking-widest mb-4
        text-slate-400 dark:text-slate-500 color-transition">
        Informacje
      </p>
      <div className="space-y-3">
        {infoFields.map(([label, value], i, arr) => (
          <div key={i}>
            <div className="flex items-start justify-between gap-3">
              <span className="text-xs font-bold shrink-0 text-slate-400 dark:text-slate-500 color-transition">{label}</span>
              <span className="text-xs font-black text-right text-slate-700 dark:text-slate-200 color-transition">{value}</span>
            </div>
            {i < arr.length - 1 && <div className="mt-3 h-px bg-slate-100 dark:bg-slate-800 color-transition" />}
          </div>
        ))}
        {website && (
          <>
            <div className="h-px bg-slate-100 dark:bg-slate-800 color-transition" />
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 group cursor-pointer"
            >
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 color-transition">Strona WWW</span>
              <span className="inline-flex items-center gap-1 text-xs font-black
                text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-100
                transition-colors color-transition">
                prezydent.pl
                <ArrowTopRightOnSquareIcon className="h-3 w-3" />
              </span>
            </a>
          </>
        )}
      </div>
    </motion.div>
  );
}
