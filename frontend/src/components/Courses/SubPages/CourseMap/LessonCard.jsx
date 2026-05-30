import { useTranslation } from "react-i18next";

export default function LessonCard({ lesson, actualIndex, unlocked }) {
  const { t } = useTranslation();
  return (
    <div
      className={`
        mt-5
        w-full
        p-5
        rounded-[1.5rem]
        border
        transition-all

        ${
          unlocked
            ? `
              bg-white
              dark:bg-slate-900
              border-slate-200
              dark:border-slate-800
              hover:border-blue-300
              dark:hover:border-blue-900
              hover:shadow-lg
            `
            : `
              bg-slate-50
              dark:bg-slate-900/40
              border-slate-200
              dark:border-slate-800/60
              opacity-50
            `
        }
      `}
    >
      <span
        className={`
          block
          text-[9px]
          font-black
          uppercase
          tracking-[0.2em]
          mb-2

          ${unlocked ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}
        `}
      >
        {t("courses.lessons")} {actualIndex + 1}
      </span>

      <h3
        className={`
          font-bold
          text-sm
          leading-tight

          ${
            unlocked
              ? "text-slate-900 dark:text-white"
              : "text-slate-500 dark:text-slate-600"
          }
        `}
      >
        {t(`courses.${lesson.course_slug}.lessons.${lesson.slug}.title`)}
      </h3>
    </div>
  );
}
