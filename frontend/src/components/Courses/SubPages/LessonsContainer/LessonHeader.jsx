import {useTranslation} from "react-i18next";

export default function LessonHeader({ lesson }) {
  const { t } = useTranslation();
  return (
    <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm p-8 lg:p-10 color-transition">
      <span className="color-transition inline-block px-3 py-1 text-[10px] font-black tracking-widest uppercase rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
        {t("courses.lessonpage")}
      </span>
      <h1 className="color-transition text-3xl lg:text-4xl font-black mt-4 text-slate-900 dark:text-white tracking-tight">
        {t(`courses.${lesson.course_slug}.lessons.${lesson.slug}.title`)}
      </h1>
      <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-4 mb-2" />
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {t("courses.lessonfooter")}
      </p>
    </div>
  );
}