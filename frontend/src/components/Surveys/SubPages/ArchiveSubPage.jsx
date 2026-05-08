import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import ArchiveSurveyCard from "../Archive/ArchiveSurveyCard";
import ArchiveResultsModal from "../Archive/ArchiveResults";
import EmptyState from "../Active/EmptyState";
import SkeletonGrid from "../SkeletonGrid";
import { upwardItemVariants } from "../../../Utils/Animations";

export default function ArchiveSurveysSubPage({ completedSurveys, loading }) {
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  return (
    <>
      {loading ? (
        <SkeletonGrid />
      ) : completedSurveys.length === 0 ? (
        <EmptyState onRefetch={() => {}} />
      ) : (
        <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {completedSurveys.map((survey) => (
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
                  onOpen={() => setSelectedSurvey(survey)} // Musi być onOpen!
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* MODAL */}
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
