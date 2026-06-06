import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { sectionVariants } from "../../Utils/Animations";
import { useTranslation } from "react-i18next";

const LINKS = [
  ["https://www.sejm.gov.pl", "sejm.gov.pl"],
  ["https://www.senat.gov.pl", "senat.gov.pl"],
  ["https://www.gov.pl", "gov.pl"],
  ["https://www.nsa.gov.pl", "nsa.gov.pl"],
  ["https://www.sn.pl", "sn.pl"],
  ["https://www.trybunal.gov.pl", "trybunal.gov.pl"],
  ["https://www.krs.pl", "krs.pl"],
];

export default function FactsFooter() {
  const { t } = useTranslation();
  return (
    <motion.div
      variants={sectionVariants}
      className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800
            rounded-[2rem] p-8 flex items-start gap-4 color-transition"
    >
      <InformationCircleIcon className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed color-transition">
        {t("facts.footer")}{" "}
        {LINKS.map(([href, label], i, arr) => (
          <span key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:text-indigo-700 font-bold transition-colors"
            >
              {label}
            </a>
            {i < arr.length - 1 ? ", " : "."}
          </span>
        ))}
      </p>
    </motion.div>
  );
}
