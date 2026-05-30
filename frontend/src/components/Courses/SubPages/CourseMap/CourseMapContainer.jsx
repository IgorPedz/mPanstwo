import { useLayoutEffect, useRef, useState, useEffect } from "react";

import CoursePath from "./CoursePath";
import CourseRow from "./CourseRow";
import { useCourseProgress } from "../../../../Hooks/useCourseProgress";

export default function CourseMapContainer({ course, currentLessonId }) {
  const containerRef = useRef(null);
  const buttonRefs = useRef({});

  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({
    width: 0,
    height: 0,
  });

  // 1. Zastępujemy stałą wartość stanem, by reagować na szerokość okna
  const [itemsPerRow, setItemsPerRow] = useState(4);

  const { completedLessons } = useCourseProgress(course.id);
  const lessons = course?.lessons || [];

  // 2. Nasłuchujemy zmiany szerokości ekranu, aby dostosować liczbę lekcji w rzędzie
  useEffect(() => {
    const updateItemsPerRow = () => {
      if (window.innerWidth < 640) {
        setItemsPerRow(2); // Telefony: 2 elementy w rzędzie (lub 1, jeśli wolisz)
      } else if (window.innerWidth < 1024) {
        setItemsPerRow(3); // Tablety: 3 elementy
      } else {
        setItemsPerRow(4); // Desktop: 4 elementy
      }
    };

    updateItemsPerRow(); // Wywołanie początkowe
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
    const points = [];

    lessons.forEach((lesson) => {
      const btn = buttonRefs.current[lesson.id];
      if (!btn) return;

      const rect = btn.getBoundingClientRect();

      points.push({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
      });
    });

    if (!points.length) return;

    const d = points.reduce((acc, point, index) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }

      const prev = points[index - 1];
      const cy = (prev.y + point.y) / 2;

      return `${acc} C ${prev.x} ${cy}, ${point.x} ${cy}, ${point.x} ${point.y}`;
    }, "");

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
  // ^ Dodano itemsPerRow do tablicy zależności, by ścieżka odświeżała się przy zmianie liczby elementów w rzędzie

  return (
    // 3. Dodano padding x (px-2 md:px-0), żeby mapa nie dotykała krawędzi ekranu telefonu
    <div className="flex justify-center px-2 md:px-0">
      <div
        ref={containerRef}
        className="
          color-transition
          relative
          w-full
          max-w-6xl
          py-8          {/* Mniejszy padding pionowy na mobilce */}
          md:py-10      {/* Standardowy padding na desktopie */}
          px-4          {/* Wewnętrzny margines na mniejszych ekranach */}
          md:px-8
          rounded-2xl   {/* Nieco mniejsze zaokrąglenie na mobilce */}
          md:rounded-3xl
          bg-slate-50/50
          dark:bg-slate-900/40
          border
          border-slate-200/60
          dark:border-slate-800/50
          backdrop-blur-sm
        "
      >
        <CoursePath
          pathD={pathD}
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
