import { useState } from "react";
import {
  ExclamationCircleIcon,
  PaperAirplaneIcon,
  CalendarDaysIcon,
  FlagIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import axios from "axios";
import { useOpinions } from "../../Hooks/useLegislacja";
import { useUser } from "../../Contexts/UserContext";
import { formatDate } from "./legislacjaConstants";
import { useTranslation } from "react-i18next";
import ReportModal from "./ReportModal";
import { API_BASE } from "../../lib/apiConfig";

const ROLE_CFG = {
  Ekspert: {
    badge: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
    show: true,
  },
  Administrator: {
    badge: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    show: true,
  },
  Moderator: {
    badge: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
    show: true,
  },
  Użytkownik: { badge: "", show: false },
};

const isExpertRole = (role) => role === "Ekspert";

/* ── Karta opinii ─────────────────────────────────────────────────────────── */
function OpinionCard({ op, currentUser, onEndorseToggle }) {
  const expert  = isExpertRole(op.author_role);
  const roleCfg = ROLE_CFG[op.author_role] ?? {
    badge: "bg-slate-100 dark:bg-slate-800 text-slate-600",
    show: true,
  };
  const { t } = useTranslation();
  const [reportOpen,   setReportOpen]   = useState(false);
  const [endorsing,    setEndorsing]    = useState(false);
  const [endorsed,     setEndorsed]     = useState(!!op.endorsed_by);
  const [endorserName, setEndorserName] = useState(op.endorser_name ?? null);

  // eslint-disable-next-line eqeqeq
  const canReport  = currentUser?.id && currentUser.id != op.author_id;
  const isExpertUser = currentUser?.role === "Ekspert";
  // eslint-disable-next-line eqeqeq
  const canEndorse = isExpertUser && currentUser?.id != op.author_id;
  const myEndorsement = endorsed && op.endorsed_by == currentUser?.id;

  const handleEndorse = async () => {
    if (endorsing) return;
    setEndorsing(true);
    try {
      const { data } = await axios.put(
        `${API_BASE}/legislation/opinions/${op.id}/endorse`,
        {},
        { withCredentials: true }
      );
      setEndorsed(data.endorsed);
      if (data.endorsed) {
        setEndorserName(currentUser?.name ?? "Ekspert");
      } else {
        setEndorserName(null);
      }
      if (onEndorseToggle) onEndorseToggle(op.id, data.endorsed);
    } catch (e) {
      console.error("Endorse error", e);
    } finally {
      setEndorsing(false);
    }
  };

  const isEndorsed = endorsed;

  return (
    <div
      className={`relative rounded-[1.5rem] p-6 shadow-sm color-transition overflow-hidden
        border transition-colors
        ${expert
          ? "border-amber-300 dark:border-amber-600 bg-amber-50/40 dark:bg-amber-950/10"
          : isEndorsed
            ? "border-amber-200 dark:border-amber-700/50 bg-amber-50/20 dark:bg-amber-950/5"
            : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
        }`}
    >
      {/* Pasek eksperta u góry */}
      {expert && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" />
      )}
      {/* Pasek endorsementu u góry (dla opinii zwykłych użytkowników) */}
      {isEndorsed && !expert && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-300/60 via-amber-400/80 to-amber-300/60" />
      )}

      <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
        {/* Autor + ranga + rola */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-sm font-black color-transition
            ${expert ? "text-amber-800 dark:text-amber-200" : "text-slate-900 dark:text-white"}`}
          >
            {op.author_name}
          </span>

          {/* Ranga */}
          {op.rank_name && (
            <span
              className="text-[9px] font-black px-1.5 py-0.5 rounded-md text-white leading-none"
              style={{ backgroundColor: op.rank_color || "#94a3b8" }}
            >
              {t(`achievements.ranks.${op.rank_name}.name`)}
            </span>
          )}

          {/* Rola (pomijamy "Użytkownik") */}
          {roleCfg.show && (
            <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md leading-none ${roleCfg.badge}`}>
              {op.author_role}
            </span>
          )}

          {/* Gwiazdka eksperta-autora */}
          {expert && (
            <span className="text-amber-500 text-xs leading-none" title={t("institution.legislation.opinions.expertOpinion")}>
              ✦
            </span>
          )}
        </div>

        {/* Data + akcje */}
        <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
          <CalendarDaysIcon className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 color-transition">
            {formatDate(op.created_at?.slice(0, 10))}
          </span>

          {/* Przycisk weryfikacji — tylko dla ekspertów (nie własna opinia) */}
          {canEndorse && (
            <motion.button
              onClick={handleEndorse}
              disabled={endorsing}
              whileTap={{ scale: 0.88 }}
              title={myEndorsement ? t("institution.legislation.opinions.removeEndorse") : t("institution.legislation.opinions.endorse")}
              className={`ml-1 p-1.5 rounded-xl transition-colors cursor-pointer
                ${myEndorsement
                  ? "text-amber-500 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/40"
                  : isEndorsed
                    ? "text-slate-300 dark:text-slate-600 hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                    : "text-slate-300 dark:text-slate-600 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                } disabled:opacity-50`}
            >
              {myEndorsement
                ? <StarSolid className="h-3.5 w-3.5" />
                : <StarIcon className="h-3.5 w-3.5" />
              }
            </motion.button>
          )}

          {/* Przycisk zgłoszenia */}
          {canReport && (
            <button
              onClick={() => setReportOpen(true)}
              title={t("institution.legislation.opinions.reportOpinion")}
              className="p-1.5 rounded-xl text-slate-300 dark:text-slate-600
                hover:text-red-500 dark:hover:text-red-400
                hover:bg-red-50 dark:hover:bg-red-900/20
                transition-colors cursor-pointer"
            >
              <FlagIcon className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Label "Opinia eksperta" */}
      {expert && (
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px flex-1 bg-gradient-to-r from-amber-300 to-transparent" />
          <span className="text-[8px] font-black uppercase tracking-widest text-amber-500">
            {t("institution.legislation.opinions.expertOpinion")}
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-amber-300 to-transparent" />
        </div>
      )}

      {/* Badge weryfikacji eksperta */}
      {isEndorsed && (
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl
            bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40
            color-transition">
            <StarSolid className="h-3 w-3 text-amber-500 shrink-0" />
            <span className="text-[9px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">
              {t("institution.legislation.opinions.importantOpinion")}
            </span>
            {endorserName && (
              <span className="text-[9px] font-bold text-amber-500/70 dark:text-amber-500/60">
                · {endorserName}
              </span>
            )}
          </div>
        </div>
      )}

      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 color-transition">
        {op.content}
      </p>

      {/* Report modal */}
      {reportOpen && (
        <ReportModal
          opinionId={op.id}
          authorName={op.author_name}
          onClose={() => setReportOpen(false)}
        />
      )}
    </div>
  );
}

