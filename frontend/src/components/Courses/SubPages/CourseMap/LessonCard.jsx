import { useTranslation } from "react-i18next";

export default function LessonCard({
  lesson,
  actualIndex,
  unlocked,
  completed,
}) {
  const { t } = useTranslation();

  return (
    <div
      className={`
        mt-4 w-full p-4 rounded-2xl border transition-all duration-200 color-transition
        ${
          completed
            ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50"
            : unlocked
              ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800 hover:shadow-md"
              : "bg-slate-50 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/40 opacity-50"
        }
      `}
    >
      <span
        className={`
          block text-[9px] font-black uppercase tracking-[0.2em] mb-1.5
          ${completed ? "text-emerald-600 dark:text-emerald-400" : unlocked ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}
        `}
      >
        {t("courses.lessons")} {actualIndex + 1}
      </span>

      <h3
        className={`
          font-bold text-sm leading-tight
          ${completed || unlocked ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-600"}
        `}
      >
        {t(`courses.${lesson.course_slug}.lessons.${lesson.slug}.title`)}
      </h3>

      {completed ? (
        <p className="mt-1.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
          ✓ {t("courses.completed")}
        </p>
      ) : null}
    </div>
  );
}
