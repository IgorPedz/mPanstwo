import { motion } from "framer-motion";
import { sectionVariants } from "../../Utils/Animations";
import SenatHemicycle from "./SenatHemicycle";
import { useTranslation } from "react-i18next";

export default function SenatHemicycleSection({ clubs, loading, totalMembers }) {
  const { t } = useTranslation();
  return (
    <motion.div
      variants={sectionVariants}
      className="w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
        bg-white dark:bg-slate-900 p-6 md:p-8 color-transition"
    >
      <div className="flex items-center justify-between mb-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 color-transition">
          {t("institution.senat.composition")}
        </p>
        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 color-transition">
          {totalMembers} {t("institution.senat.members")}
        </span>
      </div>
      {loading ? (
        <div className="w-full aspect-[2/1] rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse color-transition" />
      ) : (
        <SenatHemicycle clubs={clubs} />
      )}
    </motion.div>
  );
}
