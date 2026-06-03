import { motion } from "framer-motion";
import { sectionVariants } from "../../Utils/Animations";
import { useTranslation } from "react-i18next";
export default function FactsHeader() {
  const { t } = useTranslation();
  return (
    <motion.header
      variants={sectionVariants}
      className="flex justify-between items-end pb-6 color-transition"
    >
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-500 color-transition">
          {t("documents.page")} /
        </p>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter color-transition">
          {t("facts.facts")}
        </h1>
        <div className="h-1 w-20 bg-indigo-500 mb-5 mt-2 color-transition" />
        <p className="text-slate-400 font-medium color-transition">
          {t("facts.description")}
        </p>
      </div>
    </motion.header>
  );
}
