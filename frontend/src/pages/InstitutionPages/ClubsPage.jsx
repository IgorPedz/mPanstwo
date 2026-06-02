import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { pageVariants, sectionVariants } from "../../Utils/Animations";
import { useSejmClubs } from "../../Hooks/useSejm";
import clubsData from "../../data/clubsData";
import { CLUB_HEX } from "../../components/Sejm/Hemicycle";

const BASE = "http://localhost:5000";

/* ── Logo klubu ──────────────────────────────────────────────────────────── */
function ClubLogo({ id, name, size = "md" }) {
  const [err, setErr] = useState(false);
  const dim = size === "lg" ? "h-12 w-12" : "h-8 w-8";

  return err ? (
    <div className={`${dim} rounded-lg flex items-center justify-center text-white font-black text-[10px]`}
      style={{ background: CLUB_HEX[id] ?? "#94a3b8" }}>
      {id.slice(0, 2)}
    </div>
  ) : (
    <img
      src={`${BASE}/sejm/clubs/${encodeURIComponent(id)}/logo`}
      alt={name}
      onError={() => setErr(true)}
      className={`${dim} object-contain rounded-lg`}
    />
  );
}

/* ── Karta klubu ─────────────────────────────────────────────────────────── */
function ClubCard({ club, staticData }) {
  const hex     = CLUB_HEX[club.id] ?? "#94a3b8";
  const info    = staticData ?? { description: "", parties: [] };

  return (
    <motion.div
      variants={sectionVariants}
      className="rounded-3xl border border-slate-200/70 dark:border-slate-800/60
        bg-white dark:bg-slate-900 overflow-hidden color-transition"
    >
      {/* Pasek koloru */}
      <div className="h-1.5 w-full" style={{ background: hex }} />

      <div className="p-6 md:p-7 flex flex-col gap-4">

        {/* Nagłówek */}
        <div className="flex items-start gap-4">
          <ClubLogo id={club.id} name={club.name} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-md text-white"
                style={{ background: hex }}>
                {club.id}
              </span>
            </div>
            <h3 className="font-black text-sm leading-snug text-slate-900 dark:text-white color-transition">
              {club.name}
            </h3>
          </div>
          {/* Liczba posłów */}
          <div className="shrink-0 text-right">
            <p className="text-2xl font-black text-slate-900 dark:text-white color-transition">
              {club.membersCount}
            </p>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 color-transition">
              posłów
            </p>
          </div>
        </div>

        {/* Opis */}
        {info.description && (
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 color-transition">
            {info.description}
          </p>
        )}

        {/* Partie składowe */}
        {info.parties?.length > 0 && (
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest mb-2
              text-slate-400 dark:text-slate-500 color-transition">
              Partie składowe
            </p>
            <div className="flex flex-col gap-1.5">
              {info.parties.map((party, i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: party.color }} />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate color-transition">
                      {party.name}
                    </span>
                  </div>
                  {party.website && party.website !== "#" && (
                    <a href={party.website} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="shrink-0 inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest
                        text-slate-400 dark:text-slate-500
                        hover:text-slate-700 dark:hover:text-slate-200
                        transition-colors color-transition">
                      www
                      <ArrowTopRightOnSquareIcon className="h-2.5 w-2.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function ClubsPage() {
  const navigate = useNavigate();
  const { data: clubs, loading } = useSejmClubs();

  // Sortuj: największe kluby najpierw, niezrzeszeni na końcu
  const sorted = [...clubs].sort((a, b) => {
    if (a.id === "niez.") return 1;
    if (b.id === "niez.") return -1;
    return b.membersCount - a.membersCount;
  });

  const totalMPs = clubs.reduce((s, c) => s + c.membersCount, 0);

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="show"
      className="min-h-screen w-full px-4 md:px-8 py-10 md:py-14 color-transition">
      <div className="w-full space-y-5 color-transition">

        {/* ── Wróć ── */}
        <motion.div variants={sectionVariants}>
          <button onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-bold cursor-pointer group
              text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200
              transition-colors color-transition">
            <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Wróć
          </button>
        </motion.div>

        {/* ── Hero ── */}
        <motion.div variants={sectionVariants}
          className="relative w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
            bg-white dark:bg-slate-900 shadow-sm overflow-hidden color-transition">
          <div className="h-1.5 w-full bg-gradient-to-r from-indigo-800 to-indigo-600" />
          <div className="absolute -right-10 -bottom-10 pointer-events-none opacity-[0.04] dark:opacity-[0.07] text-indigo-800">
            <UserGroupIcon className="h-72 w-72" />
          </div>
          <div className="relative p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-6 min-w-0">
              <div className="shrink-0 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50
                border-2 border-slate-100 dark:border-slate-700/50 text-indigo-800 color-transition">
                <UserGroupIcon className="h-10 w-10" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-md
                    bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 color-transition">
                    Sejm RP
                  </span>
                  <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-md
                    bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 color-transition">
                    Władza ustawodawcza
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black leading-tight text-slate-900 dark:text-white color-transition">
                  Kluby i koła parlamentarne
                </h1>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-3xl font-black text-slate-900 dark:text-white color-transition">{clubs.length}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 color-transition">
                klubów i kół
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Skeleton ── */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse color-transition" />
            ))}
          </div>
        )}

        {/* ── Karty klubów ── */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {sorted.map(club => (
              <ClubCard
                key={club.id}
                club={club}
                staticData={clubsData[club.id]}
              />
            ))}
          </div>
        )}

        {/* ── Stopka ── */}
        {!loading && totalMPs > 0 && (
          <motion.p variants={sectionVariants}
            className="text-center text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">
            Łącznie {totalMPs} aktywnych posłów · X kadencja Sejmu RP · dane: api.sejm.gov.pl
          </motion.p>
        )}

      </div>
    </motion.div>
  );
}
