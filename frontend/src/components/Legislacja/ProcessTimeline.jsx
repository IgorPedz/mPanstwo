import { useState, useMemo } from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useLegislativeProcess, useBillVotings } from "../../Hooks/useLegislacja";
import { formatDate } from "./legislacjaConstants";
import VotingDetailModal from "./VotingDetailModal";
import { useTranslation } from "react-i18next";

const VOTE_RESULT_RE = /uchwalon|odrzucon|przyjet|nieprzyjęt/i;

function collectStages(stages = []) {
  const out = [];
  for (const s of stages) {
    out.push(s);
    const nested = s.children ?? s.childStages ?? [];
    if (nested.length) out.push(...collectStages(nested));
  }
  return out;
}

export default function ProcessTimeline({ num }) {
  const { data, loading } = useLegislativeProcess(num);
  const { votings }       = useBillVotings(num);
  const [selectedVoting, setSelectedVoting] = useState(null);
  const { t } = useTranslation();

  const refByDate = useMemo(() => {
    const m = {};
    for (const s of collectStages(data?.stages ?? [])) {
      if (s.stageType === "Voting" && s.voting) {
        const v = s.voting;
        if (v.sitting != null && v.votingNumber != null && v.date) {
          m[v.date.slice(0, 10)] = {
            sitting:       v.sitting,
            votingNum:     v.votingNumber,
            majorityType:  v.majorityType  ?? null,
            majorityVotes: v.majorityVotes ?? null,
            yes:           v.yes     ?? 0,
            no:            v.no      ?? 0,
            abstain:       v.abstain ?? 0,
            notVoting:     v.notParticipating ?? 0,
            date:          v.date,
          };
        }
      }
    }
    return m;
  }, [data]);

  const votingByDate = useMemo(() => {
    const m = {};
    for (const v of votings ?? []) {
      if (v.date) m[v.date.slice(0, 10)] = v;
    }
    return m;
  }, [votings]);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="mt-1.5 w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 rounded bg-slate-100 dark:bg-slate-800 w-3/4" />
              <div className="h-2 rounded bg-slate-100 dark:bg-slate-800 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!data?.stages?.length) {
    return (
      <p className="text-sm font-medium text-slate-400 dark:text-slate-500 color-transition">
        {t("institution.legislation.timeline.noStages")}
      </p>
    );
  }

  return (
    <>
      <div className="relative pl-6">
        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700 rounded-full color-transition" />
        <div className="space-y-5">
          {data.stages.map((stage, i) => {
            const isLast  = i === data.stages.length - 1;
            const dateKey = stage.date?.slice(0, 10);

            const ref      = refByDate[dateKey] ?? (votingByDate[dateKey] ? { sitting: votingByDate[dateKey].sitting, votingNum: votingByDate[dateKey].votingNum } : null);
            const fallback = !ref && isLast && votings?.length ? votings[0] : null;
            const matched  = votingByDate[dateKey] ?? (fallback ? { sitting: fallback.sitting, votingNum: fallback.votingNum, ...fallback } : null);
            const sitting   = ref?.sitting   ?? matched?.sitting   ?? null;
            const votingNum = ref?.votingNum ?? matched?.votingNum ?? null;

            const openVoting = (label) => setSelectedVoting({
              ...(matched ?? {}),
              sitting,
              votingNum,
              topic: label,
              date:  stage.date ?? matched?.date ?? null,
            });

            const hasVotingData  = !!(sitting && votingNum);
            const decisionIsVote = !!(hasVotingData && stage.decision && VOTE_RESULT_RE.test(stage.decision));

            return (
              <div key={i} className="relative flex gap-4">
                <div
                  className={`absolute -left-[19px] mt-1.5 w-3.5 h-3.5 rounded-full border-2 shrink-0
                    ${isLast
                      ? "bg-indigo-500 border-indigo-500"
                      : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                    } color-transition`}
                />
                <div className="min-w-0">
                  <p className={`text-sm font-bold leading-snug color-transition
                    ${isLast ? "text-indigo-700 dark:text-indigo-300" : "text-slate-700 dark:text-slate-300"}`}>
                    {stage.stageName ?? stage.name ?? `${t("institution.legislation.timeline.stage")} ${i + 1}`}
                  </p>

                  {stage.date && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <CalendarDaysIcon className="h-3 w-3 text-slate-400 dark:text-slate-500 shrink-0" />
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 color-transition">
                        {formatDate(stage.date)}
                      </p>
                    </div>
                  )}

                  {stage.decision && (
                    decisionIsVote ? (
                      <button
                        onClick={() => openVoting(stage.decision)}
                        className="mt-1 text-xs font-bold text-indigo-500 hover:text-indigo-700
                          dark:hover:text-indigo-300 underline underline-offset-2
                          cursor-pointer transition-colors text-left"
                      >
                        {stage.decision}
                      </button>
                    ) : (
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 color-transition">
                        {stage.decision}
                      </p>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedVoting && (
        <VotingDetailModal
          sitting={selectedVoting.sitting}
          votNum={selectedVoting.votingNum}
          summary={selectedVoting}
          onClose={() => setSelectedVoting(null)}
        />
      )}
    </>
  );
}
