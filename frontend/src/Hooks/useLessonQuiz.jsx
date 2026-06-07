import { useEffect, useState } from "react";
import axios from "axios";

export function useLessonQuiz(lessonId) {
  const [quiz, setQuiz] = useState([]);
  const [loadingQuiz, setLoadingQuiz] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lessonId) return;

    const fetchQuiz = async () => {
      try {
        setLoadingQuiz(true);
        setError(null);

        const res = await axios.get(
          `http://localhost:5000/courses/lesson/${lessonId}/quiz`
        );

        const extractedQuiz = Array.isArray(res.data)
          ? res.data
          : (res.data?.quiz ?? []);

        setQuiz(extractedQuiz);
      } catch (err) {
        console.error("Błąd pobierania quizu:", err);
        setError("Quiz fetch failed");
      } finally {
        setLoadingQuiz(false);
      }
    };

    fetchQuiz();
  }, [lessonId]);

  return { quiz, loadingQuiz, error };
}