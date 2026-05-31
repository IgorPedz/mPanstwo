import { useLayoutEffect, useRef, useState, useEffect } from "react";
import CoursePath from "./CoursePath";
import CourseRow from "./CourseRow";
import { useCourseProgress } from "../../../../Hooks/useCourseProgress";

export default function CourseMapContainer({ course, currentLessonId }) {
  const containerRef = useRef(null);
  const buttonRefs = useRef({});

  const [pathD, setPathD] = useState("");
  const [points, setPoints] = useState([]); // 🔥 NOWY STAN na współrzędne lekcji
  const [svgDimensions, setSvgDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [itemsPerRow, setItemsPerRow] = useState(4);
  const { completedLessons } = useCourseProgress(course.id);
  const lessons = course?.lessons || [];

  useEffect(() => {
    const updateItemsPerRow = () => {
      if (window.innerWidth < 640) {
        setItemsPerRow(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerRow(3);
      } else {
        setItemsPerRow(4);
      }
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
    const calculatedPoints = []; // Lokalna tablica na punkty

    lessons.forEach((lesson) => {
      const btn = buttonRefs.current[lesson.id];
      if (!btn) return;

      const rect = btn.getBoundingClientRect();

      calculatedPoints.push({
        id: lesson.id, // 🔥 Ważne: przekazujemy ID lekcji, żeby sparować ją z postępem
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
      });
    });

    if (!calculatedPoints.length) return;

    // Aktualizujemy stan punktów
    setPoints(calculatedPoints);

    let d = `M ${calculatedPoints[0].x} ${calculatedPoints[0].y}`;
    for (let i = 1; i < calculatedPoints.length; i++) {
      const curr = calculatedPoints[i];
      d += ` L ${curr.x} ${curr.y}`;
    }

    setPathD(d);

    setSvgDimensions({
      width: containerRect.width,
      height: containerRect.height,
    });
  };

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(updatePath);
    });

    observer.observe(containerRef.current);
    requestAnimationFrame(updatePath);

    return () => observer.disconnect();
  }, [course, currentLessonId, completedLessons, itemsPerRow]);

  return (
    <div className="flex justify-center px-2 md:px-0">
      <div
        ref={containerRef}
        className="color-transition relative w-full max-w-6xl py-8 md:py-10 px-4 md:px-8 rounded-2xl md:rounded-3xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/50 backdrop-blur-sm"
      >
        <CoursePath
          pathD={pathD}
          points={points} 
          svgDimensions={svgDimensions}
          lessons={lessons}
          currentLessonId={currentLessonId}
          completedLessons={completedLessons}
        />

        <div className="flex flex-col gap-16 sm:gap-24 md:gap-32 relative">
          {rows.map((rowLessons, rowIndex) => (
            <CourseRow
              key={rowIndex}
              rowLessons={rowLessons}
              rowIndex={rowIndex}
              course={course}
              buttonRefs={buttonRefs}
            />
          ))}
        </div>
      </div>
    </div>
  );
}