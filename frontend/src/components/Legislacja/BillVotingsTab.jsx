import { useState } from "react";
import { CalendarDaysIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useBillVotings } from "../../Hooks/useLegislacja";
import { formatDate } from "./legislacjaConstants";
import VotingDetailModal from "./VotingDetailModal";
import { useTranslation } from "react-i18next";

function VotingBar({ yes, no, abstain, notVoting }) {
  const total = (yes + no + abstain + notVoting) || 1;
  return (
    <div className="flex h-1.5 rounded-full overflow-hidden w-full bg-slate-100 dark:bg-slate-700 color-transition">
      <div style={{ width: `${(yes / total) * 100}%` }}     className="bg-emerald-500" />
      <div style={{ width: `${(no / total) * 100}%` }}      className="bg-red-500" />
      <div style={{ width: `${(abstain / total) * 100}%` }} className="bg-amber-400" />
    </div>
  );
}

export default function BillVotingsTab({ num }) {
  const { votings, loading } = useBillVotings(num);
  const [selected, setSelected] = useState(null);
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-28 rounded-2xl bg-slate-100 dark:bg-slate-800 color-transition" />
        ))}
      </div>
    );
  }

  if (!votings?.length) {
    return (
      <p className="text-sm font-medium text-slate-400 dark:text-slate-500 color-transition">
        {t("institution.legislation.voting.noVotings")}
      </p>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {votings.map((v, i) => (
          <button
            key={i}
            onClick={() => setSelected(v)}
            className="w-full text-left p-5 rounded-2xl border border-slate-200 dark:border-slate-800
              bg-slate-50 dark:bg-slate-800/40
              hover:border-indigo-300 dark:hover:border-indigo-700
              hover:bg-indigo-50/40 dark:hover:bg-indigo-900/10
              transition-colors color-transition group"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">
                    {t("institution.legislation.voting.votingNumber")} {v.votingNum} · {v.sitting}. {t("institution.legislation.voting.session")}
                  </span>
                  {v.date && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <CalendarDaysIcon className="h-3 w-3 shrink-0" />
                      {formatDate(v.date.slice(0, 10))}
                      {v.date.length > 10 && (
                        <span className="text-slate-300 dark:text-slate-600">
                          {" · "}{v.date.slice(11, 16)}
                        </span>
                      )}
                    </span>
                  )}
                </div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-snug line-clamp-2 color-transition">
                  {v.topic ?? v.title ?? "—"}
                </p>
              </div>
              <ChevronRightIcon className="h-4 w-4 text-slate-400 group-hover:text-indigo-500 shrink-0 mt-1 transition-colors" />
            </div>

            <VotingBar yes={v.yes} no={v.no} abstain={v.abstain} notVoting={v.notVoting} />

            <div className="flex gap-5 mt-2.5">
              {[
                { label: t("institution.legislation.voting.yes"),       value: v.yes,       color: "text-emerald-600 dark:text-emerald-400" },
                { label: t("institution.legislation.voting.no"),        value: v.no,        color: "text-red-500" },
                { label: t("institution.legislation.voting.abstain"),   value: v.abstain,   color: "text-amber-500" },
                { label: t("institution.legislation.voting.notVoting"), value: v.notVoting, color: "text-slate-400 dark:text-slate-500" },
              ].map(({ label, value, color }) => (
                <div key={label}>
                  <p className={`text-sm font-black ${color}`}>{value ?? 0}</p>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 color-transition">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <VotingDetailModal
          sitting={selected.sitting}
          votNum={selected.votingNum}
          summary={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
