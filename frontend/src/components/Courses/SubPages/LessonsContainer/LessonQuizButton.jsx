import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function LessonQuizButton({
  IsQuizAlreadyDone,
  allDone,
  courseId,
  lessonId,
  setQuizOpen,
  isLastLesson,
  examPassed,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToExam = () =>
    navigate(`/courses/${courseId}`, { state: { openFinalExam: true } });

  return (
    <>
      {!IsQuizAlreadyDone ? (
        <div className="pt-2">
          <button
            disabled={!allDone}
            onClick={() => setQuizOpen(true)}
            className={`
              w-full p-5 rounded-2xl font-black text-center transition-all duration-300 border
              ${
                allDone
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-0.5 cursor-pointer"
                  : "bg-slate-100 dark:bg-slate-900/50 text-slate-400 border-slate-200/60 dark:border-slate-800/60 cursor-not-allowed"
              }
            `}
          >
            {allDone
              ? isLastLesson
                ? t("courses.quiz.go_to_exam")
                : t("courses.startQuiz")
              : t("courses.lockedQuiz")}
          </button>
        </div>
      ) : (
        <div className="pt-2 space-y-3">
          <div className="w-full p-5 rounded-2xl font-black text-center border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            {t("courses.completedQuiz")}
          </div>

          {isLastLesson && examPassed ? (
            <button
              onClick={() => navigate(`/courses/${courseId}`)}
              className="w-full p-5 rounded-2xl font-black text-center border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all duration-300 cursor-pointer"
            >
              🏆 {t("courses.courseCompleted")}
            </button>
          ) : isLastLesson ? (
            <button
              onClick={goToExam}
              className="w-full p-5 rounded-2xl font-black text-center bg-amber-500 hover:bg-amber-400 text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              📝 {t("courses.quiz.go_to_exam")}
            </button>
          ) : (
            <button
              onClick={() =>
                navigate(`/courses/${courseId}/lesson/${parseInt(lessonId) + 1}`)
              }
              className="w-full p-5 rounded-2xl font-black text-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-95 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              ➜ {t("courses.nextLesson")}
            </button>
          )}
        </div>
      )}
    </>
  );
}
