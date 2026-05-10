import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../../Contexts/UserContext";

import SurveyHeader from "../../components/Surveys/SurveyHeader";
import SurveyModal from "../../components/Surveys/Active/SurveyModal";
import InfoMessage from "../../components/Global/InfoMessage";

import ActiveSurveysSubPage from "../../components/Surveys/SubPages/ActiveSubPage";
import ArchiveSurveysSubPage from "../../components/Surveys/SubPages/ArchiveSubPage";
import ExpiredSurveysSubPage from "../../components/Surveys/SubPages/ExpiredSubPage";
import SurveyTab from "../../components/Surveys/SurveyTab"
import useSurveysQuestions from "../../Hooks/useSurveysQuestions";
import useCompletedSurveys from "../../Hooks/useCompletedServeys";

export default function SurveyBoxPage() {
  const [activeSurvey, setActiveSurvey] = useState(null);
  const [tab, setTab] = useState("active");
  const [selectedArchiveId, setSelectedArchiveId] = useState(null);

  const [info, setInfo] = useState({
    message: "",
    type: "success",
  });

  const { user: authUser } = useUser();

  const {
    surveys = [],
    loading,
    removeSurvey,
    refetch: refetchQuestions,
  } = useSurveysQuestions(authUser?.id);

  const {
    completedSurveys = [],
    loading: completedLoading,
    refetch: refetchCompleted,
  } = useCompletedSurveys(authUser?.id);

  const now = Date.now();

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

    // remove duplicates
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

  const handleNotify = (message, type = "success") =>
    setInfo({ message, type });

  const handleSurveyFinished = (surveyId) => {
    removeSurvey(surveyId);
    setActiveSurvey(null);

    if (refetchQuestions) refetchQuestions();
    if (refetchCompleted) refetchCompleted();

    handleNotify("Dzięki za udział w ankiecie 🎉", "success");
  };

  const labels = {
    active: "Aktywne ankiety",
    expired: "Zakończone",
    archive: "Historia odpowiedzi",
  };

  return (
    <>
      <motion.div className="w-full min-h-screen p-8">
        <div className="max-w-[1800px] mx-auto space-y-8">
          <SurveyHeader
            totalRewards={activeSurveys.reduce(
              (acc, s) => acc + (parseInt(s.reward) || 0),
              0,
            )}
            isArchive={tab === "archive"}
            isExpired={tab === "expired"}
          />

          <SurveyTab labels={labels} tab={tab} setTab={setTab}/>
          <div className="min-h-[400px]">
            {tab === "active" && (
              <ActiveSurveysSubPage
                surveys={activeSurveys}
                loading={loading}
                onStart={setActiveSurvey}
                onRefetch={refetchQuestions}
              />
            )}

            {tab === "expired" && (
              <ExpiredSurveysSubPage
                surveys={expiredSurveys}
                loading={loading}
                onStart={setActiveSurvey}
                onRefetch={refetchQuestions}
              />
            )}

            {tab === "archive" && (
              <ArchiveSurveysSubPage
                completedSurveys={archiveSurveys}
                loading={completedLoading}
                selectedArchiveId={selectedArchiveId}
                setSelectedArchiveId={setSelectedArchiveId}
              />
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {info.message && (
          <InfoMessage
            message={info.message}
            type={info.type}
            onClose={() => setInfo({ ...info, message: "" })}
          />
        )}
      </AnimatePresence>

      <SurveyModal
        key={activeSurvey?.id}
        open={!!activeSurvey}
        survey={activeSurvey}
        onClose={() => setActiveSurvey(null)}
        onInfo={handleNotify}
        onFinished={handleSurveyFinished}
      />
    </>
  );
}
