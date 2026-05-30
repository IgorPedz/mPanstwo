import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../Contexts/UserContext";

export function useCourseProgress(courseId) {
  const { user } = useUser();

  const [completedLessons, setCompletedLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id || !courseId) return;

    const fetchProgress = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/course/${courseId}/progress`,
          {
            params: {
              userId: user.id,
            },
          }
        );

        setCompletedLessons(data.completedLessons || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [courseId, user?.id]);

  return {
    completedLessons,
    loading,
  };
}