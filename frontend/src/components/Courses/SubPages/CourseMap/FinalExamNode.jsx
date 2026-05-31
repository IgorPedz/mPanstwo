import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import FinalExamModal from "./FinalExamModal";

export default function FinalExamNode({
  course,
  completedLessons,
  totalLessons,
  examPassed,
  onExamPass,
}) {
  const { t } = useTranslation();
  const [examOpen, setExamOpen] = useState(false);

  const allCompleted =
    completedLessons.length >= totalLessons && totalLessons > 0;
  const ui = (key) => t(`courses.final_exam.${key}`);

  return (
    <div className="w-full">
      <motion.button
        disabled={!allCompleted || examPassed}
        onClick={() => allCompleted && !examPassed && setExamOpen(true)}
        whileHover={allCompleted && !examPassed ? { scale: 1.005 } : {}}
        whileTap={allCompleted && !examPassed ? { scale: 0.995 } : {}}
        className={`
          w-full text-left rounded-2xl border p-5 transition-all duration-200 color-transition
          ${
            examPassed
              ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 cursor-default"
              : allCompleted
                ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-lg cursor-pointer"
                : "bg-slate-50 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/40 cursor-not-allowed opacity-60"
          }
        `}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Left: icon + text */}
          <div className="flex items-center gap-4 min-w-0">
            <div
              className={`
                shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl
                ${
                  examPassed
                    ? "bg-emerald-100 dark:bg-emerald-900/40"
                    : allCompleted
                      ? "bg-amber-100 dark:bg-amber-900/40"
                      : "bg-slate-100 dark:bg-slate-800"
                }
              `}
            >
              {examPassed ? "🏆" : allCompleted ? "📝" : "🔒"}
            </div>

            <div className="min-w-0">
              <p
                className={`
                  text-[10px] font-black uppercase tracking-[0.2em] mb-0.5
                  ${examPassed ? "text-emerald-600 dark:text-emerald-400" : allCompleted ? "text-amber-600 dark:text-amber-400" : "text-slate-400"}
                `}
              >
                {ui("label")}
              </p>
              <h3
                className={`
                  font-black text-base leading-tight
                  ${examPassed || allCompleted ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-500"}
                `}
              >
                {ui("title")}
              </h3>
              <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                {examPassed
                  ? ui("completed_label")
                  : allCompleted
                    ? ui("pass_info", { pass: 7, total: 10 })
                    : ui("locked")}
              </p>
            </div>
          </div>

          {/* Right: badge or CTA */}
          {examPassed ? (
            <div className="shrink-0 px-4 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-black uppercase tracking-wide">
              Zaliczony
            </div>
          ) : allCompleted ? (
            <div className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-white text-xs font-black uppercase tracking-wide transition-colors">
              Rozpocznij
              <span className="text-base">→</span>
            </div>
          ) : (
            <div className="shrink-0 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs font-black uppercase tracking-wide">
              Zablokowany
            </div>
          )}
        </div>
      </motion.button>

      {examOpen && (
        <FinalExamModal
          courseSlug={course.slug}
          courseId={course.id}
          onClose={() => setExamOpen(false)}
          onPass={() => {
            setExamOpen(false);
            onExamPass?.();
          }}
        />
      )}
    </div>
  );
}
