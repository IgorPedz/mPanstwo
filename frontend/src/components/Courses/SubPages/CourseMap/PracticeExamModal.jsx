import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const PRACTICE_COUNT = 5;

function shuffleAndPick(arr, n) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

export default function PracticeExamModal({ courseSlug, onClose }) {
  const { t } = useTranslation();
  const ui = (key, opts) => t(`courses.practice_exam.${key}`, opts);

  const [questions] = useState(() => {
    const courseData = t(`courses.${courseSlug}`, { returnObjects: true });
    const lessons = courseData?.lessons ?? {};
    const pool = Object.values(lessons).flatMap((lesson) =>
      Array.isArray(lesson?.quiz) ? lesson.quiz : [],
    );
    return shuffleAndPick(pool, Math.min(PRACTICE_COUNT, pool.length));
  });

  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const total = Array.isArray(questions) ? questions.length : 0;
  const current = questions?.[step];

  const handleAnswer = (index) => {
    if (selected !== null || !current) return;
    setSelected(index);

    const isCorrect = index === current.correct;
    const newScore = isCorrect ? score + 1 : score;

    setTimeout(() => {
      const next = step + 1;
      if (next < total) {
        setScore(newScore);
        setStep(next);
        setSelected(null);
      } else {
        setScore(newScore);
        setIsFinished(true);
      }
    }, 800);
  };

  const handleRetry = () => {
    setStep(0);
    setScore(0);
    setSelected(null);
    setIsFinished(false);
  };

  const content = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-slate-950/40 dark:bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="relative w-full max-w-2xl rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100 color-transition min-h-[280px] flex flex-col justify-center"
      >
        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg grid place-items-center bg-slate-50 dark:bg-slate-800/60 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!total ? (
            <motion.div
              key="no-questions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 text-center"
            >
              <p className="text-slate-400">Brak pytań próbnych.</p>
            </motion.div>
          ) : !isFinished ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800/60 color-transition">
                <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  {ui("title")}
                </span>

                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-4">
                  {ui("question_counter", { current: step + 1, total })}
                </p>

                <div className="mt-2 h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-400 via-blue-500 to-violet-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / total) * 100}%` }}
                  />
                </div>

                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                  {ui("hint")}
                </p>
              </div>

              <div className="p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-black mb-6">
                  {current?.question}
                </h3>

                <div className="space-y-3">
                  {current?.answers?.map((answer, i) => {
                    const isSelected = selected === i;
                    const isCorrect = i === current.correct;

                    let styles =
                      "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 cursor-pointer";

                    if (selected !== null) {
                      if (isCorrect) {
                        styles =
                          "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold";
                      } else if (isSelected) {
                        styles =
                          "bg-red-500/10 border-red-500 text-red-600 dark:text-red-400 font-bold";
                      } else {
                        styles =
                          "opacity-40 border-slate-200 dark:border-slate-800";
                      }
                    }

                    return (
                      <motion.button
                        key={i}
                        disabled={selected !== null}
                        onClick={() => handleAnswer(i)}
                        className={`w-full p-4 rounded-2xl border text-left transition-all ${styles}`}
                      >
                        {answer}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 text-center flex flex-col items-center gap-4"
            >
              <div className="text-5xl">
                {score === total ? "🌟" : score >= total / 2 ? "📚" : "💡"}
              </div>

              <h3 className="text-2xl font-black">
                {score === total
                  ? ui("perfect")
                  : score >= total / 2
                    ? ui("good")
                    : ui("keep_learning")}
              </h3>

              <div className="text-4xl font-black text-indigo-500">
                {score} / {total}
              </div>

              <p className="text-sm text-slate-400 dark:text-slate-500">
                {ui("no_save_info")}
              </p>

              <button
                onClick={handleRetry}
                className="w-full p-4 rounded-xl font-black bg-indigo-500 hover:bg-indigo-400 text-white transition cursor-pointer"
              >
                {ui("retry")}
              </button>

              <button
                onClick={onClose}
                className="w-full p-3 rounded-xl text-sm font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
              >
                {ui("close")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );

  return createPortal(content, document.body);
}
