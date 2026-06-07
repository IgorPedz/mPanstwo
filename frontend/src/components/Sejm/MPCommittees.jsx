import { useTranslation } from "react-i18next";

const TYPE_CLS = {
  STANDING:      "text-slate-400 dark:text-slate-500",
  EXTRAORDINARY: "text-sky-600 dark:text-sky-400",
  INVESTIGATIVE: "text-amber-600 dark:text-amber-400",
};

export default function MPCommittees({ committees, loading }) {
  const { t } = useTranslation();
  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse color-transition" />
        ))}
      </div>
    );
  }

  if (!committees.length) {
    return <p className="text-sm text-slate-400 dark:text-slate-500 color-transition">{t("institution.mp.noCommittees")}</p>;
  }

  return (
    <div className="space-y-2">
      {committees.map((c, i) => {
        const typeCls = TYPE_CLS[c.type];
        const typeText = c.type ? t(`institution.mp.committeeType.${c.type}`, { defaultValue: c.type }) : null;
        return (
          <div key={i} className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 color-transition space-y-1.5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-black text-slate-800 dark:text-slate-100 color-transition leading-snug">{c.name}</p>
                {typeText && (
                  <p className={`text-[10px] mt-0.5 font-bold color-transition ${typeCls}`}>{typeText}</p>
                )}
              </div>
              <span className="shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-black capitalize
                bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                {c.function || t("institution.mp.member")}
              </span>
            </div>
            {c.subCommittees?.length > 0 && (
              <div className="pl-3 border-l-2 border-slate-200 dark:border-slate-700 space-y-1.5">
                {c.subCommittees.map((sc, j) => (
                  <div key={j} className="flex items-start justify-between gap-3">
                    <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 color-transition leading-snug">{sc.name}</p>
                    {sc.function && (
                      <span className="shrink-0 px-2 py-0.5 rounded-md text-[9px] font-black capitalize
                        bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">{sc.function}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
