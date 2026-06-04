import { useState } from "react";
import {
  ExclamationCircleIcon,
  PaperAirplaneIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { useOpinions } from "../../Hooks/useLegislacja";
import { useUser } from "../../Contexts/UserContext";
import { formatDate } from "./legislacjaConstants";
import { useTranslation } from "react-i18next";
const ROLE_CFG = {
  Ekspert: {
    badge:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
    show: true,
  },
  Administrator: {
    badge: "bg-red-100   dark:bg-red-900/30   text-red-700   dark:text-red-400",
    show: true,
  },
  Moderator: {
    badge:
      "bg-blue-100  dark:bg-blue-900/30  text-blue-700  dark:text-blue-400",
    show: true,
  },
  Użytkownik: { badge: "", show: false },
};

const isExpert = (role) => role === "Ekspert";

/* ── Karta opinii ─────────────────────────────────────────────────────────── */
function OpinionCard({ op }) {
  const expert = isExpert(op.author_role);
  const roleCfg = ROLE_CFG[op.author_role] ?? {
    badge: "bg-slate-100 dark:bg-slate-800 text-slate-600",
    show: true,
  };
  const { t } = useTranslation();
  return (
    <div
      className={`relative rounded-[1.5rem] p-6 shadow-sm color-transition overflow-hidden
        border transition-colors
        ${
          expert
            ? "border-amber-300 dark:border-amber-600 bg-amber-50/40 dark:bg-amber-950/10"
            : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
        }`}
    >
      {/* Pasek eksperta u góry */}
      {expert && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" />
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
            <span
              className={`text-[9px] font-black px-1.5 py-0.5 rounded-md leading-none ${roleCfg.badge}`}
            >
              {op.author_role}
            </span>
          )}

          {/* Gwiazdka eksperta */}
          {expert && (
            <span
              className="text-amber-500 text-xs leading-none"
              title="Opinia eksperta"
            >
              ✦
            </span>
          )}
        </div>

        {/* Data */}
        <div className="flex items-center gap-1.5 shrink-0">
          <CalendarDaysIcon className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 color-transition">
            {formatDate(op.created_at?.slice(0, 10))}
          </span>
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

      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 color-transition">
        {op.content}
      </p>
    </div>
  );
}

export default function OpinionsSection({ num }) {
  const { user } = useUser();
  const { opinions, loading, submitting, error, postOpinion } =
    useOpinions(num);
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
        <div
          className="bg-slate-50 dark:bg-slate-800/40 rounded-[1.5rem]
          border border-slate-200 dark:border-slate-800 p-6 color-transition"
        >
          <p className="text-sm font-medium text-slate-400 dark:text-slate-500 color-transition">
            {t("institution.legislation.opinions.loginRequired")}
          </p>
        </div>
      )}

      {/* Lista opinii */}
      {loading ? (
        <div className="space-y-3 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-24 rounded-[1.5rem] bg-slate-100 dark:bg-slate-800 color-transition"
            />
          ))}
        </div>
      ) : opinions.length === 0 ? (
        <p className="text-sm font-medium text-slate-400 dark:text-slate-500 color-transition">
          {t("institution.legislation.opinions.noOpinions")}
        </p>
      ) : (
        <div className="space-y-3">
          {opinions.map((op) => (
            <OpinionCard key={op.id} op={op} />
          ))}
        </div>
      )}
    </div>
  );
}
