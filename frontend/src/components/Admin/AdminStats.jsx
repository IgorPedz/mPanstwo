import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { API_BASE } from "../../lib/apiConfig";
import { itemVariants } from "../../Utils/Animations.jsx";

const STAT_CARDS_CFG = [
  { key: "total",      tKey: "total",      color: "slate"   },
  { key: "users",      tKey: "users",      color: "slate"   },
  { key: "admins",     tKey: "admins",     color: "red"     },
  { key: "moderators", tKey: "moderators", color: "amber"   },
  { key: "experts",    tKey: "experts",    color: "violet"  },
  { key: "verified",   tKey: "verified",   color: "emerald" },
];

const EXTRA_CARDS_CFG = [
  { key: "opinions",  tKey: "opinions",  color: "indigo" },
  { key: "mpRatings", tKey: "mpRatings", color: "amber"  },
];

const COLOR = {
  slate:   "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white",
  red:     "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400",
  amber:   "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/50 text-amber-600 dark:text-amber-400",
  violet:  "bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800/50 text-violet-600 dark:text-violet-400",
  emerald: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400",
  indigo:  "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400",
};

export default function AdminStats() {
  const { t } = useTranslation();
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const STAT_CARDS  = STAT_CARDS_CFG.map((c)  => ({ ...c, label: t(`stats.cards.${c.tKey}`) }));
  const EXTRA_CARDS = EXTRA_CARDS_CFG.map((c)  => ({ ...c, label: t(`stats.cards.${c.tKey}`) }));

  useEffect(() => {
    axios.get(`${API_BASE}/admin/stats`, { withCredentials: true })
      .then((r) => setData(r.data))
      .catch((e) => setError(e.response?.data?.message || "Błąd ładowania"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-28 rounded-[1.5rem] bg-slate-100 dark:bg-slate-800 animate-pulse color-transition" />
      ))}
    </div>
  );

  if (error) return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50
      rounded-[1.5rem] p-8 text-center text-red-600 dark:text-red-400 font-bold color-transition">
      {error}
    </div>
  );

  const u = data?.users ?? {};

  return (
    <div className="space-y-8">
      {/* User stats */}
      <section>
        <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 color-transition">
          {t("stats.usersSection")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {STAT_CARDS.map((c, i) => (
            <motion.div
              key={c.key}
              variants={itemVariants}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`rounded-[1.5rem] border p-6 flex flex-col gap-2 shadow-sm color-transition ${COLOR[c.color]}`}
            >
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{c.label}</p>
              <p className="text-4xl font-black">{u[c.key] ?? "—"}</p>
            </motion.div>
          ))}
          {EXTRA_CARDS.map((c, i) => (
            <motion.div
              key={c.key}
              variants={itemVariants}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: (STAT_CARDS.length + i) * 0.05 }}
              className={`rounded-[1.5rem] border p-6 flex flex-col gap-2 shadow-sm color-transition ${COLOR[c.color]}`}
            >
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{c.label}</p>
              <p className="text-4xl font-black">{data?.[c.key] ?? "—"}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Registrations chart */}
      {data?.registrationsLast30?.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 color-transition">
            {t("stats.chartTitle")}
          </h2>
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800
            p-8 shadow-sm color-transition">
            <RegistrationsChart data={data.registrationsLast30} t={t} />
          </div>
        </motion.section>
      )}
    </div>
  );
}

const CHART_H = 160; // px — odpowiada h-40

// "2024-01-15" lub Date → "15 sty"
function fmtDay(raw) {
  if (!raw) return "";
  // MySQL zwraca "2024-01-15T00:00:00.000Z" lub "2024-01-15"
  const s = typeof raw === "string" ? raw.slice(0, 10) : raw.toISOString().slice(0, 10);
  const [y, m, d] = s.split("-").map(Number);
  // Budujemy Date w UTC żeby uniknąć przesunięcia strefy
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("pl-PL", { day: "numeric", month: "short", timeZone: "UTC" });
}

// Tylko numer dnia ("15") do osi X
function fmtDayShort(raw) {
  if (!raw) return "";
  const s = typeof raw === "string" ? raw.slice(0, 10) : raw.toISOString().slice(0, 10);
  return String(Number(s.split("-")[2])); // usuwa wiodące zero
}

function RegistrationsChart({ data, t }) {
  const counts = data.map((d) => d.count);
  const max    = Math.max(...counts, 1);
  const total  = counts.reduce((a, b) => a + b, 0);

  const labelStep = Math.max(1, Math.floor(data.length / 5));

  return (
    <div className="space-y-3">
      {/* Nagłówek z sumą */}
      <p className="text-sm font-bold text-slate-400 dark:text-slate-500 color-transition">
        {t("stats.registrationsTotal", { total, days: data.length })}
      </p>

      {/* Wykres */}
      <div className="relative" style={{ height: CHART_H + 20 }}>
        {/* Linie siatki */}
        {[0.25, 0.5, 0.75, 1].map((frac) => (
          <div
            key={frac}
            className="absolute left-0 right-0 border-t border-dashed border-slate-100 dark:border-slate-800 color-transition"
            style={{ bottom: 20 + frac * CHART_H }}
          />
        ))}

        {/* Słupki */}
        <div
          className="absolute left-0 right-0 flex items-end gap-[2px]"
          style={{ bottom: 20, height: CHART_H }}
        >
          {data.map((d, i) => {
            const pct       = d.count > 0 ? Math.max(d.count / max, 0.018) : 0;
            const barPx     = Math.round(pct * CHART_H);
            const showLabel = i % labelStep === 0 || i === data.length - 1;

            return (
              <div key={d.day ?? i} className="flex-1 h-full relative group flex flex-col justify-end">
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                  opacity-0 group-hover:opacity-100 transition-opacity duration-150
                  pointer-events-none z-20
                  bg-slate-900 dark:bg-white text-white dark:text-slate-900
                  text-[9px] font-black px-2 py-1 rounded-lg whitespace-nowrap shadow-xl">
                  {fmtDay(d.day)}
                  <span className="ml-1.5 text-indigo-300 dark:text-indigo-500">{d.count}</span>
                </div>

                {/* Słupek */}
                <motion.div
                  className="w-full rounded-t-sm bg-indigo-500 dark:bg-indigo-400
                    group-hover:bg-indigo-600 dark:group-hover:bg-indigo-300
                    transition-colors origin-bottom"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: d.count > 0 ? 1 : 0 }}
                  transition={{
                    scaleY: { type: "spring", damping: 18, stiffness: 220, delay: i * 0.015 },
                    opacity: { duration: 0.2, delay: i * 0.015 },
                  }}
                  style={{ height: barPx || 0 }}
                />

                {/* Etykieta dnia */}
                {showLabel && (
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2
                    text-[8px] font-bold text-slate-400 dark:text-slate-600 color-transition select-none">
                    {fmtDayShort(d.day)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Max label */}
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-sm bg-indigo-500 dark:bg-indigo-400 shrink-0" />
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">
          {t("stats.maxPerDay", { max })}
        </span>
      </div>
    </div>
  );
}
