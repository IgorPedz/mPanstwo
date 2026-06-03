import { motion } from "framer-motion";
import {sectionVariants} from "../../Utils/Animations";
import { SOURCES } from "../../Utils/Maps/Content.jsx";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export default function FactsHeader() {
  return (
    <motion.div variants={sectionVariants} className="w-full color-transition">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8 color-transition">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter color-transition">
          Źródła danych
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 color-transition">
          Wszystkie dane parlamentarne pochodzą z oficjalnych, publicznych
          źródeł.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {SOURCES.map(
          ({ icon: Icon, name, url, desc, badge, badgeColor }, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 p-8 rounded-[2rem]
                  border border-slate-200 dark:border-slate-800 shadow-sm color-transition
                  flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white color-transition">
                  <Icon className="h-6 w-6" />
                </div>
                <span
                  className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest color-transition ${badgeColor}`}
                >
                  {badge}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 color-transition">
                  {name}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed color-transition">
                  {desc}
                </p>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-black
                    text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300
                    transition-colors mt-auto cursor-pointer"
              >
                {url.replace("https://", "")}
                <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          ),
        )}
      </div>
    </motion.div>
  );
}
