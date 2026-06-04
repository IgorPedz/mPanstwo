import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useBillVotingDetail } from "../../Hooks/useLegislacja";
import { formatDate } from "./legislacjaConstants";
import { useTranslation } from "react-i18next";

function sejmPortalUrl(sitting, votNum) {
  return `https://www.sejm.gov.pl/Sejm10.nsf/agent.xsp?symbol=glosowania&NrKadencji=10&NrPosiedzenia=${sitting}&NrGlosowania=${votNum}`;
}

function pdfUrl(sitting, votNum) {
  return `https://api.sejm.gov.pl/sejm/term10/votings/${sitting}/${votNum}/pdf`;
}

function getMajority(majorityType, voted, t) {
  const k = (majorityType ?? "").toUpperCase();
  if (k.includes("THREE_FIFTH") || k.includes("3_5") || k.includes("TRZY_PIAT"))
    return { label: t("institution.legislation.voting.majorityThreeFifths"), threshold: Math.ceil(voted * 3 / 5), type: "qualified" };
  if (k.includes("TWO_THIRD") || k.includes("QUALIFIED") || k.includes("KWALIF") || k.includes("2_3"))
    return { label: t("institution.legislation.voting.majorityTwoThirds"), threshold: Math.ceil(voted * 2 / 3), type: "qualified" };
  if (k.includes("ABSOLUTE") || k.includes("BEZWZGL"))
    return { label: t("institution.legislation.voting.majorityAbsolute"), threshold: Math.floor(voted / 2) + 1, type: "absolute" };
  // Simple majority
  return { label: t("institution.legislation.voting.majoritySimple"), threshold: Math.floor(voted / 2) + 1, type: "simple" };
}

function isPassed(yes, no, majority) {
  if (majority.type === "simple")
    return majority.threshold != null
      ? (yes ?? 0) >= majority.threshold
      : (yes ?? 0) > (no ?? 0);
  return (yes ?? 0) >= (majority.threshold ?? 0);
}

const RESULT_COL_DEFS = [
  { key: "yes",       tKey: "institution.legislation.voting.yes",       dot: "bg-emerald-500", num: "text-emerald-600 dark:text-emerald-400" },
  { key: "no",        tKey: "institution.legislation.voting.no",        dot: "bg-red-500",     num: "text-red-600 dark:text-red-400" },
  { key: "abstain",   tKey: "institution.legislation.voting.abstain",   dot: "bg-amber-400",   num: "text-amber-600 dark:text-amber-400" },
  { key: "notVoting", tKey: "institution.legislation.voting.notVoting", dot: "bg-slate-300 dark:bg-slate-600", num: "text-slate-500 dark:text-slate-400" },
];

