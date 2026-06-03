import { motion } from "framer-motion";
import { sectionVariants } from "../../Utils/Animations";

export default function ClubsFooter({ totalMPs }) {
  if (!totalMPs) return null;

  return (
    <motion.p
      variants={sectionVariants}
      className="text-center text-[10px] font-bold text-slate-400 dark:text-slate-500"
    >
      Łącznie {totalMPs} aktywnych posłów · X kadencja Sejmu RP · dane:
      api.sejm.gov.pl
    </motion.p>
  );
}