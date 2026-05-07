import { motion } from "framer-motion";

export default function AchievementsTabs({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="mb-10 w-fit p-1.5 bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800 rounded-[1.5rem] flex flex-wrap gap-1 color-transition">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        
        return (
          <button
            key={cat.id} 
            onClick={() => setActiveCategory(cat.id)} 
            className={`
              relative px-6 py-2.5 rounded-[1.1rem] text-[10px] font-black uppercase tracking-widest 
              transition-colors duration-300 cursor-pointer outline-none color-transition
              ${isActive 
                ? "text-white dark:text-slate-900" 
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              }
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator" 
                className="color-transition absolute inset-0 bg-slate-900 dark:bg-white rounded-[1.1rem] z-0 shadow-lg shadow-black/5"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            <span className="relative z-10">{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}