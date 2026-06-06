import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { upwardItemVariants } from "../../Utils/Animations";
import { getPdfUrl } from "./legislacjaConstants";
import { useTranslation } from "react-i18next";

export default function BillTitleCard({ title, sejmUrl, pdfAttachments, num }) {
  const { t } = useTranslation();
  return (
    <motion.div
      variants={upwardItemVariants}
      className="bg-white dark:bg-slate-900 p-8 rounded-[2rem]
        border border-slate-200 dark:border-slate-800 shadow-sm color-transition mb-5"
    >
      <p className="text-slate-700 dark:text-slate-200 font-bold leading-relaxed text-base color-transition mb-6">
        {title}
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href={sejmUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl
            text-xs font-black uppercase tracking-widest
            bg-slate-900 dark:bg-white text-white dark:text-slate-900
            hover:opacity-80 transition-opacity cursor-pointer shadow-sm"
        >
          {t("institution.legislation.fullTextLink")}
          <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
        </a>
        {pdfAttachments.slice(0, 3).map((a, i) => {
          const name = typeof a === "string" ? a : a?.name;
          const url  = getPdfUrl(num, name);
          return (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl
                text-xs font-black uppercase tracking-widest
                bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300
                hover:bg-slate-200 dark:hover:bg-slate-700
                border border-slate-200 dark:border-slate-700
                transition-colors cursor-pointer color-transition"
            >
              <DocumentTextIcon className="h-3.5 w-3.5" />
              {name}
            </a>
          );
        })}
      </div>
    </motion.div>
  );
}
