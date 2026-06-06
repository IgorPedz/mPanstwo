import { motion } from "framer-motion";
import { getTypes } from "./legislacjaConstants";
import { useTranslation } from "react-i18next";

export default function TypeTabs({ active, onChange }) {
  const { t } = useTranslation();
  const TYPES = getTypes(t);
  return (
    <div className="mb-6 p-1.5 bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800 rounded-[1.5rem] color-transition w-fit max-w-full overflow-x-auto no-scrollbar">
      <div className="sm:hidden px-1">
        <div className="relative w-fit">
          <select
            value={active}
            onChange={(e) => onChange(e.target.value)}
            className="appearance-none min-w-[160px] px-4 py-2 pr-8 rounded-[1.1rem]
              bg-white dark:bg-slate-900 text-[11px] font-black uppercase tracking-widest
              text-slate-700 dark:text-slate-200 outline-none cursor-pointer color-transition"
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">▾</div>
        </div>
      </div>

      <div className="hidden sm:flex gap-1 flex-nowrap px-1">
        {TYPES.map(({ value, label }) => {
          const isActive = active === value;
          return (
            <button
              key={value}
              onClick={() => onChange(value)}
              className={`relative flex-shrink-0 px-5 py-2.5 rounded-[1.1rem]
                text-[10px] font-black uppercase tracking-widest
                color-transition duration-300 cursor-pointer outline-none
                ${isActive ? "text-white dark:text-slate-900" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`}
            >
              {isActive && (
                <motion.div
                  layoutId="legTabIndicator"
                  className="absolute inset-0 bg-slate-900 dark:bg-white rounded-[1.1rem] z-0 shadow-lg shadow-black/5 color-transition"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
