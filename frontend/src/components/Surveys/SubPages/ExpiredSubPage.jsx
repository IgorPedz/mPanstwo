import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import ExpiredResultsModal from "../Expired/ExpiredResults"
import EmptyState from "../EmptyState";
import SkeletonGrid from "../SkeletonGrid";
import SurveyCard from "../SurveyCard";

import { upwardItemVariants } from "../../../Utils/Animations";

export default function ExpiredSurveysSubPage({ surveys, loading }) {
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  const expiredSurveys = [...surveys]
    .filter((s) => {
      const now = Date.now();
      return new Date(s.deadline).getTime() <= now;
    })
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  return (
    <>
      {loading ? (
        <SkeletonGrid />
      ) : expiredSurveys.length === 0 ? (
        <EmptyState variant="expired" />
      ) : (
        <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {expiredSurveys.map((survey) => (
              <motion.div
                key={survey.id}
                layout
                variants={upwardItemVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <SurveyCard
                  survey={survey}
                  onStart={() => setSelectedSurvey(survey)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence>
        {selectedSurvey && <ExpiredResultsModal survey={selectedSurvey} onClose={() => setSelectedSurvey(null)}/>}
      </AnimatePresence>
    </>
  );
}
