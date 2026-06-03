import {motion} from "framer-motion";
import {sectionVariants} from "../../Utils/Animations";
import { RELIABILITY } from "../../Utils/Maps/Content.jsx";

export default function FactsHeader() {
  return (
    <motion.div variants={sectionVariants} className="w-full color-transition">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8 color-transition">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter color-transition">
          Rzetelność i ograniczenia
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 color-transition">
          Co robimy, żeby dane były aktualne — i co warto wiedzieć.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {RELIABILITY.map(({ icon: Icon, title, desc }, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 p-7 rounded-[2rem]
                  border border-slate-200 dark:border-slate-800 shadow-sm color-transition
                  flex gap-5"
          >
            <div
              className="shrink-0 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800
                  text-slate-900 dark:text-white h-fit color-transition"
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-black text-slate-900 dark:text-white mb-1.5 color-transition">
                {title}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed color-transition">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
