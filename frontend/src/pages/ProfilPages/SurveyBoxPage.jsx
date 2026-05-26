import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import SurveyHeader from "../../components/Surveys/SurveyHeader";
import SurveyModal from "../../components/Surveys/Active/SurveyModal";
import InfoMessage from "../../components/Global/InfoMessage";
import SurveyTab from "../../components/Surveys/SurveyTab";
import SurveyTabsContent from "../../components/Surveys/SubPages/SurveyTabContent";

import { useSurveyData } from "../../Hooks/useSurveyData";
import { useSurveyBoxLogic } from "../../Hooks/useSurveyBoxLogic";
import { useTranslation } from "react-i18next";

export default function SurveyBoxPage() {
  const [activeSurvey, setActiveSurvey] = useState(null);
  const [tab, setTab] = useState("active");
  const [selectedArchiveId, setSelectedArchiveId] = useState(null);
  const [info, setInfo] = useState({ message: "", type: "success" });
  const { t } = useTranslation()
  const {
    surveys,
    completedSurveys,
    loading,
    completedLoading,
    removeSurvey,
    refetchQuestions,
    refetchCompleted,
  } = useSurveyData();
  const LABELS = {
    active: t("surveys.activeSurveys"),
    expired: t("surveys.expiredSurveys"),
    archive: t("surveys.completedSurveys")
  };
  const { activeSurveys, expiredSurveys, archiveSurveys, totalRewards } =
    useSurveyBoxLogic(surveys, completedSurveys);

  const handleNotify = (message, type = "success") =>
    setInfo({ message, type });

  const handleSurveyFinished = (surveyId) => {
    removeSurvey(surveyId);
    setActiveSurvey(null);

    refetchQuestions?.();
    refetchCompleted?.();

    handleNotify("Wypełniono ankietę", "success");
  };

  return (
    <>
      <motion.div className="w-full min-h-screen p-8">
        <div className="max-w-[1800px] mx-auto space-y-8">
          <SurveyHeader
            totalRewards={totalRewards}
            isArchive={tab === "archive"}
            isExpired={tab === "expired"}
          />

          <SurveyTab labels={LABELS} tab={tab} setTab={setTab} />

          <div className="min-h-[400px]">
            <SurveyTabsContent
              tab={tab}
              activeSurveys={activeSurveys}
              expiredSurveys={expiredSurveys}
              archiveSurveys={archiveSurveys}
              loading={loading}
              completedLoading={completedLoading}
              selectedArchiveId={selectedArchiveId}
              setSelectedArchiveId={setSelectedArchiveId}
              setActiveSurvey={setActiveSurvey}
              refetchQuestions={refetchQuestions}
            />
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
