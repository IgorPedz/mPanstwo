import { motion } from "framer-motion";
import ICON_MAP from "../../Utils/Maps/Icons";

const upwardItemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const SurveyCard = ({ survey }) => {
  const ClipboardIcon = ICON_MAP["clipboard"] || ICON_MAP["star"];
  const ZapIcon = ICON_MAP["zap"] || ICON_MAP["sparkles"];

  return (
    <motion.div
      variants={upwardItemVariants}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm group cursor-pointer color-transition"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl group-hover:scale-110 transition-all color-transition">
          <ClipboardIcon className="h-6 w-6" />
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] font-bold px-3 py-1 bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 rounded-full color-transition">
            {survey.status}
          </span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 color-transition">
        {survey.title}
      </h3>
      
      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-6 color-transition">
        <span className="flex items-center gap-1 font-bold italic">{survey.category}</span>
        <span className="opacity-30">•</span>
        <span className="flex items-center gap-1">{survey.time} czytania</span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 color-transition">
        <div className="flex items-center gap-2 text-blue-600 font-black text-sm color-transition">
          <ZapIcon className="h-4 w-4 animate-pulse" />
          {survey.reward}
        </div>
        <button className="text-sm font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2 rounded-xl hover:opacity-80 transition-all color-transition shadow-lg shadow-slate-200 dark:shadow-none">
          Rozpocznij
        </button>
      </div>
    </motion.div>
  );
};

export default SurveyCard;