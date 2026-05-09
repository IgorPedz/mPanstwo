import { motion, AnimatePresence } from "framer-motion";

import SurveyCard from "../SurveyCard";
import EmptyState from "../EmptyState";
import SkeletonGrid from "../SkeletonGrid";

import { upwardItemVariants } from "../../../Utils/Animations";

export default function ActiveSurveysSubPage({
  surveys,
  loading,
  onStart,
  onRefetch,
}) {
  const now = new Date();

  const activeSurveys = surveys.filter((s) => {
    if (!s.deadline) return true;
    return new Date(s.deadline) > now;
  });
  return (
    <div className={loading ? "opacity-50" : ""}>
      {loading ? (
        <SkeletonGrid />
      ) : surveys.length === 0 ? (
        <EmptyState variant="active" onRefetch={onRefetch} />
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {activeSurveys.map((s) => (
              <motion.div
                key={s.id}
                layout
                variants={upwardItemVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0 }}
              >
                <SurveyCard survey={s} onStart={onStart} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
