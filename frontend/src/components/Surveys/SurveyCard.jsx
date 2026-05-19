import { motion } from "framer-motion";
import ICON_MAP from "../../Utils/Maps/Icons";
import { upwardItemVariants } from "../../Utils/Animations";
import useFormatDate from "../../Utils/Dynamic/useFormatDate";
import { useUser } from "../../Contexts/UserContext";
const SurveyCard = ({ survey, onStart }) => {
  const { user: authUser } = useUser();
  const ClipboardIcon = ICON_MAP["clipboard"] || ICON_MAP["star"];
  const ZapIcon = ICON_MAP["zap"] || ICON_MAP["sparkles"];
  const ClockIcon = ICON_MAP["clock"] || ICON_MAP["calendar"];

  const formattedDeadline = useFormatDate(survey.deadline);
  const isExpired =
    survey.deadline && new Date(survey.deadline).getTime() <= Date.now();

  const hasVoted =
    typeof survey?.answers === "object" &&
    survey.answers !== null &&
    Object.keys(survey.answers).length > 0;
  return (
    <motion.div
      variants={upwardItemVariants}
      whileHover={!isExpired ? { y: -8, transition: { duration: 0.2 } } : {}}
      className={`
        relative p-6 rounded-[2.5rem] border transition-all overflow-hidden

        ${
          isExpired
            ? "bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 opacity-70"
            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
        }

        shadow-sm hover:shadow-xl hover:shadow-blue-500/5 color-transition
      `}
    >
      {isExpired && (
        <>
          <div
            className="
        absolute top-6 -left-14 rotate-[-45deg]
        bg-red-500 text-white
        w-50 text-center
        py-1.5
        text-[10px] font-black uppercase tracking-[0.25em]
        shadow-lg shadow-red-500/30
        z-30
        color-transition
      "
          >
            Zakończona
          </div>

          <div
            className={`
        absolute top-11 -left-10 rotate-[-45deg]
        w-55 text-center
        py-1
        text-[10px] font-black uppercase tracking-[0.25em]
        shadow-lg z-30
        color-transition

        ${
          hasVoted
            ? "bg-emerald-500 text-white shadow-emerald-500/30"
            : "bg-slate-500 text-white shadow-slate-500/30"
        }
      `}
          >
            {hasVoted ? "Oddano głos" : "Brak głosu"}
          </div>
        </>
      )}
      {survey.deadline && !isExpired && (
        <div className="absolute top-0 right-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className={`
        px-4 py-2 rounded-b-2xl
        flex items-center gap-2
        shadow-lg
        text-white text-[10px]
        font-black uppercase tracking-wider
        color-transition

        ${
          isExpired
            ? "bg-slate-500 shadow-slate-500/20"
            : "bg-rose-500 shadow-rose-500/20"
        }
      `}
          >
            <ClockIcon className="h-3 w-3" />
            Do {formattedDeadline}
          </motion.div>
        </div>
      )}
      <div className="flex justify-between items-start mb-6">
        <div
          className={`
            p-4 rounded-2xl transition-all

            ${
              isExpired
                ? "bg-slate-200 dark:bg-slate-800 text-slate-500"
                : "bg-blue-50 dark:bg-blue-900/20 text-blue-600"
            }
          `}
        >
          <ClipboardIcon className="h-6 w-6" />
        </div>
      </div>
      <h3 className="color-transition text-xl font-black text-slate-900 dark:text-white mb-2 pr-10">
        {survey.title}
      </h3>
      <div className="flex items-center gap-4 text-xs text-slate-500 mb-6 font-medium">
        <span className="text-blue-500 font-bold">{survey.category}</span>
        <span className="opacity-30">•</span>
        {!isExpired && <span>{survey.time}</span>}
      </div>
      <div className="color-transition flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800">
        {!isExpired && (
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest mb-0.5">
              Nagroda
            </span>

            <div
              className={`flex items-center gap-1.5 font-black text-lg leading-none
              ${isExpired ? "text-slate-400" : "text-blue-600"}
            `}
            >
              <ZapIcon className="h-4 w-4 fill-current" />
              {survey.reward} Reputacji
            </div>
          </div>
        )}
        {isExpired ? (
          <button
            onClick={() => onStart?.(survey)}
            className=" cursor-pointer color-transition text-xs font-black uppercase tracking-widest  bg-slate-900 dark:bg-white
          text-white dark:text-slate-900 px-7 py-3 rounded-2xl hover:shadow-lg"
          >
            {" "}
            Zobacz wyniki{" "}
          </button>
        ) : (
          <button
            onClick={() => onStart(survey)}
            className=" cursor-pointer color-transition text-xs font-black uppercase tracking-widest  bg-slate-900 dark:bg-white
          text-white dark:text-slate-900 px-7 py-3 rounded-2xl hover:shadow-lg"
          >
            {" "}
            Rozpocznij{" "}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default SurveyCard;
