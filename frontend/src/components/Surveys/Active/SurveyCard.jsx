import { motion } from "framer-motion";
import ICON_MAP from "../../../Utils/Maps/Icons";
import { upwardItemVariants } from "../../../Utils/Animations";
import useFormatDate from "../../../Utils/Dynamic/useFormatDate";

const SurveyCard = ({ survey, onStart }) => {
  const ClipboardIcon = ICON_MAP["clipboard"] || ICON_MAP["star"];
  const ZapIcon = ICON_MAP["zap"] || ICON_MAP["sparkles"];
  const ClockIcon = ICON_MAP["clock"] || ICON_MAP["calendar"];

  const formattedDeadline = useFormatDate(survey.deadline);

  return (
    <motion.div
      variants={upwardItemVariants}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="
        relative
        bg-white dark:bg-slate-900
        p-6
        rounded-[2.5rem]
        border border-slate-200 dark:border-slate-800
        shadow-sm hover:shadow-xl hover:shadow-blue-500/5
        color-transition
        overflow-hidden
      "
    >
      {survey.deadline && (
        <div className="absolute top-0 right-8 color-transition">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="
              bg-rose-500 text-white
              px-4 py-2
              rounded-b-2xl
              flex items-center gap-2
              shadow-lg shadow-rose-500/20
              color-transition
            "
          >
            <ClockIcon className="h-3 w-3" />

            <span className="text-[10px] font-black uppercase tracking-wider">
              Do {formattedDeadline}
            </span>
          </motion.div>
        </div>
      )}

      <div className="flex justify-between items-start mb-6 color-transition">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl color-transition">
          <ClipboardIcon className="h-6 w-6" />
        </div>
      </div>

      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 pr-10 color-transition">
        {survey.title}
      </h3>

      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium color-transition">
        <span className="text-blue-500 font-bold tracking-tight">
          {survey.category}
        </span>
        <span className="opacity-30">•</span>
        <span>{survey.time} min</span>
      </div>

      <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800 color-transition">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest mb-0.5 color-transition">
            Nagroda
          </span>

          <div className="flex items-center gap-1.5 text-blue-600 font-black text-lg leading-none color-transition">
            <ZapIcon className="h-4 w-4 fill-current" />
            {survey.reward}
          </div>
        </div>

        <button
          onClick={() => onStart(survey)}
          className="color-transition
            cursor-pointer
            text-xs font-black uppercase tracking-widest
            bg-slate-900 dark:bg-white
            text-white dark:text-slate-900
            px-7 py-3
            rounded-2xl
            hover:shadow-lg hover:shadow-slate-500/20
            active:scale-95
            transition-all
          "
        >
          Rozpocznij
        </button>
      </div>
    </motion.div>
  );
};

export default SurveyCard;