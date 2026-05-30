import { useState, useEffect } from "react";
import { useUser } from "../Contexts/UserContext";

export function useModuleProgress(lessonId) {
  const { user } = useUser();

  const [progress, setProgress] = useState({});
  const [loadingProgress, setLoadingProgress] = useState(true);

  console.log(user?.id, lessonId, progress);

  useEffect(() => {
    if (!user?.id || !lessonId) return;

    const fetchProgress = async () => {
      try {
        setLoadingProgress(true);
        const res = await fetch(
          `http://localhost:5000/courses/lesson/progress?userId=${user.id}&lessonId=${lessonId}`,
        );
        if (res.ok) {
          const data = await res.json();
          // Backend zwraca { progress: { 0: true, 1: true, ... } }
          setProgress(data.progress || {});
        }
      } catch (err) {
        console.error("Błąd podczas pobierania postępu lekcji:", err);
      } finally {
        setLoadingProgress(false);
      }
    };

    fetchProgress();
  }, [lessonId, user?.id]);

  // 2. PROCES OZNACZANIA MODUŁU JAKO UKOŃCZONY

  const completeModule = async (moduleIndex) => {
    // Zabezpieczenie przed brakiem zalogowanego użytkownika
    if (!user?.id) {
      console.error("Użytkownik nie jest zalogowany.");
      return;
    }

    // Optimistic UI - natychmiastowa aktualizacja w ciemno
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
            lessonId,
            moduleIndex,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Serwer zwrócił błąd podczas zapisu modułu");
      }
    } catch (err) {
      console.error("Błąd zapisu, wycofuję zmiany (rollback):", err);

      // Rollback - przywrócenie stanu sprzed kliknięcia
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
    loadingProgress, // Dodatkowa flaga, przydatna do wyświetlenia skeletonu/loadera w LessonPage
  };
}
