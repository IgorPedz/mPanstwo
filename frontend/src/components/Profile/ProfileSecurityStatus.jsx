import { motion } from "framer-motion";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

const getSecurityMeta = (score) => {
  if (score >= 86) return { label: "Maksymalne", color: "emerald", width: "100%" };
  if (score >= 61) return { label: "Wysokie", color: "blue", width: "75%" };
  if (score >= 31) return { label: "Średnie", color: "yellow", width: "50%" };
  return { label: "Niskie", color: "red", width: "25%" };
};

export default function SecurityStatus({ score = 100 }) {
  const meta = getSecurityMeta(score);

  return (
    <div className="flex-1 w-full space-y-4 color-transition">

      {/* HEADER */}
      <div className="flex justify-between items-end">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <ShieldCheckIcon className="h-3 w-3" />
          Bezpieczeństwo konta:
          <span className="color-transition text-slate-600 dark:text-slate-300">
            {meta.label}
          </span>
        </span>

        <span className={`text-sm font-black uppercase text-${meta.color}-500`}>
          {score}/100
        </span>
      </div>

      {/* BAR */}
      <div className="color-transition h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-slate-700">
        <motion.div
          className={`h-full bg-${meta.color}-500 rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: meta.width }}
          transition={{ duration: 1.2, ease: "circOut" }}
        />
      </div>
    </div>
  );
}