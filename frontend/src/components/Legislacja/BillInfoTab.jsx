import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { TYPE_LABELS, formatDate, getPdfUrl } from "./legislacjaConstants";
import { useTranslation } from "react-i18next";

export default function BillInfoTab({ data, pdfAttachments, num }) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-5 color-transition">
          {t("institution.legislation.info.title")}
        </p>
        {data.description && (
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-5 color-transition">
            {data.description}
          </p>
        )}
        <div className="space-y-4">
          {[
            [t("institution.legislation.info.printNum"),     data.number],
            [t("institution.legislation.info.dateReceived"), formatDate(data.deliveryDate)],
            [t("institution.legislation.info.lastChange"),   formatDate(data.changeDate)],
            [t("institution.legislation.info.type"),         TYPE_LABELS[data.type] ?? "—"],
            [t("institution.legislation.info.term"),         data.term ?? "X"],
            [t("institution.legislation.info.eu"),           data.euRelated ? t("institution.legislation.info.yes") : t("institution.legislation.info.no")],
          ].map(([label, value], i, arr) => (
            <div key={i}>
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm font-bold text-slate-400 dark:text-slate-500 color-transition shrink-0">
                  {label}
                </span>
                <span className="text-sm font-black text-right text-slate-900 dark:text-white color-transition">
                  {value ?? "—"}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div className="mt-4 h-px bg-slate-100 dark:bg-slate-800 color-transition" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-7">
        {data.principalClub && (
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 color-transition">
              {t("institution.legislation.info.author")}
            </p>
            <span className="inline-block px-4 py-2 rounded-2xl text-sm font-black
              bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 color-transition">
              {data.principalClub}
            </span>
          </div>
        )}
        {pdfAttachments.length > 0 && (
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 color-transition">
              {t("institution.legislation.info.pdfs")} ({pdfAttachments.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {pdfAttachments.map((a, i) => {
                const name = typeof a === "string" ? a : a?.name;
                const url  = getPdfUrl(num, name);
                return (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                      text-xs font-bold border border-slate-200 dark:border-slate-700
                      text-slate-600 dark:text-slate-300
                      hover:border-indigo-300 dark:hover:border-indigo-700
                      hover:text-indigo-600 dark:hover:text-indigo-300
                      transition-colors cursor-pointer color-transition"
                  >
                    <DocumentTextIcon className="h-3.5 w-3.5" />
                    {name}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
