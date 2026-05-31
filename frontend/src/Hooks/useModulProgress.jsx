import { useState, useEffect } from "react";
import { useUser } from "../Contexts/UserContext";

export function useModuleProgress(courseId, lessonId) {
  const { user } = useUser();

  const [progress, setProgress] = useState({});
  const [loadingProgress, setLoadingProgress] = useState(true);
  useEffect(() => {
    if (!user?.id || !lessonId) return;

    const fetchProgress = async () => {
      try {
        setLoadingProgress(true);

        const res = await fetch(
          `http://localhost:5000/courses/lesson/progress?userId=${user.id}&lessonId=${lessonId}&courseId=${courseId}`
        );

        if (res.ok) {
          const data = await res.json();
          setProgress(data.progress || {});
        }
      } catch (err) {
        console.error("Błąd podczas pobierania postępu lekcji:", err);
      } finally {
        setLoadingProgress(false);
      }
    };

    fetchProgress();
  }, [lessonId, courseId, user?.id]);

  const completeModule = async (moduleIndex) => {
    if (!user?.id) {
      console.error("Użytkownik nie jest zalogowany.");
      return;
    }
    console.log("id",user.id, courseId, lessonId, moduleIndex);
    setProgress((prev) => ({
      ...prev,
      [moduleIndex]: true,
    }));
    try {
      const res = await fetch(
        "http://localhost:5000/courses/lesson/module-complete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            courseId,
            lessonId: lessonId,
            moduleIndex,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Serwer zwrócił błąd podczas zapisu modułu");
      }
    } catch (err) {
      console.error("Błąd zapisu, rollback:", err);

      setProgress((prev) => {
        const copy = { ...prev };
        delete copy[moduleIndex];
        return copy;
      });
    }
  };

  return {
    progress,
    setProgress,
    completeModule,
    loadingProgress,
  };
}