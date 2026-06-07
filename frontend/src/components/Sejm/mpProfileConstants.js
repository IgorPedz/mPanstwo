export const VOTE_CFG = {
  YES:          { labelKey: "institution.mp.vote.YES",     bg: "bg-emerald-500/15 dark:bg-emerald-500/20", text: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500", bar: "bg-emerald-500" },
  NO:           { labelKey: "institution.mp.vote.NO",      bg: "bg-red-500/15 dark:bg-red-500/20",         text: "text-red-600 dark:text-red-400",         dot: "bg-red-500",     bar: "bg-red-500"     },
  ABSTAIN:      { labelKey: "institution.mp.vote.ABSTAIN", bg: "bg-amber-500/15 dark:bg-amber-500/20",     text: "text-amber-600 dark:text-amber-400",     dot: "bg-amber-500",   bar: "bg-amber-400"   },
  ABSENT:       { labelKey: "institution.mp.vote.ABSENT",  bg: "bg-slate-500/10 dark:bg-slate-500/15",     text: "text-slate-500 dark:text-slate-400",     dot: "bg-slate-400",   bar: "bg-slate-400"   },
  VOTE_VALID_1: { labelKey: "institution.mp.vote.YES",     bg: "bg-emerald-500/15 dark:bg-emerald-500/20", text: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500", bar: "bg-emerald-500" },
  VOTE_VALID_0: { labelKey: "institution.mp.vote.NO",      bg: "bg-red-500/15 dark:bg-red-500/20",         text: "text-red-600 dark:text-red-400",         dot: "bg-red-500",     bar: "bg-red-500"     },
  VOTE_VALID:   { labelKey: "institution.mp.vote.ON_LIST", bg: "bg-indigo-500/10 dark:bg-indigo-500/15",    text: "text-indigo-500 dark:text-indigo-400",   dot: "bg-indigo-400",  bar: "bg-indigo-400"  },
};

export const STAT_KEYS = ["YES", "NO", "ABSTAIN", "ABSENT"];

export const getVote = (v) =>
  VOTE_CFG[v] ?? { labelKey: null, label: v ?? "—", bg: "bg-slate-100 dark:bg-slate-800", text: "text-slate-500", dot: "bg-slate-400", bar: "bg-slate-400" };

export const resolveVoteLabel = (cfg, t) =>
  cfg.labelKey ? t(cfg.labelKey) : (cfg.label ?? "—");

export const normalizeVote = (v) =>
  v === "VOTE_VALID_1" ? "YES" : v === "VOTE_VALID_0" ? "NO" : v;

export const fmtDate = (s) => {
  if (!s) return null;
  const [y, m, d] = s.split("-");
  return `${d}-${m}-${y}`;
};

export const fmtNum = (n) => (n != null ? Number(n).toLocaleString("pl-PL") : null);
