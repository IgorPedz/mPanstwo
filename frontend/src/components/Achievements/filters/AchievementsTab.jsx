import { motion } from "framer-motion";

export default function AchievementsTabs({
  categories,
  activeCategory,
  setActiveCategory
}) {
  return (
    <div className="2xl:hidden mb-5 w-fit p-1.5 bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800 rounded-[1.5rem] color-transition">
      
      <div className="relative w-fit">
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="
            appearance-none
            min-w-[160px]
            px-4 py-2 pr-8
            rounded-[1.1rem]
            bg-white dark:bg-slate-900
            text-[11px] font-black uppercase tracking-widest
            text-slate-700 dark:text-slate-200
            outline-none cursor-pointer color-transition
          "
        >
          {categories.map((cat) => (
            <option
              key={cat.slug}
              value={cat.slug}
              className="text-left"
            >
              {cat.name}
            </option>
          ))}
        </select>
        
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">
          ▾
        </div>
      </div>

      <div className="hidden 2xl:flex gap-1 justify-center flex-nowrap px-1 overflow-x-auto no-scrollbar mt-3">

        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug;

          return (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`
                relative flex-shrink-0 px-6 py-2.5 rounded-[1.1rem]
                text-[10px] font-black uppercase tracking-widest
                color-transition duration-300 cursor-pointer outline-none color-transition
                scroll-mx-4

                ${isActive
                  ? "text-white dark:text-slate-900"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                }
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-slate-900 dark:bg-white rounded-[1.1rem] z-0 shadow-lg shadow-black/5 color-transition"
                  transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.6
                  }}
                />
              )}

              <span className="relative z-10">
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
}