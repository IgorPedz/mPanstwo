import { motion } from "framer-motion";
import ICON_MAP from "../../../Utils/Maps/Icons";
import useFormatDate from "../../../Utils/Dynamic/useFormatDate";

export default function ArchiveSurveyCard({ survey, onOpen }) {
  const ClipboardIcon =
    ICON_MAP["clipboard"] || ICON_MAP["star"];

  const ClockIcon =
    ICON_MAP["clock"] || ICON_MAP["calendar"];

  const isExpired =
    survey.deadline &&
    new Date(survey.deadline) < new Date();

  const formattedDeadline = useFormatDate(
    survey.deadline
  );

  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      className="
        color-transition
        relative
        bg-white dark:bg-slate-900
        p-6
        rounded-[2.5rem]
        border border-slate-200 dark:border-slate-800
        shadow-sm hover:shadow-xl hover:shadow-blue-500/5
        overflow-hidden
      "
    >
      {survey.deadline && (
        <div className="absolute top-0 right-8">
          <div
            className={`
              px-4 py-2
              rounded-b-2xl
              flex items-center gap-2
              text-white
              shadow-lg
              color-transition

              ${
                isExpired
                  ? "bg-slate-600 shadow-slate-600/20"
                  : "bg-rose-500 shadow-rose-500/20"
              }
            `}
          >
            <ClockIcon className="h-3 w-3" />

            <span className="text-[10px] font-black uppercase tracking-wider">
              {isExpired
                ? "Zakończona"
                : `Do ${formattedDeadline}`}
            </span>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div
          className="
            color-transition
            p-4 w-fit
            bg-blue-50 dark:bg-blue-900/20
            text-blue-600
            rounded-2xl
          "
        >
          <ClipboardIcon className="h-6 w-6" />
        </div>
      </div>

      <h3 className="color-transition text-xl font-black text-slate-900 dark:text-white">
        {survey.title}
      </h3>

      <p className="text-xs text-blue-500 font-bold tracking-tight mt-1">
        {survey.category}
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpen(survey);
        }}
        className="
          mt-6
          inline-flex items-center gap-2
          cursor-pointer
          px-5 py-3
          rounded-2xl
          bg-slate-900 dark:bg-white
          text-white dark:text-slate-900
          text-[10px] font-black uppercase tracking-widest
          hover:shadow-lg
          active:scale-95
          transition-all duration-200
          color-transition
        "
      >
        Moje odpowiedzi
      </button>
    </motion.div>
  );
}