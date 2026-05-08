import { useEffect, useState } from "react";
import axios from "axios";

export default function useCompletedSurveys(userId) {
  const [completedSurveys, setCompletedSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!userId) return;

    setLoading(true);

    try {
      const res = await axios.get(
        "http://localhost:5000/surveys/completed",
        {
          params: { userId },
        }
      );

      setCompletedSurveys(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  return {
    completedSurveys,
    loading,
    refetch: fetchData,
  };
}