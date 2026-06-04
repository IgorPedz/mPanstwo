import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function JudicialAbout({ description }) {
  const { t } = useTranslation();
  return (
    <motion.div className="rounded-3xl border p-7 md:p-8">
      <p className="section-label">{t("institution.about")}</p>

      <p className="leading-relaxed">{description}</p>
    </motion.div>
  );
}
