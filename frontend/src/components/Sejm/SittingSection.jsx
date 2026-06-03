import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { VOTE_CFG, STAT_KEYS, getVote, normalizeVote } from "./mpProfileConstants";

export default function SittingSection({ sitting, votes, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);

  const stats = useMemo(() => {
    const c = { YES: 0, NO: 0, ABSTAIN: 0, ABSENT: 0 };
    votes.forEach((v) => {
      const k = normalizeVote(v.vote);
      if (c[k] !== undefined) c[k]++;
    });
    return c;
  }, [votes]);

  const statsTotal = STAT_KEYS.reduce((s, k) => s + stats[k], 0);

  return (
    <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800/60 overflow-hidden color-transition">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4
          bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50
          transition-colors cursor-pointer color-transition"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex flex-col items-start">
            <span className="text-xs font-black text-slate-900 dark:text-white color-transition">Posiedzenie {sitting}</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 color-transition">{votes[0]?.date ?? ""}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 flex-wrap">
            {STAT_KEYS.map((k) => stats[k] > 0 && (
              <span key={k} className="flex items-center gap-1 text-[9px] font-bold text-slate-500 dark:text-slate-400">
                <span className={`w-1.5 h-1.5 rounded-full ${VOTE_CFG[k].bar}`} />
                {VOTE_CFG[k].label} {stats[k]}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">{statsTotal} głos.</span>
          <ChevronDownIcon className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 color-transition">
              {votes.map((v, i) => {
                const cfg = getVote(v.vote);
                return (
                  <div key={i} className="flex items-start justify-between gap-3 px-5 py-3 bg-white dark:bg-slate-900 color-transition">
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-medium leading-snug text-slate-700 dark:text-slate-300 color-transition line-clamp-2">
                        {v.topic ?? v.title ?? `Głosowanie nr ${v.votingNumber}`}
                      </p>
                      <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5 color-transition">nr {v.votingNumber}</p>
                    </div>
                    <span className={`shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black ${cfg.bg} ${cfg.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {cfg.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
