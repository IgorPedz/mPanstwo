import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
export default function SurveyResults({ questions = [], data = {} }) {
  const { t } = useTranslation()
  if (questions.length === 0) {
    return <p className="text-xs text-slate-400 italic">Brak danych</p>;
  }

  return (
    <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 mt-6">
      {questions.map((q, index) => {
        const answer = data[q.id];

        return (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="
              color-transition
              p-4 rounded-2xl
              border border-slate-100 dark:border-slate-800
              bg-white dark:bg-slate-900
            "
          >
            <p className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">
              {t("surveys.question")} {index + 1}
            </p>

            <p className="color-transition font-bold text-slate-900 dark:text-white text-sm mt-1">
              {q.title}
            </p>
            <p className="color-transition mt-3 text-sm text-blue-600 dark:text-blue-400 font-black uppercase tracking-wide">
              {t(`common.${answer}`)}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
