import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CoursePath({
  pathD,
  points = [],
  svgDimensions,
  lessons,
  completedLessons = [],
}) {
  const measureRef = useRef(null);

  const [pathLength, setPathLength] = useState(0);
  const [targetOffset, setTargetOffset] = useState(0);

  const completedSet = new Set(completedLessons);
  const nextLessonIndex = lessons.findIndex((l) => !completedSet.has(l.id));

  useEffect(() => {
    if (!measureRef.current || !pathD || !lessons.length || !points.length) return;

    const svgPath = measureRef.current;
    const totalLength = svgPath.getTotalLength();
    setPathLength(totalLength);

    // Wszystkie lekcje ukończone → linia dochodzi do egzaminu (odblokowany)
    if (nextLessonIndex === -1) {
      setTargetOffset(0);
      return;
    }

    // Nawet pierwsza lekcja nie jest zrobiona
    if (nextLessonIndex === 0) {
      const firstPoint = points.find((p) => p.id === lessons[0].id);
      if (firstPoint) {
        const len = findLengthAtPoint(svgPath, firstPoint.x, firstPoint.y, totalLength);
        setTargetOffset(totalLength - len);
      } else {
        setTargetOffset(totalLength);
      }
      return;
    }

    // Rysuj do pierwszej nieukończonej lekcji
    const targetLesson = lessons[nextLessonIndex];
    const targetPoint = points.find((p) => p.id === targetLesson.id);

    if (targetPoint) {
      const len = findLengthAtPoint(svgPath, targetPoint.x, targetPoint.y, totalLength);
      setTargetOffset(totalLength - len);
    } else {
      const ratio = nextLessonIndex / (lessons.length - 1);
      setTargetOffset(totalLength * (1 - ratio));
    }
  }, [pathD, lessons, completedLessons, nextLessonIndex, points]);

  // Skanowanie ścieżki (Pitagoras)
  const findLengthAtPoint = (pathNode, targetX, targetY, totalLength) => {
    let bestLength = 0;
    let minDistance = Infinity;
    const precision = 200;

    for (let i = 0; i <= precision; i++) {
      const length = (totalLength * i) / precision;
      const point = pathNode.getPointAtLength(length);
      
      const distance = Math.sqrt(
        Math.pow(point.x - targetX, 2) + Math.pow(point.y - targetY, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        bestLength = length;
      }
    }
    return bestLength;
  };

  if (!pathD) return null;

  return (
    <svg
      className="absolute inset-0 pointer-events-none z-0"
      width={svgDimensions.width}
      height={svgDimensions.height}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <defs>
        <linearGradient id="coursePathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="70%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>

      {/* BACKGROUND */}
      <path
        d={pathD}
        fill="none"
        strokeWidth="18"
        strokeLinecap="round"
        className="stroke-slate-200 dark:stroke-slate-800"
      />

      {/* PROGRESS */}
      {pathLength > 0 && (
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#coursePathGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
          initial={{ strokeDashoffset: pathLength }}
          animate={{ strokeDashoffset: targetOffset }}
          transition={{
            type: "spring",
            stiffness: 70,
            damping: 18,
          }}
        />
      )}

      <path ref={measureRef} d={pathD} fill="none" stroke="transparent" />
    </svg>
  );
}