import { useEffect, useState, useCallback } from "react";
import { useUser } from "../Contexts/UserContext";

export function useCourses() {
  const { user } = useUser();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async (signal) => {
    if (!user?.id) {
      setCourses([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `http://localhost:5000/courses?userId=${user.id}`,
        { signal }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await res.json();

      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("FETCH COURSES ERROR:", err);
        setError(err.message);
        setCourses([]);
      }
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    const controller = new AbortController();

    fetchCourses(controller.signal);

    return () => controller.abort();
  }, [fetchCourses]);

  return {
    courses,
    loading,
    error,
    refetchCourses: () => fetchCourses()
  };
}

export default useCourses;