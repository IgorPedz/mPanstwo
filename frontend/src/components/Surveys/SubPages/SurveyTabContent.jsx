import ActiveSurveysSubPage from "./ActiveSubPage";
import ExpiredSurveysSubPage from "./ExpiredSubPage";
import ArchiveSurveysSubPage from "./ArchiveSubPage";

export default function SurveyTabsContent({
  tab,
  activeSurveys,
  expiredSurveys,
  archiveSurveys,
  loading,
  completedLoading,
  selectedArchiveId,
  setSelectedArchiveId,
  setActiveSurvey,
  refetchQuestions,
}) {
  switch (tab) {
    case "active":
      return (
        <ActiveSurveysSubPage
          surveys={activeSurveys}
          loading={loading}
          onStart={setActiveSurvey}
          onRefetch={refetchQuestions}
        />
      );
    case "expired":
      return (
        <ExpiredSurveysSubPage
          surveys={expiredSurveys}
          loading={loading}
          onStart={setActiveSurvey}
          onRefetch={refetchQuestions}
        />
      );
    case "archive":
      return (
        <ArchiveSurveysSubPage
          completedSurveys={archiveSurveys}
          loading={completedLoading}
          selectedArchiveId={selectedArchiveId}
          setSelectedArchiveId={setSelectedArchiveId}
        />
      );
    default:
      return null;
  }
}
