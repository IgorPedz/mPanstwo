import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ICON_MAP from "../../../../Utils/Maps/Icons";
import { upwardItemVariants } from "../../../../Utils/Animations";
import { useNavigate } from "react-router-dom";

const LOCALE_MAP = {
  pl: "pl-PL",
  en: "en-GB",
  de: "de-DE",
};

const CourseCard = ({ course }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const Icon = ICON_MAP["courses"] || ICON_MAP["star"];

  const total = course.totalLessons || 0;
  const completed = course.completedLessonsCount || 0;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  const isStarted = completed > 0;
  const isCourseCompleted = !!course.courseCompleted;
  const examScore = course.examScore ?? null;
  const completedAt = course.completedAt ? new Date(course.completedAt) : null;

  const locale = LOCALE_MAP[i18n.language] ?? LOCALE_MAP[i18n.language?.split("-")[0]] ?? "pl-PL";

  const formattedDate = completedAt
    ? completedAt.toLocaleDateString(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <motion.div
      variants={upwardItemVariants}
      whileHover={{ y: -6 }}
      className="
        group relative overflow-hidden
        rounded-[2rem]
        border border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900
        shadow-sm hover:shadow-2xl hover:shadow-black/10
        transition-all duration-300
      "
    >
      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={`/images/${course.img}`}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* CATEGORY */}
        <div className="color-transition absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[10px] font-black uppercase text-slate-700 dark:text-slate-200">
          {t(`courses.${course.slug}.category`)}
        </div>

        {/* BADGE */}
        {isCourseCompleted ? (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase flex items-center gap-1.5">
            ✓ {t("courses.completed")}
          </div>
        ) : null}

        {/* HEADER */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
              <Icon className="h-5 w-5 text-white" />
            </div>
            <span className="text-[11px] text-white/80 font-bold uppercase tracking-wider">
              {t(`courses.${course.slug}.level`)}
            </span>
          </div>
          <h3 className="text-white text-lg font-black line-clamp-2">
            {t(`courses.${course.slug}.title`)}
          </h3>
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
          {t(`courses.${course.slug}.description`)}
        </p>

        {isCourseCompleted && (
          <div className="color-transition mb-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-950/20 p-3 flex flex-col gap-1.5">
            {examScore !== null && (
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                  {t("courses.quiz.exam_result")}
                </span>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                  {examScore} / 10
                </span>
              </div>
            )}
            {formattedDate && (
              <div className="color-transition flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <span>📅</span>
                <span>{t("courses.completedOn", { date: formattedDate })}</span>
              </div>
            )}
          </div>
        )}

        {!isCourseCompleted && (
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-[11px] font-bold uppercase text-slate-500">
                {t("courses.progress")}
              </span>
              <span className="text-sm font-black text-slate-700 dark:text-slate-200">
                {progress}%
              </span>
            </div>
            <div className="color-transition h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* META */}
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-5">
          <div className="flex items-center gap-1.5">
            <span>⏱</span>
            <span>{course.estimated_hours}h</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>📚</span>
            <span>{total} {t("courses.lesson")}</span>
          </div>
        </div>

        {/* BUTTON */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(`/courses/${course.id}`)}
          className={`cursor-pointer color-transition w-full py-3 rounded-2xl font-black text-sm uppercase tracking-wider transition-all
            ${
              isCourseCompleted
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-400/30"
                : "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
            }
          `}
        >
          {isCourseCompleted
            ? t("courses.review")
            : isStarted
              ? t("courses.continue")
              : t("courses.start")}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CourseCard;
