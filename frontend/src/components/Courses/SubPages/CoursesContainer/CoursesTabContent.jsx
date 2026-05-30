import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import CourseCard from "./CourseCard";
import ICON_MAP from "../../../../Utils/Maps/Icons";

const CoursesTabContent = ({
  activeCourses,
  inProgressCourses,
  completedCourses,
  loading,
  onStart,
}) => {
  const { t } = useTranslation();
  const BookOpenIcon = ICON_MAP["document"] || ICON_MAP["star"];

  const courses = [
    ...activeCourses.filter((c) => !c.progress || c.progress === 0),
    ...inProgressCourses.filter(
      (c) => c.progress && c.progress > 0 && c.progress < 100,
    ),
    ...completedCourses.filter((c) => c.progress === 100),
  ];

  const emptyMessage = t("courses.noCourses") || "No courses available";

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="h-96 bg-slate-200 dark:bg-slate-800 rounded-[2.5rem] animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="
          flex flex-col items-center justify-center
          py-20 px-6
          rounded-[2rem]
          bg-gradient-to-br from-slate-50 to-slate-100
          dark:from-slate-900/50 dark:to-slate-800/50
          border-2 border-dashed border-slate-200 dark:border-slate-700
          color-transition
        "
      >
        <div className="mb-4">
          <BookOpenIcon className="h-16 w-16 text-slate-300 dark:text-slate-600" />
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-center font-medium">
          {emptyMessage}
        </p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <CourseCard
              course={course}
              onStart={onStart}
              isCompleted={course.progress === 100}
            />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default CoursesTabContent;
