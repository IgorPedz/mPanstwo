import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CoursePath from "./CoursePath";
import CourseRow from "./CourseRow";
import FinalExamNode from "./FinalExamNode";
import FinalExamModal from "./FinalExamModal";
import { useCourseProgress } from "../../../../Hooks/useCourseProgress";
import { useCourseCompletion } from "../../../../hooks/useCourseCompletion";

export default function CourseMapContainer({ course, currentLessonId }) {
  const containerRef = useRef(null);
  const buttonRefs = useRef({});

  const [pathD, setPathD] = useState("");
  const [points, setPoints] = useState([]);
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const [itemsPerRow, setItemsPerRow] = useState(4);
  const { completedLessons } = useCourseProgress(course.id);
  const lessons = course?.lessons || [];

  const { completed: examPassed, refetch: refetchCompletion } = useCourseCompletion(course.id);
  const allLessonsCompleted = completedLessons.length >= lessons.length && lessons.length > 0;

  const location = useLocation();
  const [autoExamOpen, setAutoExamOpen] = useState(
    () => location.state?.openFinalExam === true
  );

  useEffect(() => {
    const updateItemsPerRow = () => {
      if (window.innerWidth < 640) setItemsPerRow(2);
      else if (window.innerWidth < 1024) setItemsPerRow(3);
      else setItemsPerRow(4);
    };
    updateItemsPerRow();
    window.addEventListener("resize", updateItemsPerRow);
    return () => window.removeEventListener("resize", updateItemsPerRow);
  }, []);

  const rows = [];
  for (let i = 0; i < lessons.length; i += itemsPerRow) {
    rows.push(lessons.slice(i, i + itemsPerRow));
  }

  const updatePath = () => {
    if (!containerRef.current || !lessons.length) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const calculatedPoints = [];

    lessons.forEach((lesson) => {
      const btn = buttonRefs.current[lesson.id];
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      calculatedPoints.push({
        id: lesson.id,
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
      });
    });

    if (!calculatedPoints.length) return;


    setPoints(calculatedPoints);

    let d = `M ${calculatedPoints[0].x} ${calculatedPoints[0].y}`;
    for (let i = 1; i < calculatedPoints.length; i++) {
      d += ` L ${calculatedPoints[i].x} ${calculatedPoints[i].y}`;
    }

    setPathD(d);
    setSvgDimensions({ width: containerRect.width, height: containerRect.height });
  };

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => requestAnimationFrame(updatePath));
    observer.observe(containerRef.current);
    requestAnimationFrame(updatePath);
    return () => observer.disconnect();
  }, [course, currentLessonId, completedLessons, itemsPerRow, examPassed]);

  return (
    <>
    <div className="flex justify-center px-2 md:px-0">
      <div
        ref={containerRef}
        className="color-transition relative w-full max-w-6xl rounded-2xl md:rounded-3xl overflow-hidden
          border border-slate-200/70 dark:border-slate-800/60
          bg-white dark:bg-slate-900
          shadow-sm"
      >
        {/* Subtle dot pattern background */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Progress strip at top */}
        <div className="relative h-1 w-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-700"
            style={{
              width: lessons.length
                ? `${Math.round((completedLessons.length / lessons.length) * 100)}%`
                : "0%",
            }}
          />
        </div>

        <div className="relative p-6 md:p-10">
          <CoursePath
            pathD={pathD}
            points={points}
            svgDimensions={svgDimensions}
            lessons={lessons}
            currentLessonId={currentLessonId}
            completedLessons={completedLessons}
          />

          <div className="flex flex-col gap-16 sm:gap-20 md:gap-24 relative">
            {rows.map((rowLessons, rowIndex) => (
              <CourseRow
                key={rowIndex}
                rowLessons={rowLessons}
                rowIndex={rowIndex}
                course={course}
                buttonRefs={buttonRefs}
                completedLessons={completedLessons}
              />
            ))}

            <FinalExamNode
              course={course}
              completedLessons={completedLessons}
              totalLessons={lessons.length}
              examPassed={examPassed}
              onExamPass={refetchCompletion}
            />
          </div>
        </div>
      </div>
    </div>

    {autoExamOpen && !examPassed && (
      <FinalExamModal
        courseSlug={course.slug}
        courseId={course.id}
        onClose={() => setAutoExamOpen(false)}
        onPass={() => {
          setAutoExamOpen(false);
          refetchCompletion();
        }}
      />
    )}
    </>
  );
}
