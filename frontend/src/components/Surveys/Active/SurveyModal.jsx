import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import ICON_MAP from "../../../Utils/Maps/Icons";
import useSurvey from "../../../Hooks/useSurveys";

const SurveyModal = ({ open, onClose, survey, onInfo, onFinished }) => {
  const ZapIcon = ICON_MAP["zap"] || ICON_MAP["sparkles"];

  const { currentStep, question, handleAnswer, handleBack, progress } =
    useSurvey(open, survey, onClose, onInfo, onFinished);

  if (!open || !survey || !question) return null;

  const modalContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 30 }}
          className="relative w-full max-w-6xl bg-white dark:bg-slate-900 rounded-[3.5rem] border border-white/20 shadow-2xl overflow-hidden z-10"
        >
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
            <div className="lg:col-span-4 bg-slate-50/50 dark:bg-slate-800/50 p-10 md:p-14 border-r border-slate-100 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest mb-8 shadow-lg shadow-blue-500/30">
                  <ZapIcon className="h-4 w-4" />
                  {survey.reward}
                </div>
                <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-4 leading-none">
                  {survey.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {survey.description}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-slate-400">
                  <span className="text-5xl font-black text-slate-200 dark:text-slate-700">
                    {String(currentStep + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                  <span className="text-xl font-bold uppercase tracking-tighter">
                    Pytanie
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-blue-600"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 p-10 md:p-20 flex flex-col justify-center relative">
              <span className="absolute top-10 right-20 text-[180px] font-black text-slate-50 dark:text-slate-800/50 pointer-events-none select-none">
                {currentStep + 1}
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="relative z-10"
                >
                  <span className="text-blue-600 font-black text-sm uppercase tracking-[0.2em] mb-4 block">
                    {survey.category} • {survey.time}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-12 leading-[1.1]">
                    {question.title}
                  </h2>

                  <div className="grid grid-cols-1 gap-4">
                    {question.options.map((opt, idx) => (
                      <motion.button
                        key={opt.value}
                        whileHover={{ x: 10 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(opt.value)}
                        className="cursor-pointer group flex items-center justify-between p-6 md:p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 border-2 border-transparent hover:border-blue-600 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 text-left"
                      >
                        <span className="flex items-center gap-6">
                          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-700 text-slate-400 group-hover:bg-blue-600 group-hover:text-white font-black transition-colors">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="text-xl font-bold text-slate-700 dark:text-slate-200">
                            {opt.label}
                          </span>
                        </span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600">
                          →
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="mt-12 flex items-center justify-between">
                <button
                  disabled={currentStep === 0}
                  onClick={handleBack}
                  className={`cursor-pointer text-sm font-black uppercase tracking-widest transition-opacity ${currentStep === 0 ? "opacity-0" : "opacity-40 hover:opacity-100 text-slate-900 dark:text-white"}`}
                >
                  ← Wróć
                </button>
                <button
                  onClick={onClose}
                  className="cursor-pointer text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest"
                >
                  Zamknij ankietę
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default SurveyModal;
