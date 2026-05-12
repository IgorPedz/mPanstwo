import { DocumentArrowDownIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion"
export default function DocumentsCard({ doc }) {
  return (
    <div className="group relative w-full p-8 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[2rem] transition-all duration-200 hover:border-slate-900 dark:hover:border-slate-100 overflow-hidden color-transition">

      <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none color-transition z-20" />

      <div className="flex flex-col h-full justify-between gap-8 relative z-10 color-transition">

        <div className="flex justify-between items-start w-full">
          <div className="color-transition p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl">
            <DocumentTextIcon className="h-9 w-9 text-slate-600 dark:text-slate-400" />
          </div>

          <span className="color-transition text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-lg border">
            {doc.size}
          </span>
        </div>

        <div>
          <h3 className="color-transition text-2xl font-black text-slate-900 dark:text-white uppercase mb-2">
            {doc.title}
          </h3>
          <p className="text-sm text-slate-500 font-bold">
            {doc.type}
          </p>
        </div>


        <motion.a
          href={doc.file}
          download
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.95 }}
          className="
            color-transition flex flex-column items-center gap-2
            mt-8 px-8 py-3
            bg-slate-900 dark:bg-white
            text-white dark:text-slate-900
            rounded-2xl
            font-black text-[10px] uppercase tracking-widest
            shadow-lg
            hover:shadow-xl hover:shadow-blue-500/10
            transition-all
            cursor-pointer
          "
        >
          <DocumentArrowDownIcon className="h-5 w-5" />
          POBIERZ PLIK
        </motion.a>

      </div>
    </div>
  );
}