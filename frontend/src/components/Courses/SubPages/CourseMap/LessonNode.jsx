import { useNavigate } from "react-router-dom";
import LessonCard from "./LessonCard";

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
      <button
        ref={(el) => {
          buttonRefs.current[lesson.id] = el;
        }}
        disabled={!unlocked}
        onClick={() =>
          navigate(`/courses/${lesson.course_id}/lesson/${lesson.order_index}`)
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
                border-white dark:border-slate-950
              `
              : unlocked
                ? `
                  bg-slate-900
                  dark:bg-white
                  text-white
                  dark:text-slate-900
                  border-white
                  dark:border-slate-950
                  hover:scale-110
                  cursor-pointer
                `
                : `
                  bg-slate-100
                  dark:bg-slate-800
                  text-slate-400
                  border-white
                  dark:border-slate-950
                `
          }
        `}
      >
        {lessonCompleted ? "✓" : actualIndex + 1}
      </button>

      <LessonCard
        lesson={lesson}
        actualIndex={actualIndex}
        unlocked={unlocked}
      />
    </div>
  );
}