export default function OpinionsSection({ num }) {
  const { user } = useUser();
  const { opinions, loading, submitting, error, postOpinion } = useOpinions(num);
  const [text, setText] = useState("");
  const { t } = useTranslation();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const { success } = await postOpinion(text.trim());
    if (success) setText("");
  }

  return (
    <div className="space-y-6">
      {/* Formularz */}
      {user?.id ? (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-50 dark:bg-slate-800/40 rounded-[1.5rem]
            border border-slate-200 dark:border-slate-800 p-6 space-y-4 color-transition"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 color-transition">
            {t("institution.legislation.opinions.yourOpinion")}
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("institution.legislation.opinions.placeholder")}
            maxLength={2000}
            rows={4}
            className="w-full resize-none rounded-2xl px-4 py-3 text-sm
              bg-white dark:bg-slate-900
              border border-slate-200 dark:border-slate-700
              text-slate-900 dark:text-white
              placeholder-slate-400 dark:placeholder-slate-500
              focus:outline-none focus:border-indigo-300 dark:focus:border-indigo-700
              color-transition transition-colors"
          />
          {error && (
            <p className="text-xs font-bold text-red-500 flex items-center gap-1.5">
              <ExclamationCircleIcon className="h-3.5 w-3.5" />
              {error}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">
              {text.length} / 2000
            </span>
            <button
              type="submit"
              disabled={submitting || !text.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl
                text-xs font-black uppercase tracking-widest
                bg-slate-900 dark:bg-white text-white dark:text-slate-900
                hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed
                transition-opacity cursor-pointer shadow-sm"
            >
              {submitting ? t("institution.legislation.opinions.sending") : t("institution.legislation.opinions.add")}
              <PaperAirplaneIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-slate-50 dark:bg-slate-800/40 rounded-[1.5rem]
          border border-slate-200 dark:border-slate-800 p-6 color-transition">
          <p className="text-sm font-medium text-slate-400 dark:text-slate-500 color-transition">
            {t("institution.legislation.opinions.loginRequired")}
          </p>
        </div>
      )}

      {/* Lista opinii */}
      {loading ? (
        <div className="space-y-3 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 rounded-[1.5rem] bg-slate-100 dark:bg-slate-800 color-transition" />
          ))}
        </div>
      ) : opinions.length === 0 ? (
        <p className="text-sm font-medium text-slate-400 dark:text-slate-500 color-transition">
          {t("institution.legislation.opinions.noOpinions")}
        </p>
      ) : (
        <div className="space-y-3">
          {opinions.map((op) => (
            <OpinionCard key={op.id} op={op} currentUser={user} />
          ))}
        </div>
      )}
    </div>
  );
}
