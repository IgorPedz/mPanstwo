import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { sectionVariants } from "../../Utils/Animations";

export default function ClubsFooter({ totalMPs }) {
  const { t } = useTranslation();
  if (!totalMPs) return null;

  return (
    <motion.p
      variants={sectionVariants}
      className="text-center text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition"
    >
      {t("institution.clubs.footer", { total: totalMPs })}
    </motion.p>
  );
}
