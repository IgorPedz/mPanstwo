import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { RARITIES } from "../AchievementsData";

export default function AchievementRarityFilter({
  activeRarity,
  setActiveRarity
}) {
  const { t } = useTranslation();
  return (
    <div className="mb-5 w-fit p-1.5 bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800 rounded-[1.5rem] color-transition">

      <div className="lg:hidden flex justify-center">
        <div className="relative w-fit">
          <select
            value={activeRarity}
            onChange={(e) => setActiveRarity(e.target.value)}
            className="
              appearance-none
              px-4 py-2 pr-8
              rounded-[1.1rem]
              bg-white dark:bg-slate-900
              text-[11px] font-black uppercase tracking-widest
              text-slate-700 dark:text-slate-200
              outline-none cursor-pointer color-transition
            "
          >
            <option value="" disabled hidden>
              {t("achievements.category")}
            </option>

            {RARITIES.map((r) => (
              <option key={r.slug} value={r.slug}>
                {t(r.nameKey)}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">
            ▾
          </div>
        </div>
      </div>

      <div className="hidden lg:flex gap-1 justify-center flex-nowrap px-1 overflow-x-auto no-scrollbar">

        {RARITIES.map((r) => {
          const isActive = activeRarity === r.slug;

          return (
            <button
              key={r.slug}
              onClick={() => setActiveRarity(r.slug)}
              className={`
                relative flex-shrink-0 px-4 lg:px-6 py-2.5 rounded-[1.1rem]
                text-[10px] font-black uppercase tracking-widest
                transition-colors duration-300 cursor-pointer outline-none color-transition
                scroll-mx-4

                ${isActive
                  ? "text-white dark:text-slate-900"
                  : `${r.color} hover:text-slate-800 dark:hover:text-slate-200`
                }
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="rarityActiveTab"
                  className="absolute inset-0 bg-slate-900 dark:bg-white rounded-[1.1rem] z-0 shadow-lg shadow-black/10 color-transition"
                  transition={{
                    type: "spring",
                    bounce: 0.25,
                    duration: 0.6
                  }}
                />
              )}

              <span className="relative z-10">
                  {t(r.nameKey)}
              </span>
            </button>
          );
        })}

      </div>
    </div>
  );
}