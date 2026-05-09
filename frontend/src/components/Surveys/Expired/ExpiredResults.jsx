import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import SurveyExpiredResults from "../Archive/Results/SurveyExpiredResults";

export default function ExpiredResults({
  survey,
  onClose,
}) {
  if (!survey) return null;

  const questions = survey?.questions || [];

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md cursor-pointer"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="
          relative w-full max-w-xl
          bg-white dark:bg-slate-900
          rounded-[2.5rem]
          shadow-2xl
          border border-slate-200 dark:border-slate-800 overflow-hidden
        "
      >
        <div className="h-2 w-full bg-amber-500" />

        <div className="p-8">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {survey.title}
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            Wyniki zbiorcze
          </p>

          <div className="mt-4 text-sm font-black">
            Łączna liczba głosów:{" "}
            {Object.keys(survey.answers || {}).length / 3}
          </div>

          <div className="mt-6 space-y-4 max-h-[40vh] overflow-y-auto pr-2">
            {questions.map((q, i) => (
              <div
                key={q.id}
                className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800"
              >
                <p className="text-[10px] uppercase text-slate-400">
                  Pytanie {i + 1}
                </p>

                <p className="font-bold text-slate-900 dark:text-white text-sm mt-1">
                  {q.title}
                </p>

                <div className="mt-3">
                  <SurveyExpiredResults
                    answers={survey.answers}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="
              mt-8 w-full py-4
              bg-slate-900 dark:bg-white
              text-white dark:text-slate-900
              rounded-2xl
              font-black text-xs uppercase
              cursor-pointer
            "
          >
            Zamknij
          </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}