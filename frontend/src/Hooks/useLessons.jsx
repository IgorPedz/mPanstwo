import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useUser } from "../Contexts/UserContext";

export function useLesson(courseId, lessonId) {
  const { user } = useUser();
  const [lesson, setLesson] = useState(null);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(0);

  const fetchLesson = useCallback(async () => {
    if (!lessonId || !user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get(
        `http://localhost:5000/courses/lesson/${lessonId}?userId=${user.id}&courseId=${courseId}`
      );

      setLesson(data);
      setProgress(data.progress || {});
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load lesson");
    } finally {
      setLoading(false);
    }
  }, [lessonId, user?.id]);

  useEffect(() => {
    fetchLesson();
  }, [fetchLesson]);

  return {
    lesson,
    progress,
    setProgress,
    loading,
    error,
    step,
    setStep,
    refetchLesson: fetchLesson,
  };
}