import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useUser } from "../Contexts/UserContext";

export function useCourseCompletion(courseId) {
  const { user } = useUser();
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    if (!user?.id || !courseId) return;
    try {
      const { data } = await axios.get("http://localhost:5000/courses/completion", {
        params: { userId: user.id, courseId },
      });
      setCompleted(data.completed || false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [courseId, user?.id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { completed, loading, refetch: fetch };
}
