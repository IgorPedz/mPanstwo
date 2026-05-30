import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CoursePath({
  pathD,
  svgDimensions,
  lessons,
  completedLessons = [],
}) {
  const pathRef = useRef(null);

  const [pathLength, setPathLength] = useState(0);
  const [targetOffset, setTargetOffset] = useState(0);

  // mapowanie ID -> index
  const completedIndexes = completedLessons
    .map((id) => lessons.findIndex((l) => l.id === id))
    .filter((i) => i !== -1);

  const lastCompletedIndex =
    completedIndexes.length > 0 ? Math.max(...completedIndexes) : -1;

  useEffect(() => {
    if (!pathRef.current || !pathD || !lessons.length) return;

    const totalLength = pathRef.current.getTotalLength();
    setPathLength(totalLength);
    
    let offset = totalLength;

    // 1. nic nie ukończono
    if (lastCompletedIndex === -1) {
      offset = totalLength; // Ścieżka ukryta
    }
    // 2. wszystko ukończone
    else if (lastCompletedIndex >= lessons.length - 1) {
      offset = 0; // Ścieżka w pełni widoczna
    }
    // 3. normalny progress
    else {
      const targetLesson = lessons[lastCompletedIndex];

      // Szukamy X i Y. Upewnij się, że są one przekazywane!
      if (
        targetLesson &&
        typeof targetLesson.x === "number" &&
        typeof targetLesson.y === "number"
      ) {
        let bestLength = 0;
        let minDist = Infinity;

        for (let i = 0; i <= 500; i++) {
          const len = (totalLength * i) / 500;
          const p = pathRef.current.getPointAtLength(len);

          const dist = Math.hypot(
            p.x - targetLesson.x,
            p.y - targetLesson.y
          );

          if (dist < minDist) {
            minDist = dist;
            bestLength = len;
          }
        }
        offset = totalLength - bestLength;
      } else {
        // Zmodyfikowany fallback: pokazuje postęp na podstawie ukończonych części
        // (lastCompletedIndex + 1) sprawia, że przy index 0 mamy > 0%
        const ratio = (lastCompletedIndex + 1) / lessons.length;
        offset = totalLength * (1 - ratio);
      }
    }

    setTargetOffset(offset);
  }, [pathD, lessons, completedLessons, lastCompletedIndex]);

  if (!pathD) return null;

  return (
    <svg
      className="absolute inset-0 pointer-events-none z-0"
      width={svgDimensions.width}
      height={svgDimensions.height}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <defs>
        <linearGradient
          id="coursePathGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="50%" stopColor="#3b82f6" />
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
          // USUNIĘTO: ref={pathRef} z tego miejsca
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

      <path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke="transparent"
      />
    </svg>
  );
}