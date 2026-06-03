import { motion } from "framer-motion";
import { sectionVariants } from "../../Utils/Animations";

export default function MPSection({ refProp, label, children }) {
  return (
    <motion.div
      ref={refProp}
      variants={sectionVariants}
      className="w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
        bg-white dark:bg-slate-900 p-6 md:p-8 color-transition"
    >
      <p className="text-[10px] font-black uppercase tracking-widest mb-5
        text-slate-400 dark:text-slate-500 color-transition">
        {label}
      </p>
      {children}
    </motion.div>
  );
}
