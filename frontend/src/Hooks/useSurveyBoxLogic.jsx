import { useMemo } from "react";

export function useSurveyBoxLogic(surveys, completedSurveys) {
  const activeSurveys = useMemo(() => {
    return (Array.isArray(surveys) ? surveys : []).filter((survey) => {
      const deadlineTime = Date.parse(survey?.deadline);
      return Number.isFinite(deadlineTime) && deadlineTime > Date.now();
    });
  }, [surveys]);

  const expiredSurveys = useMemo(() => {
    const merged = [
      ...(Array.isArray(surveys) ? surveys : []),
      ...(Array.isArray(completedSurveys) ? completedSurveys : []),
    ];

    const unique = merged.filter(
      (survey, index, self) =>
        index === self.findIndex((s) => String(s.id) === String(survey.id)),
    );

    return unique.filter((survey) => {
      const deadlineTime = Date.parse(survey?.deadline);
      return Number.isFinite(deadlineTime) && deadlineTime <= Date.now();
    });
  }, [surveys, completedSurveys]);

  const archiveSurveys = useMemo(() => {
    return Array.isArray(completedSurveys) ? completedSurveys : [];
  }, [completedSurveys]);

  const totalRewards = useMemo(() => {
    return activeSurveys.reduce((acc, s) => acc + (parseInt(s.reward) || 0), 0);
  }, [activeSurveys]);

  return {
    activeSurveys,
    expiredSurveys,
    archiveSurveys,
    totalRewards,
  };
}
