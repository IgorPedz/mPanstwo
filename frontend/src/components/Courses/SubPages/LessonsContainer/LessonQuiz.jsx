import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../../../Contexts/UserContext";
import { useLessonQuiz } from "../../../../Hooks/useLessonQuiz";

export default function QuizModal({ onClose }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const { lessonId, courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  // 1. Wyciągamy loadingQuiz oraz error z poprawionego hooka
  const { quiz, loadingQuiz, error } = useLessonQuiz(lessonId);

  const completeQuiz = async () => {
    try {
      await fetch("http://localhost:5000/courses/lesson/quiz-complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          courseId,
          lessonId,
        }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  // 2. Bezpieczne przypisanie - zapobiega crashom przed załadowaniem tablicy
  const current = quiz && quiz.length > 0 ? quiz[step] : null;

  const canContinue = score >= 2; 

  const handleAnswer = (index) => {
    if (!current) return; // Strażnik na wypadek niespodziewanego kliknięcia
    setSelected(index);
    const isCorrect = index === current.correct;

    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      const next = step + 1;

      if (next < quiz.length) {
        setStep(next);
        setSelected(null);
      } else {
        setIsFinished(true);
      }
    }, 800);
  };

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto color-transition">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-slate-950/40 dark:bg-black/60 backdrop-blur-md color-transition"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="relative w-full max-w-xl rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100 color-transition min-h-[250px] flex flex-col justify-center"
      >
        {/* Przycisk zamknięcia – widoczny zawsze, niezależnie od stanu ładowania */}
        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg grid place-items-center bg-slate-50 dark:bg-slate-800/60 text-slate-400 hover:text-red-500 transition-colors color-transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        <AnimatePresence mode="wait">
          {loadingQuiz ? (
            /* A. STAN ŁADOWANIA PYTAŃ */
            <motion.div
              key="loading-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 text-center flex flex-col items-center justify-center space-y-4"
            >
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-slate-500">Wczytywanie pytań...</p>
            </motion.div>
          ) : error || !quiz || quiz.length === 0 ? (
            /* B. STAN BŁĘDU LUB BRAKU DANYCH */
            <motion.div
              key="error-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 text-center flex flex-col items-center justify-center space-y-3"
            >
              <div className="text-3xl">⚠️</div>
              <h3 className="text-lg font-black">Błąd ładowania quizu</h3>
              <p className="text-sm text-slate-400">Spróbuj odświeżyć stronę lub wróć do lekcji.</p>
            </motion.div>
          ) : !isFinished ? (
            /* C. WŁAŚCIWY QUIZ (Uruchomi się dopiero, gdy quiz ma elementy) */
            <motion.div
              key="quiz-step"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800/60 color-transition">
                <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  Sprawdzian wiedzy
                </span>

                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-4">
                  Pytanie {step + 1} z {quiz.length}
                </p>

                <div className="mt-2 h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((step + 1) / quiz.length) * 100}%`,
                    }}
                  />
                </div>
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
                      if (isCorrect)
                        styles =
                          "bg-emerald-500/10 border-emerald-500 text-emerald-500 font-bold";
                      else if (isSelected && !isCorrect)
                        styles =
                          "bg-red-500/10 border-red-500 text-red-500 font-bold";
                      else styles = "opacity-40";
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
            /* D. EKRAN PODSUMOWANIA WYNIKU */
            <motion.div
              key="quiz-result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 text-center flex flex-col items-center"
            >
              <div className="text-3xl mb-2">🎉</div>

              <h3 className="text-2xl font-black">Wynik</h3>

              <div className="my-6 text-4xl font-black text-indigo-500">
                {score} <span className="text-lg">/ {quiz.length}</span>
              </div>

              {canContinue && (
                <button
                  onClick={async () => {
                    await completeQuiz();
                    navigate(
                      `/courses/${courseId}/lesson/${parseInt(lessonId) + 1}`,
                    );
                    onClose();
                  }}
                  className="w-full mb-3 p-4 rounded-xl font-black bg-indigo-500 text-white hover:bg-indigo-400 transition cursor-pointer"
                >
                  ➜ Następna lekcja
                </button>
              )}

              <button
                onClick={onClose}
                className="w-full p-4 rounded-xl font-black bg-slate-900 dark:bg-white text-white dark:text-slate-900 cursor-pointer"
              >
                Wróć do lekcji
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );

  return createPortal(modalContent, document.body);
}