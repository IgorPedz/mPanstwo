import { useState } from "react";
import { useParams } from "react-router-dom"; // <-- DODANY useNavigate
import { AnimatePresence } from "framer-motion";
import ModuleModal from "../../components/Courses/SubPages/LessonsContainer/Modules/ModuleModal";
import QuizModal from "../../components/Courses/SubPages/LessonsContainer/LessonQuiz";
import { useLesson } from "../../Hooks/useLessons";
import { useModuleProgress } from "../../Hooks/useModulProgress";
import { useLessonProgress } from "../../Hooks/useLessonProgress";

import LessonHeader from "../../components/Courses/SubPages/LessonsContainer/LessonHeader";
import LessonModulesGrid from "../../components/Courses/SubPages/LessonsContainer/ModulesGrid";
import LessonSidebar from "../../components/Courses/SubPages/LessonsContainer/LessonSidebar";
import LessonQuizButton from "../../components/Courses/SubPages/LessonsContainer/LessonQuizButton";
export default function LessonPage() {
  const { courseId, lessonId } = useParams();

  const { lesson, loading, error } = useLesson(courseId, lessonId);
  const [activeModule, setActiveModule] = useState(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const { progress, completeModule } = useModuleProgress(courseId, lessonId);

  const { lessonProgress } = useLessonProgress(lessonId, courseId);
  const isQuizAlreadyDone = !!lessonProgress?.quizCompleted;

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50 dark:bg-slate-950 text-slate-500 color-transition">
        <div className="animate-pulse font-medium">Ładowanie lekcji...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50 dark:bg-slate-950 text-red-500 color-transition">
        Error: {error}
      </div>
    );
  }

  const modulesDone = (index) => progress[index];

  const allDone =
    lesson.modules.length > 0 && lesson.modules.every((_, i) => progress[i]);

  const doneCount = Object.keys(progress).length;

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 md:p-8 text-slate-900 dark:text-white flex flex-col items-center justify-start">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-8 items-center justify-center">
        <div className="space-y-6 w-full">
          <LessonHeader lesson={lesson} />

          <LessonModulesGrid
            modules={lesson.modules}
            courseSlug={lesson.course_slug}
            lessonSlug={lesson.slug}
            progress={progress}
            modulesDone={modulesDone}
            setActiveModule={setActiveModule}
          />

          <LessonQuizButton
            IsQuizAlreadyDone={isQuizAlreadyDone}
            allDone={allDone}
            courseId={courseId}
            lessonId={lessonId}
            setQuizOpen={setQuizOpen}
          />
        </div>

        <LessonSidebar
          modulesCount={lesson.modules.length}
          doneCount={doneCount}
          allDone={allDone}
        />
      </div>

      <AnimatePresence mode="wait">
        {activeModule && (
          <ModuleModal
            activeModule={activeModule}
            lesson={lesson}
            courseSlug={lesson.course_slug}
            lessonSlug={lesson.slug}
            setActiveModule={setActiveModule}
            completeModule={completeModule}
          />
        )}
      </AnimatePresence>

      {quizOpen && (
        <QuizModal
          courseSlug={lesson.course_slug}
          lessonSlug={lesson.slug}
          onClose={() => setQuizOpen(false)}
        />
      )}
    </div>
  );
}
