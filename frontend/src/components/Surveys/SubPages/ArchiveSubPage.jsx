import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import ArchiveSurveyCard from "../Archive/ArchiveSurveyCard";
import ArchiveResultsModal from "../Archive/ArchiveResults";
import EmptyState from "../EmptyState";
import SkeletonGrid from "../SkeletonGrid";
import { upwardItemVariants } from "../../../Utils/Animations";

export default function ArchiveSurveysSubPage({ completedSurveys, loading }) {
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  
  const sortedSurveys = [...completedSurveys].sort((a, b) => {
    const now = Date.now();

    const aActive = new Date(a.deadline).getTime() > now;
    const bActive = new Date(b.deadline).getTime() > now;

    if (aActive !== bActive) {
      return aActive ? -1 : 1;
    }
    
    return new Date(a.deadline) - new Date(b.deadline);
  });

  return (
    <>
      {loading ? (
        <SkeletonGrid />
      ) : sortedSurveys.length === 0 ? (
        <EmptyState variant="archive" onRefetch={() => {}} />
      ) : (
        <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {sortedSurveys.map((survey) => (
              <motion.div
                key={survey.id}
                layout
                variants={upwardItemVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <ArchiveSurveyCard
                  key={survey.id}
                  survey={survey}
                  onOpen={() => setSelectedSurvey(survey)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence>
        {selectedSurvey && (
          <ArchiveResultsModal
            survey={selectedSurvey}
            onClose={() => setSelectedSurvey(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
