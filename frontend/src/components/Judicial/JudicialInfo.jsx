import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import InfoRow from "./JudicialInfoRow";
export default function JudicialInfo({ infoFields, website }) {
  return (
    <motion.div className="rounded-3xl border p-7 md:p-8">
      <p className="section-label">Informacje</p>

      <div className="space-y-3">
        {infoFields.map(([label, value]) => (
          <InfoRow key={label} label={label} value={value} />
        ))}

        <a href={website} target="_blank" rel="noopener noreferrer">
          <span>Strona WWW</span>

          <span>
            {new URL(website).hostname.replace("www.", "")}
            <ArrowTopRightOnSquareIcon />
          </span>
        </a>
      </div>
    </motion.div>
  );
}
