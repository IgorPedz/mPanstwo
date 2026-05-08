import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../../Contexts/UserContext";

import SurveyHeader from "../../components/Surveys/SurveyHeader";
import SurveyModal from "../../components/Surveys/Active/SurveyModal";
import InfoMessage from "../../components/Global/InfoMessage";

import { containerVariants } from "../../Utils/Animations";

import ActiveSurveysSubPage from "../../components/Surveys/SubPages/ActiveSubPage";
import ArchiveSurveysSubPage from "../../components/Surveys/SubPages/ArchiveSubPage";

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
    refetch,
  } = useSurveysQuestions(authUser?.id);

  const { completedSurveys = [], loading: completedLoading } =
    useCompletedSurveys(authUser?.id);

  const handleNotify = (message, type = "success") => {
    setInfo({ message, type });
  };

  const handleSurveyFinished = (surveyId) => {
    removeSurvey(surveyId);
    setActiveSurvey(null);
    handleNotify("Dzięki za udział w ankiecie 🎉", "success");
  };

  return (
    <>
      <motion.div
        className="w-full min-h-screen p-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-[1800px] mx-auto space-y-8">
          <SurveyHeader
            totalRewards={surveys.reduce(
              (acc, s) => acc + (parseInt(s.reward) || 0),
              0,
            )}
            isArchive={tab === "archive"}
          />

          <div className="flex items-center gap-3">
            {["active", "archive"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer ${
                  tab === t
                    ? "bg-blue-600 text-white shadow-xl"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                }`}
              >
                {t === "active" ? "Aktywne ankiety" : "Historia odpowiedzi"}
              </button>
            ))}
          </div>

          {tab === "active" && (
            <ActiveSurveysSubPage
              surveys={surveys}
              loading={loading}
              onStart={setActiveSurvey}
              onRefetch={refetch}
            />
          )}

          {tab === "archive" && (
            <ArchiveSurveysSubPage
              completedSurveys={completedSurveys}
              loading={completedLoading}
              selectedArchiveId={selectedArchiveId}
              setSelectedArchiveId={setSelectedArchiveId}
            />
          )}
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
