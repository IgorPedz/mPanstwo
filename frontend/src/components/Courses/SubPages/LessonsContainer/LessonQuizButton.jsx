import { useNavigate } from "react-router-dom";

export default function LessonQuizButton({
  IsQuizAlreadyDone,
  allDone,
  courseId,
  lessonId,
  setQuizOpen,
}) {
  const navigate = useNavigate();
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
              ? "🧠 Rozpocznij końcowy quiz"
              : "🔒 Ukończ wszystkie moduły, aby odblokować quiz"}
          </button>
        </div>
      ) : (
        <div className="pt-2 space-y-3">
          {" "}
          <div className="w-full p-5 rounded-2xl font-black text-center border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            🎉 Ta lekcja wraz z quizem została już w pełni ukończona!
          </div>
          <button
            onClick={() =>
              navigate(`/courses/${courseId}/lesson/${parseInt(lessonId) + 1}`)
            }
            className="
                  w-full
                  p-5
                  rounded-2xl
                  font-black
                  text-center
bg-slate-900 dark:bg-white text-white dark:text-slate-900
                  hover:opacity-95
                  hover:shadow-xl
                  hover:shadow-indigo-500/10
                  hover:-translate-y-0.5
                  transition-all
                  duration-300
                  cursor-pointer
                "
          >
            ➜ Przejdź do następnej lekcji
          </button>
        </div>
      )}
    </>
  );
}
