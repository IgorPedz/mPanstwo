import { useNavigate } from "react-router-dom";
import LessonCard from "./LessonCard";
import { motion } from "framer-motion";
export default function LessonNode({
  lesson,
  actualIndex,
  completedLessons,
  buttonRefs,
}) {
  const navigate = useNavigate();

  const lessonCompleted = completedLessons.includes(lesson.id);

  const previousLessonCompleted =
    actualIndex === 0 || completedLessons.includes(lesson.id - 1);

  const unlocked = previousLessonCompleted;

  return (
    <div className="flex flex-col items-center w-full max-w-[220px]">
      <motion.button
        whileHover={unlocked ? { scale: 1.04 } : {}}
        whileTap={unlocked ? { scale: 0.98 } : {}}
        ref={(el) => {
          buttonRefs.current[lesson.id] = el;
        }}
        disabled={!unlocked}
        onClick={() =>
          navigate(`/courses/${lesson.course_id}/lesson/${lesson.id}`)
        }
        className={`
    relative
    w-20 h-20
    rounded-full
    border-4
    flex items-center justify-center
    font-black
    z-20
    color-transition

    ${
      lessonCompleted
        ? `
          bg-emerald-500
          text-white
          border-white
          dark:border-slate-950
          shadow-md shadow-emerald-500/20     cursor-pointer
        `
        : unlocked
          ? `
            bg-slate-900
            dark:bg-white
            text-white
            dark:text-slate-900
            border-white
            dark:border-slate-950
            shadow-md     cursor-pointer
          `
          : `
            bg-slate-100
            dark:bg-slate-800
            text-slate-400
            border-white
            dark:border-slate-950
            cursor-not-allowed
          `
    }
  `}
      >
        {lessonCompleted ? (
          <span className="text-xl">✓</span>
        ) : unlocked ? (
          actualIndex + 1
        ) : (
          <span>🔒</span>
        )}
      </motion.button>

      <LessonCard
        lesson={lesson}
        actualIndex={actualIndex}
        unlocked={unlocked}
      />
    </div>
  );
}
