import { motion } from "framer-motion";

const RARITIES = [
  { slug: "all", name: "Wszystkie", color: "text-slate-500" },
  { slug: "common", name: "Zwykłe", color: "text-slate-500" },
  { slug: "rare", name: "Rzadkie", color: "text-blue-500" },
  { slug: "epic", name: "Epickie", color: "text-purple-500" },
  { slug: "legendary", name: "Legendarne", color: "text-yellow-500" }
];

export default function AchievementRarityFilter({
  activeRarity,
  setActiveRarity
}) {
  return (
    <div className="mb-5 w-full lg:w-fit p-1.5 bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800 rounded-[1.5rem] color-transition">

      <div className="flex gap-1 overflow-x-auto no-scrollbar lg:flex-wrap lg:overflow-visible">

        {RARITIES.map((r) => {
          const isActive = activeRarity === r.slug;

          return (
            <button
              key={r.slug}
              onClick={() => setActiveRarity(r.slug)}
              className={`
                relative flex-shrink-0 px-5 lg:px-6 py-2.5 rounded-[1.1rem]
                text-[10px] font-black uppercase tracking-widest
                transition-colors duration-300 cursor-pointer outline-none color-transition

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

              <motion.div
                className="absolute inset-0 rounded-[1.1rem] opacity-0 hover:opacity-100 transition-opacity duration-300 bg-slate-200/20 dark:bg-white/10"
              />

              <span className="relative z-10">
                {r.name}
              </span>

            </button>
          );
        })}

      </div>
    </div>
  );
}