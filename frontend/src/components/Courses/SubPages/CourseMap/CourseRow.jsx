import LessonNode from "./LessonNode";
import { useCourseProgress } from "../../../../Hooks/useCourseProgress";

export default function CourseRow({
  rowLessons,
  rowIndex,
  course,
  buttonRefs,
}) {
  const { completedLessons } = useCourseProgress(course.id);
  const reverse = rowIndex % 2 !== 0;

  const displayedLessons = reverse ? [...rowLessons].reverse() : rowLessons;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 justify-items-center">
      {displayedLessons.map((lesson) => {
        const actualIndex = course.lessons.findIndex((l) => l.id === lesson.id);

        return (
          <LessonNode
            key={lesson.id}
            lesson={lesson}
            actualIndex={actualIndex}
            buttonRefs={buttonRefs}
            courseId={course.id}
            completedLessons={completedLessons}
          />
        );
      })}
    </div>
  );
}
