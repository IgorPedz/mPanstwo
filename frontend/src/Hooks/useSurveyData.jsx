import { useUser } from "../Contexts/UserContext";
import useSurveysQuestions from "../Hooks/useSurveysQuestions";
import useCompletedSurveys from "../Hooks/useCompletedServeys";

export function useSurveyData() {
  const { user } = useUser();

  const {
    surveys = [],
    loading,
    removeSurvey,
    refetch: refetchQuestions,
  } = useSurveysQuestions(user?.id);

  const {
    completedSurveys = [],
    loading: completedLoading,
    refetch: refetchCompleted,
  } = useCompletedSurveys(user?.id);

  return {
    surveys,
    completedSurveys,
    loading,
    completedLoading,
    removeSurvey,
    refetchQuestions,
    refetchCompleted,
  };
}
