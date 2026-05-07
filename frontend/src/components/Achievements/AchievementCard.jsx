import { upwardItemVariants } from "../../Utils/Animations";
import { motion } from "framer-motion";

const AchievementCard = ({ item }) => {
  const Icon = item.icon;
  const progress = (item.current / item.goal) * 100;

  return (
    <motion.div
      layout
      variants={upwardItemVariants}
      initial="hidden" animate="show" exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className={`group relative p-6 rounded-[1.5rem] border transition-all duration-300 color-transition ${
        item.unlocked 
        ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm" 
        : "bg-slate-50/50 dark:bg-slate-900/20 border-dashed border-slate-300 dark:border-slate-800 opacity-60"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl color-transition ${item.unlocked ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}>
          <Icon className="h-6 w-6" />
        </div>
        <span className="text-[10px] font-black text-slate-400 group-hover:text-blue-500 transition-colors uppercase color-transition">
          +{item.xp} XP
        </span>
      </div>

      <h3 className={`font-bold text-lg mb-1 color-transition ${item.unlocked ? "text-slate-900 dark:text-white" : "text-slate-500"}`}>
        {item.title}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 h-10 overflow-hidden color-transition">
        {item.desc}
      </p>

      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase color-transition">
          <span>Cel: {item.goal}</span>
          <span>{item.current} / {item.goal}</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden color-transition">
          <motion.div 
            className={`h-full ${item.unlocked ? "bg-emerald-500" : "bg-blue-500"}`}
            initial={{ width: 0 }} 
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
      </div>

      {!item.unlocked && (
        <div className="absolute inset-0 bg-white/5 dark:bg-black/5 backdrop-blur-[1px] rounded-[1.5rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-xl color-transition">
            W trakcie realizacji
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AchievementCard;