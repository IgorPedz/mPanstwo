import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import InfoRow from "./JudicialInfoRow";
import { useTranslation } from "react-i18next";
export default function JudicialInfo({ infoFields, website }) {
  const { t } = useTranslation();
  return (
    <motion.div className="rounded-3xl border p-7 md:p-8">
      <p className="section-label">{t("institution.information")}</p>

      <div className="space-y-3">
        {infoFields.map(([label, value]) => (
          <InfoRow key={label} label={label} value={value} />
        ))}

        <a href={website} target="_blank" rel="noopener noreferrer">
          <span>{t("institution.website")}</span>

          <span>
            {new URL(website).hostname.replace("www.", "")}
            <ArrowTopRightOnSquareIcon />
          </span>
        </a>
      </div>
    </motion.div>
  );
}
