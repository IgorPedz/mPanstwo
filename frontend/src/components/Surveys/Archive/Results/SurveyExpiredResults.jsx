import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
export default function SurveyResultBar({ answers = {} }) {
  const {t} = useTranslation()
  const parsedAnswers =
    typeof answers === "string"
      ? JSON.parse(answers)
      : answers;

  const result = Object.values(parsedAnswers).reduce(
    (acc, value) => {
      if (value === "yes") acc.yes += 1;
      if (value === "no") acc.no += 1;

      return acc;
    },
    { yes: 0, no: 0 },
  );

  const total = result.yes + result.no;

  const yesPercent =
    total > 0
      ? Math.round((result.yes / total) * 100)
      : 0;

  const noPercent =
    total > 0
      ? Math.round((result.no / total) * 100)
      : 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
        <span className="text-rose-500">
          {t("surveys.no")} {noPercent}%
        </span>

        <span className="text-emerald-500">
          {t("surveys.yes")} {yesPercent}%
        </span>
      </div>

      <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${noPercent}%` }}
          transition={{ duration: 0.8 }}
          className="absolute left-0 top-0 h-full bg-rose-500"
        />

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${yesPercent}%` }}
          transition={{ duration: 0.8 }}
          className="absolute right-0 top-0 h-full bg-emerald-500"
        />
      </div>
    </div>
  );
}