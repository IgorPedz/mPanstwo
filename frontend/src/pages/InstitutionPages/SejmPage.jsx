import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ArrowTopRightOnSquareIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import {
  pageVariants,
  sectionVariants,
  itemVariants,
  containerVariants,
} from "../../Utils/Animations";
import ICON_MAP   from "../../Utils/Maps/Icons";
import { ACCENT_MAP } from "../../Utils/Maps/Accents";
import { COLOR_MAP }  from "../../Utils/Maps/Colors";
import sejmData   from "../../data/sejmData";
import { useSejmLeadership, useSejmClubs, useSejmProceedings } from "../../Hooks/useSejm";
import Hemicycle, { CLUB_HEX } from "../../components/Sejm/Hemicycle";

const BASE = "http://localhost:5000";

/* ── Zdjęcie posła ───────────────────────────────────────────────────────── */
function MPPhoto({ name, src, className, initialsClass }) {
  const [imgError, setImgError] = useState(false);
  const initials = (name ?? "").split(" ").filter(Boolean).map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className={`${className} bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden color-transition`}>
      {src && !imgError ? (
        <img src={src} alt={name} onError={() => setImgError(true)}
          className="w-full h-full object-cover" style={{ objectPosition: "center 15%" }} />
      ) : (
        <span className={`font-black select-none ${initialsClass}`}>{initials}</span>
      )}
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function SejmPage() {
  const navigate = useNavigate();

  const data          = sejmData;
  const accent        = data.accent;
  const IconComponent = ICON_MAP[data.icon] ?? ICON_MAP["parliament"];
  const colorClass    = COLOR_MAP[accent]   ?? "text-indigo-800";
  const accentGradient = ACCENT_MAP[accent] ?? "from-indigo-800 to-indigo-600";

  const { data: leadership, loading: leaderLoading } = useSejmLeadership();
  const { data: clubs,      loading: clubsLoading  } = useSejmClubs();
  const { data: proceedings,loading: procLoading   } = useSejmProceedings();

  /* Karuzela kierownictwa */
  const [leaderOffset, setLeaderOffset] = useState(0);
  const [visible, setVisible] = useState(4);

  useEffect(() => {
    const update = () => setVisible(window.innerWidth >= 640 ? 4 : 2);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const cardPct = 100 / visible;
  const canPrev = leaderOffset > 0;
  const canNext = leaderOffset < leadership.length - visible;

  /* Posiedzenia */
  const PROC_PER_PAGE = 2;
  const [procPage, setProcPage] = useState(0);
  const [procDir,  setProcDir]  = useState(1);
  const totalProcPages = Math.ceil(proceedings.length / PROC_PER_PAGE);

  const slideVariants = {
    enter:  dir => ({ x: dir > 0 ?  60 : -60, opacity: 0 }),
    center: ()  => ({ x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }),
    exit:   dir => ({ x: dir > 0 ? -60 :  60, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }),
  };

  /* Łączna liczba posłów */
  const totalMembers = clubs.reduce((s, c) => s + (c.membersCount ?? 0), 0) || 460;

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="show"
      className="min-h-screen w-full px-4 md:px-8 py-10 md:py-14 color-transition">
      <div className="w-full space-y-5 color-transition">

        {/* ── Wróć ── */}
        <motion.div variants={sectionVariants}>
          <button onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-bold cursor-pointer group
              text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors color-transition">
            <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Wróć
          </button>
        </motion.div>

        {/* ── 1. HERO ── */}
        <motion.div variants={sectionVariants}
          className="relative w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
            bg-white dark:bg-slate-900 shadow-sm overflow-hidden color-transition">
          <div className={`h-1.5 w-full bg-gradient-to-r ${accentGradient}`} />
          <div className={`absolute -right-10 -bottom-10 pointer-events-none opacity-[0.04] dark:opacity-[0.07] color-transition ${colorClass}`}>
            <IconComponent className="h-72 w-72" />
          </div>
          <div className="relative p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-6 min-w-0">
              <div className={`shrink-0 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50
                border-2 border-slate-100 dark:border-slate-700/50 color-transition ${colorClass}`}>
                <IconComponent className="h-10 w-10" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-md
                    bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 color-transition">
                    {data.type}
                  </span>
                  <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-md
                    bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 color-transition">
                    Władza ustawodawcza
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black leading-tight text-slate-900 dark:text-white color-transition">
                  Sejm Rzeczypospolitej Polskiej
                </h1>
              </div>
            </div>
            <a href={data.website} target="_blank" rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wide
                bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300
                hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700/50
                transition-colors cursor-pointer color-transition">
              Strona oficjalna
              <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>

        {/* ── 2. PREZYDIUM ── */}
        <motion.div variants={sectionVariants}
          className="w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
            bg-white dark:bg-slate-900 p-6 md:p-8 color-transition">
          <p className="text-[10px] font-black uppercase tracking-widest mb-5
            text-slate-400 dark:text-slate-500 color-transition">
            {data.leadershipLabel}
          </p>

          {leaderLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl aspect-[3/4]
                  bg-slate-100 dark:bg-slate-800 color-transition" />
              ))}
            </div>
          ) : (
            <>
              <div className="overflow-hidden -mx-1.5">
                <motion.div className="flex"
                  animate={{ x: `-${leaderOffset * cardPct}%` }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}>
                  {leadership.map((person, i) => {
                    const isMarszalek = person.role === "marszalek";
                    return (
                      <div key={i} className="flex-none px-1.5" style={{ width: `${cardPct}%` }}>
                        <div className={`relative rounded-2xl overflow-hidden aspect-[3/4] w-full group
                          ${isMarszalek ? "ring-2 ring-slate-300 dark:ring-slate-600" : ""}`}>
                          <MPPhoto
                            name={person.name}
                            src={`${BASE}/sejm/mp/${person.id}/photo`}
                            className="absolute inset-0 w-full h-full transition-transform duration-300 sm:group-hover:scale-105"
                            initialsClass={`text-2xl ${colorClass}`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                          {isMarszalek && (
                            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentGradient}`} />
                          )}
                          {/* Etykieta klubu */}
                          <div className="absolute top-2 left-2">
                            <span className="text-[8px] font-black px-1.5 py-0.5 rounded-md text-white"
                              style={{ background: CLUB_HEX[person.club] ?? "#94a3b8" }}>
                              {person.club}
                            </span>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-3
                            transition-all duration-200 translate-y-2 opacity-0
                            sm:translate-y-0 sm:opacity-100
                            group-hover:translate-y-0 group-hover:opacity-100">
                            {isMarszalek && (
                              <span className={`text-[8px] font-black uppercase tracking-widest block mb-0.5 ${colorClass}`}>
                                Marszałek
                              </span>
                            )}
                            <p className="font-black text-xs leading-tight text-white">{person.name}</p>
                            <p className="text-[10px] font-medium mt-0.5 leading-tight text-white/60">{person.title}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>

              {leadership.length > visible && (
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setLeaderOffset(o => Math.max(0, o - 1))} disabled={!canPrev}
                      className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer
                        bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400
                        hover:bg-slate-200 dark:hover:bg-slate-700
                        disabled:opacity-30 disabled:cursor-not-allowed transition-all color-transition">
                      <ArrowLeftIcon className="h-4 w-4" />
                    </button>
                    <button onClick={() => setLeaderOffset(o => Math.min(leadership.length - visible, o + 1))} disabled={!canNext}
                      className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer
                        bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400
                        hover:bg-slate-200 dark:hover:bg-slate-700
                        disabled:opacity-30 disabled:cursor-not-allowed transition-all color-transition">
                      <ArrowRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">
                    {leaderOffset + 1} – {Math.min(leaderOffset + visible, leadership.length)} / {leadership.length}
                  </span>
                </div>
              )}
            </>
          )}
        </motion.div>

        {/* ── 3. SKŁAD SEJMU — HEMICYKL ── */}
        <motion.div variants={sectionVariants}
          className="w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
            bg-white dark:bg-slate-900 p-6 md:p-8 color-transition">
          <div className="flex items-center justify-between mb-5">
            <p className="text-[10px] font-black uppercase tracking-widest
              text-slate-400 dark:text-slate-500 color-transition">
              Skład Sejmu — podział mandatów
            </p>
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 color-transition">
              {totalMembers} posłów
            </span>
          </div>

          {clubsLoading ? (
            <div className="w-full aspect-[2/1] rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse color-transition" />
          ) : (
            <Hemicycle clubs={clubs} />
          )}
        </motion.div>

        {/* ── 4. POSIEDZENIA ── */}
        <motion.div variants={sectionVariants}
          className="w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
            bg-white dark:bg-slate-900 color-transition overflow-hidden">
          <div className="flex items-center justify-between px-7 md:px-8 pt-7 pb-5">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 color-transition">
              Ostatnie posiedzenia
            </p>
            <a href="https://www.sejm.gov.pl/Sejm10.nsf/agent.xsp?symbol=posiedzenia&NrKadencji=10" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest
                text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors color-transition">
              Wszystkie
              <ArrowTopRightOnSquareIcon className="h-3 w-3" />
            </a>
          </div>

          <div className="px-7 md:px-8 pb-7">
            {procLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="animate-pulse rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 color-transition">
                    <div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 color-transition" />
                    <div className="p-4 space-y-2">
                      <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-4/5 color-transition" />
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full w-1/4 color-transition" />
                    </div>
                  </div>
                ))}
              </div>
            ) : proceedings.length === 0 ? (
              <p className="text-sm text-slate-400 dark:text-slate-500 color-transition">Brak danych.</p>
            ) : (
              <>
                <div className="relative overflow-hidden">
                  <AnimatePresence mode="wait" custom={procDir}>
                    <motion.div key={procPage} custom={procDir} variants={slideVariants}
                      initial="enter" animate="center" exit="exit"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {proceedings
                        .slice(procPage * PROC_PER_PAGE, (procPage + 1) * PROC_PER_PAGE)
                        .map((p, i) => (
                          <a key={i}
                            href={`https://www.sejm.gov.pl/Sejm10.nsf/GlosowaniaPosiedzenie.xsp?posiedzenie=${p.number}`}
                            target="_blank" rel="noopener noreferrer"
                            className={`group flex flex-col rounded-2xl overflow-hidden cursor-pointer
                              transition-all color-transition
                              ${p.upcoming
                                ? "border-2 border-indigo-300 dark:border-indigo-700 bg-indigo-50/50 dark:bg-indigo-950/20 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md"
                                : "border border-slate-200/70 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md"
                              }`}>
                            {/* Placeholder graficzny */}
                            <div className={`relative w-full aspect-video flex flex-col items-center justify-center gap-3
                              bg-gradient-to-br ${accentGradient} ${p.upcoming ? "opacity-100" : "opacity-80"}`}>
                              <IconComponent className="h-10 w-10 text-white/60" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-white/50">
                                Sejm RP
                              </span>
                              {p.upcoming && (
                                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full
                                  text-[9px] font-black uppercase tracking-widest
                                  bg-white/20 backdrop-blur-sm text-white">
                                  Planowane
                                </span>
                              )}
                            </div>
                            <div className="flex flex-col flex-1 p-4 gap-2">
                              <p className={`text-xs font-black leading-snug transition-colors color-transition
                                ${p.upcoming
                                  ? "text-indigo-900 dark:text-indigo-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-200"
                                  : "text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-100"
                                }`}>
                                {p.title}
                              </p>
                              {p.dates?.length > 0 && (
                                <div className="flex items-center gap-1.5 mt-auto pt-1">
                                  <CalendarDaysIcon className={`h-3.5 w-3.5 shrink-0 ${p.upcoming ? "text-indigo-400 dark:text-indigo-500" : "text-slate-400 dark:text-slate-500"}`} />
                                  <span className={`text-[10px] font-bold color-transition ${p.upcoming ? "text-indigo-500 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500"}`}>
                                    {p.dates.join(" · ")}
                                  </span>
                                </div>
                              )}
                            </div>
                          </a>
                        ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-between mt-5">
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setProcDir(-1); setProcPage(p => p - 1); }}
                      disabled={procPage === 0}
                      className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer
                        bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400
                        hover:bg-slate-200 dark:hover:bg-slate-700
                        disabled:opacity-30 disabled:cursor-not-allowed transition-all color-transition">
                      <ArrowLeftIcon className="h-4 w-4" />
                    </button>
                    <button onClick={() => { setProcDir(1); setProcPage(p => p + 1); }}
                      disabled={procPage >= totalProcPages - 1}
                      className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer
                        bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400
                        hover:bg-slate-200 dark:hover:bg-slate-700
                        disabled:opacity-30 disabled:cursor-not-allowed transition-all color-transition">
                      <ArrowRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      {Array.from({ length: totalProcPages }).map((_, i) => (
                        <button key={i}
                          onClick={() => { setProcDir(i > procPage ? 1 : -1); setProcPage(i); }}
                          className={`rounded-full transition-all cursor-pointer color-transition
                            ${i === procPage
                              ? `w-4 h-1.5 ${colorClass.replace("text-", "bg-")}`
                              : "w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700"
                            }`} />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">
                      {procPage + 1} / {totalProcPages}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* ── 5. KOMPETENCJE | OPIS + INFO ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <motion.div variants={sectionVariants}
            className="rounded-3xl border border-slate-200/70 dark:border-slate-800/60
              bg-white dark:bg-slate-900 p-7 md:p-8 color-transition">
            <p className="text-[10px] font-black uppercase tracking-widest mb-5
              text-slate-400 dark:text-slate-500 color-transition">
              Główne zadania i kompetencje
            </p>
            <motion.ul variants={containerVariants} initial="hidden" animate="show" className="space-y-3">
              {data.responsibilities.map((item, i) => (
                <motion.li key={i} variants={itemVariants} className="flex items-start gap-3">
                  <CheckCircleIcon className={`h-5 w-5 shrink-0 mt-0.5 opacity-80 ${colorClass}`} />
                  <span className="leading-snug text-slate-700 dark:text-slate-300 color-transition">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <div className="flex flex-col gap-5">
            <motion.div variants={sectionVariants}
              className="rounded-3xl border border-slate-200/70 dark:border-slate-800/60
                bg-white dark:bg-slate-900 p-7 md:p-8 color-transition">
              <p className="text-[10px] font-black uppercase tracking-widest mb-4
                text-slate-400 dark:text-slate-500 color-transition">
                O Sejmie
              </p>
              <p className="leading-relaxed text-slate-700 dark:text-slate-300 color-transition">
                {data.description}
              </p>
            </motion.div>

            <motion.div variants={sectionVariants}
              className="rounded-3xl border border-slate-200/70 dark:border-slate-800/60
                bg-white dark:bg-slate-900 p-7 md:p-8 color-transition">
              <p className="text-[10px] font-black uppercase tracking-widest mb-4
                text-slate-400 dark:text-slate-500 color-transition">
                Informacje
              </p>
              <div className="space-y-3">
                {data.infoFields.map(([label, value], i, arr) => (
                  <div key={i}>
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-xs font-bold shrink-0 text-slate-400 dark:text-slate-500 color-transition">{label}</span>
                      <span className="text-xs font-black text-right text-slate-700 dark:text-slate-200 color-transition">{value}</span>
                    </div>
                    {i < arr.length - 1 && <div className="mt-3 h-px bg-slate-100 dark:bg-slate-800 color-transition" />}
                  </div>
                ))}
                <div className="h-px bg-slate-100 dark:bg-slate-800 color-transition" />
                <a href={data.website} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 group cursor-pointer">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 color-transition">Strona WWW</span>
                  <span className="inline-flex items-center gap-1 text-xs font-black
                    text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-100
                    transition-colors color-transition">
                    sejm.gov.pl
                    <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
