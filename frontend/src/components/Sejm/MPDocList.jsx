import { useState } from "react";
import { fmtDate } from "./mpProfileConstants";
import { useTranslation } from "react-i18next";

const SHOW = 5;

export default function MPDocList({ items, loading, emptyText }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, SHOW);

  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-14 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse color-transition" />
        ))}
      </div>
    );
  }

  if (!items.length) {
    return <p className="text-sm text-slate-400 dark:text-slate-500 color-transition">{emptyText}</p>;
  }

  return (
    <div className="space-y-2">
      {visible.map((item, i) => (
        <div key={i} className="flex items-start justify-between gap-3 px-4 py-3 rounded-xl
          bg-slate-50 dark:bg-slate-800/50 color-transition">
          <div className="min-w-0 flex-1">
            {item.webUrl ? (
              <a href={item.webUrl} target="_blank" rel="noopener noreferrer"
                className="text-sm font-bold text-slate-800 dark:text-slate-100 color-transition
                  hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors leading-snug line-clamp-2 block">
                {item.title}
              </a>
            ) : (
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100 color-transition leading-snug line-clamp-2">
                {item.title}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 color-transition">
                {fmtDate(item.receiptDate)}
              </span>
              {item.to?.slice(0, 2).map((t, j) => (
                <span key={j} className="text-[9px] font-bold px-1.5 py-0.5 rounded-md
                  bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 color-transition capitalize">
                  {t}
                </span>
              ))}
              {item.to?.length > 2 && (
                <span className="text-[9px] text-slate-400 dark:text-slate-500">+{item.to.length - 2}</span>
              )}
            </div>
          </div>
          <span className={`shrink-0 px-2.5 py-1 rounded-lg text-[9px] font-black
            ${item.answered
              ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
              : "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
            }`}>
            {item.answered ? t("institution.mp.answered") : t("institution.mp.pending")}
          </span>
        </div>
      ))}
      {items.length > SHOW && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="w-full py-2.5 rounded-xl text-xs font-black
            text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200
            bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800
            transition-colors color-transition"
        >
          {expanded ? t("institution.mp.collapse") : t("institution.mp.showAll", { count: items.length })}
        </button>
      )}
    </div>
  );
}
