import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { sectionVariants, itemVariants, containerVariants } from "../../Utils/Animations";
import { useTranslation } from "react-i18next";

export default function JudicialResponsibilities({
  responsibilities,
  colorClass,
}) {
  const { t } = useTranslation();
  return (
    <motion.div
      variants={sectionVariants}
      className="rounded-3xl border border-slate-200/70 dark:border-slate-800/60
        bg-white dark:bg-slate-900 p-7 md:p-8 color-transition"
    >
      <p className="text-[10px] font-black uppercase tracking-widest mb-5
        text-slate-400 dark:text-slate-500 color-transition">
        {t("institution.responsibilities")}
      </p>
      <motion.ul variants={containerVariants} initial="hidden" animate="show" className="space-y-3">
        {responsibilities.map((item, i) => (
          <motion.li key={i} variants={itemVariants} className="flex items-start gap-3">
            <CheckCircleIcon className={`h-5 w-5 shrink-0 mt-0.5 opacity-80 ${colorClass}`} />
            <span className="leading-snug text-slate-700 dark:text-slate-300 color-transition">{item}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