export default function VotingDetailModal({ sitting, votNum, summary, onClose }) {
  const { detail, loading } = useBillVotingDetail(sitting, votNum);
  const { t } = useTranslation();

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const d        = detail ?? summary;
  const clubs    = detail?.clubs ?? [];
  const dateStr  = d?.date ? d.date.slice(0, 10) : null;
  const voted    = (d?.yes ?? 0) + (d?.no ?? 0) + (d?.abstain ?? 0);
  const majority = getMajority(d?.majorityType ?? d?.kind, voted, t);
  const minToWin = majority.threshold;
  const passed   = d?.yes != null ? isPassed(d.yes, d.no, majority) : null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-3xl max-h-[90vh] flex flex-col
            bg-white dark:bg-slate-900 rounded-[2rem]
            border border-slate-200 dark:border-slate-800 shadow-2xl color-transition overflow-hidden"
        >
          {/* ── Header ── */}
          <div className="shrink-0 bg-white dark:bg-slate-900 rounded-t-[2rem]
            border-b border-slate-100 dark:border-slate-800 px-8 pt-7 pb-5 color-transition">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">
                  {d?.sitting ?? sitting}. {t("institution.legislation.voting.sejmSession")}
                </p>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter
                  text-slate-900 dark:text-white color-transition mt-1 leading-tight">
                  {t("institution.legislation.voting.votingNumber")} {d?.votingNum ?? votNum}
                </h2>
                <div className="h-1 w-14 bg-indigo-500 rounded-full mt-2 mb-3" />

                {/* Passed badge */}
                {passed !== null && (
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl mb-2
                    text-[10px] font-black uppercase tracking-widest
                    ${passed
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                      : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    } color-transition`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${passed ? "bg-emerald-500" : "bg-red-500"}`} />
                    {passed ? t("institution.legislation.voting.passed") : t("institution.legislation.voting.rejected")}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-2 mt-1">
                  {/* Majority */}
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">
                    {majority.label}
                  </span>
                  {d?.yes != null && (
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg
                      bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 color-transition">
                      {t("institution.legislation.voting.minVotes", { count: minToWin })}
                    </span>
                  )}
                  {dateStr && (
                    <span className="text-[10px] text-slate-300 dark:text-slate-600">·</span>
                  )}
                  {dateStr && (
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">
                      {formatDate(dateStr)}{d?.date?.length > 10 && ` · ${t("institution.legislation.voting.hour")} ${d.date.slice(11, 19)}`}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <a
                    href={sejmPortalUrl(sitting, votNum)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl
                      text-[10px] font-black uppercase tracking-widest
                      bg-slate-900 dark:bg-white text-white dark:text-slate-900
                      hover:opacity-75 transition-opacity cursor-pointer"
                  >
                    sejm.gov.pl
                    <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                  </a>
                  <a
                    href={pdfUrl(sitting, votNum)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl
                      text-[10px] font-black uppercase tracking-widest
                      bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200
                      border border-slate-200 dark:border-slate-700
                      hover:opacity-75 transition-opacity cursor-pointer color-transition"
                  >
                    {t("institution.legislation.voting.individualPdf")}
                    <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                  </a>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800
                  transition-colors cursor-pointer color-transition shrink-0 mt-1"
              >
                <XMarkIcon className="h-5 w-5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="overflow-y-auto px-8 py-7 space-y-7">

            {/* Topic */}
            {(d?.topic || d?.title) && (
              <div className="px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50
                border border-slate-200 dark:border-slate-700/60 color-transition">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-relaxed color-transition">
                  {d.topic ?? d.title}
                </p>
              </div>
            )}

            {/* Result cards */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3 color-transition">
                {t("institution.legislation.voting.results")}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {RESULT_COL_DEFS.map(({ key, tKey, dot, num }) => (
                  <div key={key}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800
                      bg-white dark:bg-slate-900 p-5 color-transition">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className={`w-2 h-2 rounded-full ${dot}`} />
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        {t(tKey)}
                      </span>
                    </div>
                    <p className={`text-3xl font-black ${num}`}>{d?.[key] ?? "—"}</p>
                  </div>
                ))}
              </div>
              {d?.yes != null && (
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-3 color-transition">
                  {t("institution.legislation.voting.totalVoted")}{" "}
                  <span className="text-slate-700 dark:text-slate-200 font-black">{voted}</span>
                  {" "}{t("institution.legislation.voting.mps")}
                </p>
              )}
            </div>

            {/* Club table */}
            {loading && (
              <div className="animate-pulse space-y-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 color-transition" />
                ))}
              </div>
            )}

            {clubs.length > 0 && (
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3 color-transition">
                  {t("institution.legislation.voting.byClub")}
                </p>
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden color-transition">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/70 color-transition">
                        {[
                          { h: t("institution.legislation.voting.club"),      cls: "text-left" },
                          { h: t("institution.legislation.voting.members"),   cls: "text-right" },
                          { h: t("institution.legislation.voting.voted"),     cls: "text-right" },
                          { h: t("institution.legislation.voting.yes"),       cls: "text-right text-emerald-600 dark:text-emerald-400" },
                          { h: t("institution.legislation.voting.no"),        cls: "text-right text-red-500" },
                          { h: t("institution.legislation.voting.abstained"), cls: "text-right text-amber-500" },
                          { h: t("institution.legislation.voting.absent"),    cls: "text-right text-slate-400" },
                        ].map(({ h, cls }) => (
                          <th key={h} className={`px-4 py-3 font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 ${cls} color-transition`}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {clubs.map((c) => (
                        <tr key={c.club}
                          className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/40
                            transition-colors color-transition">
                          <td className="px-4 py-3 font-black text-slate-800 dark:text-slate-100 color-transition">
                            {c.club}
                          </td>
                          <td className="px-4 py-3 text-right text-slate-400 dark:text-slate-500">{c.totalMembers || "—"}</td>
                          <td className="px-4 py-3 text-right font-bold text-slate-600 dark:text-slate-300">{c.voted}</td>
                          <td className="px-4 py-3 text-right font-black text-emerald-600 dark:text-emerald-400">
                            {c.yes || <span className="text-slate-200 dark:text-slate-700 font-normal">—</span>}
                          </td>
                          <td className="px-4 py-3 text-right font-black text-red-500">
                            {c.no || <span className="text-slate-200 dark:text-slate-700 font-normal">—</span>}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-amber-500">
                            {c.abstain || <span className="text-slate-200 dark:text-slate-700 font-normal">—</span>}
                          </td>
                          <td className="px-4 py-3 text-right text-slate-400 dark:text-slate-500">
                            {c.notVoting || <span className="text-slate-200 dark:text-slate-700">—</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
