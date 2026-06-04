import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { sectionVariants } from "../../Utils/Animations";
import { VOTE_CFG, STAT_KEYS, normalizeVote, fmtNum } from "./mpProfileConstants";
import SittingSection from "./SittingSection";

export default function MPVotingHistory({ refProp, votings, loading, total }) {
  const [voteFilter,    setVoteFilter]    = useState("all");
  const [voteSearch,    setVoteSearch]    = useState("");
  const [shownSittings, setShownSittings] = useState(10);

  useEffect(() => { setShownSittings(10); }, [voteFilter, voteSearch]);

  const grouped = useMemo(() => {
    if (!votings?.length) return [];
    const map = {};
    votings.forEach((v) => {
      if (!map[v.sitting]) map[v.sitting] = [];
      map[v.sitting].push({ ...v, _vote: normalizeVote(v.vote) });
    });
    return Object.entries(map)
      .map(([s, vs]) => ({ sitting: Number(s), votes: vs.sort((a, b) => a.votingNumber - b.votingNumber) }))
      .sort((a, b) => b.sitting - a.sitting);
  }, [votings]);

  const stats = useMemo(() => {
    const c = { YES: 0, NO: 0, ABSTAIN: 0, ABSENT: 0 };
    votings.forEach((v) => {
      const k = normalizeVote(v.vote);
      if (c[k] !== undefined) c[k]++;
    });
    const total = STAT_KEYS.reduce((s, k) => s + c[k], 0) || 1;
    return STAT_KEYS.map((k) => ({ key: k, count: c[k], pct: Math.round((c[k] / total) * 100) }));
  }, [votings]);

  const votesTotal = STAT_KEYS.reduce((s, k) => s + (stats.find((x) => x.key === k)?.count ?? 0), 0);

  const filteredGrouped = useMemo(() => {
    const q = voteSearch.trim().toLowerCase();
    return grouped
      .map((g) => {
        let votes = g.votes;
        if (voteFilter !== "all") votes = votes.filter((v) => v._vote === voteFilter);
        if (q) votes = votes.filter((v) => (v.topic ?? v.title ?? "").toLowerCase().includes(q));
        return { ...g, votes };
      })
      .filter((g) => g.votes.length > 0);
  }, [grouped, voteFilter, voteSearch]);

  const label = `Głosowania${votesTotal ? ` — ${fmtNum(votesTotal)}` : ""}`;

  return (
    <>
      {!loading && votesTotal > 0 && (
        <motion.div
          variants={sectionVariants}
          className="w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
            bg-white dark:bg-slate-900 p-6 md:p-8 color-transition"
        >
          <p className="text-[10px] font-black uppercase tracking-widest mb-4 text-slate-400 dark:text-slate-500 color-transition">
            Statystyki głosowań — {fmtNum(total)} głosowań
          </p>
          <div className="flex rounded-xl overflow-hidden h-3 mb-4">
            {stats.map((s) => s.pct > 0 && (
              <div key={s.key} className={`${VOTE_CFG[s.key].bar} transition-all`}
                style={{ width: `${s.pct}%` }} title={`${VOTE_CFG[s.key].label}: ${s.pct}%`} />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {stats.map((s) => (
              <div key={s.key} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${VOTE_CFG[s.key].bar}`} />
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 color-transition">{VOTE_CFG[s.key].label}</span>
                <span className="text-[11px] font-black text-slate-700 dark:text-slate-200 color-transition">{s.count}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 color-transition">({s.pct}%)</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Historia */}
      <motion.div
        ref={refProp}
        variants={sectionVariants}
        className="w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
          bg-white dark:bg-slate-900 p-6 md:p-8 color-transition"
      >
        <p className="text-[10px] font-black uppercase tracking-widest mb-5 text-slate-400 dark:text-slate-500 color-transition">
          {label}
        </p>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse color-transition" />
            ))}
          </div>
        ) : grouped.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500 color-transition">Brak danych o głosowaniach.</p>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setVoteFilter("all")}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wide transition-all
                  ${voteFilter === "all"
                    ? "bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  } color-transition`}
              >
                Wszystkie {votesTotal}
              </button>
              {STAT_KEYS.map((k) => {
                const s = stats.find((x) => x.key === k);
                return (
                  <button
                    key={k}
                    onClick={() => setVoteFilter(voteFilter === k ? "all" : k)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wide transition-all
                      ${voteFilter === k
                        ? `${VOTE_CFG[k].bg} ${VOTE_CFG[k].text}`
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 color-transition"
                      }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${VOTE_CFG[k].dot}`} />
                    {VOTE_CFG[k].label} {s?.count ?? 0}
                  </button>
                );
              })}
            </div>

            <div className="relative mb-4">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4
                text-slate-400 dark:text-slate-500 pointer-events-none" />
              <input
                type="text"
                value={voteSearch}
                onChange={(e) => setVoteSearch(e.target.value)}
                placeholder="Szukaj w tytułach głosowań..."
                className="w-full pl-9 pr-9 py-2.5 rounded-xl text-sm font-medium
                  bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60
                  text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/50 color-transition"
              />
              {voteSearch && (
                <button onClick={() => setVoteSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400
                    hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                  <XMarkIcon className="h-4 w-4" />
                </button>
              )}
            </div>

            {filteredGrouped.length === 0 ? (
              <p className="text-sm text-slate-400 dark:text-slate-500 color-transition text-center py-6">
                Brak głosowań spełniających kryteria.
              </p>
            ) : (
              <>
                <div className="space-y-3">
                  {filteredGrouped.slice(0, shownSittings).map((g, i) => (
                    <SittingSection
                      key={`${g.sitting}-${voteFilter}-${voteSearch}`}
                      sitting={g.sitting}
                      votes={g.votes}
                      defaultOpen={i === 0}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">
                    {Math.min(shownSittings, filteredGrouped.length)} / {filteredGrouped.length} posiedzeń
                  </span>
                  {filteredGrouped.length > shownSittings && (
                    <button
                      onClick={() => setShownSittings((n) => n + 10)}
                      className="px-4 py-2 rounded-xl text-xs font-black
                        bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300
                        hover:bg-slate-200 dark:hover:bg-slate-700 transition-all color-transition"
                    >
                      Pokaż 10 więcej
                    </button>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </motion.div>
    </>
  );
}
