import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import getData from "../../../Utils/Dynamic/getData";
import SurveyResults from "./Results/SurveyResults";
import { useTranslation } from "react-i18next";
export default function ArchiveResultsModal({
  survey,
  onClose,
}) {
  if (!survey) return null;
  const {t} = useTranslation()
  const rawData = survey?.answers;
  const data = getData(rawData);

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
        <div className="h-2 w-full bg-blue-600" />

        <div className="p-8">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {survey.title}
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            {t("surveys.yourAnswers")}
          </p>

          <div className="mt-6">
            <SurveyResults
              questions={questions}
              data={data}
            />
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
            {t("common.close")}
          </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}