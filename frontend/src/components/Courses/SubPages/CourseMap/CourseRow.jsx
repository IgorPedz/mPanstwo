import LessonNode from "./LessonNode";

export default function CourseRow({
  rowLessons,
  rowIndex,
  course,
  buttonRefs,
  completedLessons,
}) {
  const reverse = rowIndex % 2 !== 0;
  const displayedLessons = reverse ? [...rowLessons].reverse() : rowLessons;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 justify-items-center">
      {displayedLessons.map((lesson) => {
        const actualIndex = course.lessons.findIndex((l) => l.id === lesson.id);
        return (
          <LessonNode
            key={lesson.id}
            lesson={lesson}
            actualIndex={actualIndex}
            buttonRefs={buttonRefs}
            completedLessons={completedLessons}
          />
        );
      })}
    </div>
  );
}
