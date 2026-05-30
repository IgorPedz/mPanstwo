import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import CoursesTabContent from "../../components/Courses/SubPages/CoursesContainer/CoursesTabContent";
import CoursesHeader from "../../components/Courses/SubPages/CoursesContainer/CoursesHeader";
import InfoMessage from "../../components/Global/InfoMessage";

import useCourses from "../../Hooks/useCourses";

export default function CoursesPage() {
  const [info, setInfo] = useState({ message: "", type: "success" });
  const { t } = useTranslation();

  const {
    courses,
    loading,
    completedLoading,
  } = useCourses();

  const allCourses = [...courses];

  const handleStartCourse = (courseId) => {
    console.log("Starting course:", courseId);
    handleNotify(
      t("courses.courseStarted") || "Course started successfully",
      "success"
    );
  };

  const handleNotify = (message, type = "success") =>
    setInfo({ message, type });

  return (
    <>
      <motion.div className="w-full min-h-screen p-8">
        <div className="max-w-[1800px] mx-auto space-y-8">
            <CoursesHeader />

          <div className="min-h-[400px]">
            <CoursesTabContent
              tab="all"
              activeCourses={allCourses}
              inProgressCourses={allCourses}
              completedCourses={allCourses}
              loading={loading || completedLoading}
              onStart={handleStartCourse}
            />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {info.message && (
          <InfoMessage
            message={info.message}
            type={info.type}
            onClose={() => setInfo({ ...info, message: "" })}
          />
        )}
      </AnimatePresence>
    </>
  );
}
