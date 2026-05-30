import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useUser } from "../Contexts/UserContext";

const API_URL = "http://localhost:5000";

export default function useCourseMap(courseId) {
  const { user } = useUser();
  const [course, setCourse] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const fetchCourse = useCallback(async () => {
    if (!courseId || !user?.id) return;

    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get(
        `${API_URL}/course/${courseId}?userId=${user.id}`,
      );

      setCourse(data);
    } catch (err) {
      console.error("FETCH COURSE ERROR:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch course",
      );

      setCourse(null);
    } finally {
      setLoading(false);
    }
  }, [courseId, user?.id]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  return {
    course,

    loading,

    error,

    refetchCourse: fetchCourse,
  };
}