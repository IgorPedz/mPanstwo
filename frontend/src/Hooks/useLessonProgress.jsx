import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useUser } from "../Contexts/UserContext";

export function useLessonProgress(lessonId, courseId) {
  const { user } = useUser();

  const [lessonProgress, setLessonProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    if (!user?.id || !lessonId || !courseId) return;

    try {
      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:5000/courses/lesson-progress`,
        {
          params: {
            userId: user.id,
            lessonId,
            courseId,
          },
        },
      );

      setLessonProgress(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user?.id, lessonId, courseId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const completeLesson = async () => {
    try {
      await axios.post(`http://localhost:5000/courses/lesson/complete`, {
        userId: user.id,
        lessonId,
        courseId: courseId,
      });

      setLessonProgress((prev) => ({
        ...prev,
        completed: true,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const completeQuiz = async () => {
    try {
      await axios.post(`http://localhost:5000/courses/lesson/quiz-complete`, {
        userId: user.id,
        lessonId,
        courseId: courseId,
      });

      setLessonProgress((prev) => ({
        ...prev,
        quizCompleted: true,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return {
    lessonProgress,
    loading,
    completeLesson,
    completeQuiz,
    refreshLessonProgress: fetchProgress,
  };
}
