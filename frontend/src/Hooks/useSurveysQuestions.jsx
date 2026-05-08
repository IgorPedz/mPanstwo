import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function useSurveysQuestions(userId) {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSurveys = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/surveys", {
        params: { userId },
      });

      const filtered = res.data.filter((s) => !s.answered);

      setSurveys([...filtered]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchSurveys();
  }, [fetchSurveys]);

  const removeSurvey = (surveyId) => {
    setSurveys((prev) =>
      prev.filter((survey) => survey.id !== surveyId)
    );
  };

  return {
    surveys,
    loading,
    refetch: fetchSurveys,
    removeSurvey,
  };
}