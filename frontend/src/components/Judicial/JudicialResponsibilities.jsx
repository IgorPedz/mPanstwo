import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

export default function JudicialResponsibilities({
  responsibilities,
  colorClass,
}) {
  const { t } = useTranslation();
  return (
    <motion.div className="rounded-3xl border p-7 md:p-8">
      <p className="section-label">{t("institution.responsibilities")}</p>

      <ul className="space-y-3">
        {responsibilities.map((item) => (
          <li key={item} className="flex gap-3">
            <CheckCircleIcon className={`h-5 w-5 ${colorClass}`} />

            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
