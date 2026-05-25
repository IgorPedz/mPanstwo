import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function FAQTabs({
  categories = [],
  activeCategory = "all",
  setActiveCategory,
}) {
  const { t } = useTranslation();

  return (
    <div className="w-fit p-1.5 bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800 rounded-[1.5rem] flex flex-wrap gap-1 color-transition">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;

        return (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              relative px-6 py-2.5 rounded-[1.1rem] text-[10px] font-black uppercase tracking-widest 
              transition-colors duration-300 cursor-pointer outline-none color-transition
              ${
                isActive
                  ? "text-white dark:text-slate-900"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              }
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="color-transition absolute inset-0 bg-slate-900 dark:bg-white rounded-[1.1rem] z-0"
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.6,
                }}
              />
            )}

            <span className="relative z-10">
              {t(`faq.categories.${cat}`)}
            </span>
          </button>
        );
      })}
    </div>
  );
}