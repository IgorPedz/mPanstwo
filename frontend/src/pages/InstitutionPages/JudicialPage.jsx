import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ArrowTopRightOnSquareIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useJudicialNews } from "../../Hooks/useJudicialNews";
import {
  pageVariants,
  sectionVariants,
  itemVariants,
  containerVariants,
} from "../../Utils/Animations";
import ICON_MAP       from "../../Utils/Maps/Icons";
import { ACCENT_MAP } from "../../Utils/Maps/Accents";
import { COLOR_MAP }  from "../../Utils/Maps/Colors";
import judicialData   from "../../data/judicialData";

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function JudicialPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const data = judicialData[slug];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center color-transition">
        <p className="text-slate-400 dark:text-slate-500">Nie znaleziono informacji o tej instytucji.</p>
      </div>
    );
  }

  const IconComponent  = ICON_MAP[data.icon] ?? ICON_MAP["scale"];
  const colorClass     = COLOR_MAP[data.accent]   ?? "text-indigo-800";
  const accentGradient = ACCENT_MAP[data.accent]  ?? "from-indigo-800 to-indigo-600";
  const allPeople      = data.leadership ?? [];

  const { data: news, loading: newsLoading } = useJudicialNews(slug);
  const ITEMS_PER_PAGE = 2;
  const [newsPage, setNewsPage] = useState(0);
  const [newsDir,  setNewsDir]  = useState(1);
  const totalNewsPages = Math.ceil(news.length / ITEMS_PER_PAGE);

  const slideVariants = {
    enter:  dir => ({ x: dir > 0 ?  60 : -60, opacity: 0 }),
    center: ()  => ({ x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }),
    exit:   dir => ({ x: dir > 0 ? -60 :  60, opacity: 0, transition: { duration: 0.2, ease: "easeIn"  } }),
  };

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
                    Władza {data.powerType}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black leading-tight text-slate-900 dark:text-white color-transition">
                  {data.type}
                </h1>
              </div>
            </div>
            {data.website && (
              <a href={data.website} target="_blank" rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                  text-xs font-black uppercase tracking-wide
                  bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300
                  hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700/50
                  transition-colors cursor-pointer color-transition">
                Strona oficjalna
                <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </motion.div>

        {/* ── 2. KIEROWNICTWO ── */}
        <motion.div variants={sectionVariants}
          className="w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
            bg-white dark:bg-slate-900 p-6 md:p-8 color-transition">
          <p className="text-[10px] font-black uppercase tracking-widest mb-5
            text-slate-400 dark:text-slate-500 color-transition">
            {data.leadershipLabel}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allPeople.map((person, i) => {
              const isPrezes = person.role === data.leaderRole;
              const isWakat  = person.name === "WAKAT";
              return (
                <div key={i}
                  className={`flex items-center gap-4 p-4 rounded-2xl border color-transition
                    ${isPrezes
                      ? `border-l-4 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700`
                      : "border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20"
                    }`}
                  style={isPrezes ? { borderLeftColor: "currentColor" } : {}}>
                  {/* Avatar inicjałów */}
                  <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                    text-xs font-black color-transition
                    ${isWakat
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                      : isPrezes
                        ? `bg-slate-100 dark:bg-slate-800 ${colorClass}`
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}>
                    {isWakat
                      ? <UserIcon className="h-4 w-4" />
                      : (person.name ?? "").split(" ").filter(Boolean).map(n => n[0]).join("").slice(0, 2).toUpperCase()
                    }
                  </div>
                  {/* Dane */}
                  <div className="min-w-0">
                    {isPrezes && (
                      <span className={`text-[9px] font-black uppercase tracking-widest block mb-0.5 ${colorClass}`}>
                        {data.leaderLabel}
                      </span>
                    )}
                    <p className={`text-sm font-black leading-tight truncate color-transition
                      ${isWakat ? "text-slate-400 dark:text-slate-500 italic" : "text-slate-900 dark:text-white"}`}>
                      {isWakat ? "Wakat" : person.name}
                    </p>
                    <p className="text-[11px] font-medium mt-0.5 leading-snug text-slate-500 dark:text-slate-400 color-transition line-clamp-2">
                      {person.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── 3. AKTUALNOŚCI ── */}
        {(newsLoading || news.length > 0) && (
          <motion.div variants={sectionVariants}
            className="w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
              bg-white dark:bg-slate-900 color-transition overflow-hidden">
            <div className="flex items-center justify-between px-7 md:px-8 pt-7 pb-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 color-transition">
                Aktualności
              </p>
              {data.website && (
                <a href={data.website} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest
                    text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200
                    transition-colors color-transition">
                  Wszystkie
                  <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                </a>
              )}
            </div>

            <div className="px-7 md:px-8 pb-7">
              {newsLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="animate-pulse rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 color-transition">
                      <div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 color-transition" />
                      <div className="p-4 space-y-2">
                        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-4/5 color-transition" />
                        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-3/5 color-transition" />
                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full w-1/4 color-transition" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="relative overflow-hidden">
                    <AnimatePresence mode="wait" custom={newsDir}>
                      <motion.div key={newsPage} custom={newsDir} variants={slideVariants}
                        initial="enter" animate="center" exit="exit"
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {news.slice(newsPage * ITEMS_PER_PAGE, (newsPage + 1) * ITEMS_PER_PAGE).map((item, i) => (
                          <a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
                            className="group flex flex-col rounded-2xl overflow-hidden cursor-pointer
                              border border-slate-200/70 dark:border-slate-700/50
                              bg-slate-50 dark:bg-slate-800/40
                              hover:border-slate-300 dark:hover:border-slate-600
                              hover:shadow-md transition-all color-transition">
                            <div className="w-full aspect-video overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 color-transition">
                              {item.image ? (
                                <img src={item.image} alt={item.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                              ) : (
                                <div className={`w-full h-full bg-gradient-to-br ${accentGradient} flex flex-col items-center justify-center gap-2 opacity-80`}>
                                  <IconComponent className="h-10 w-10 text-white/60" />
                                  <span className="text-[10px] font-black uppercase tracking-widest text-white/50 px-4 text-center line-clamp-2">
                                    {data.type}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col flex-1 p-4 gap-2">
                              <p className="text-xs font-black leading-snug line-clamp-2
                                text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-100
                                transition-colors color-transition">
                                {item.title}
                              </p>
                              {item.lead && (
                                <p className="text-[11px] leading-relaxed line-clamp-2 text-slate-500 dark:text-slate-400 color-transition">
                                  {item.lead}
                                </p>
                              )}
                              <div className="flex items-center justify-between mt-auto pt-1">
                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">{item.date}</span>
                                <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors color-transition" />
                              </div>
                            </div>
                          </a>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {totalNewsPages > 1 && (
                    <div className="flex items-center justify-between mt-5">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setNewsDir(-1); setNewsPage(p => p - 1); }} disabled={newsPage === 0}
                          className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer
                            bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400
                            hover:bg-slate-200 dark:hover:bg-slate-700
                            disabled:opacity-30 disabled:cursor-not-allowed transition-all color-transition">
                          <ArrowLeftIcon className="h-4 w-4" />
                        </button>
                        <button onClick={() => { setNewsDir(1); setNewsPage(p => p + 1); }} disabled={newsPage >= totalNewsPages - 1}
                          className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer
                            bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400
                            hover:bg-slate-200 dark:hover:bg-slate-700
                            disabled:opacity-30 disabled:cursor-not-allowed transition-all color-transition">
                          <ArrowRightIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                          {Array.from({ length: totalNewsPages }).map((_, i) => (
                            <button key={i} onClick={() => { setNewsDir(i > newsPage ? 1 : -1); setNewsPage(i); }}
                              className={`rounded-full transition-all cursor-pointer color-transition
                                ${i === newsPage ? `w-4 h-1.5 ${colorClass.replace("text-", "bg-")}` : "w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700"}`} />
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">
                          {newsPage + 1} / {totalNewsPages}
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* ── 4. KOMPETENCJE | OPIS + INFO ── */}
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
                O instytucji
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
                    {new URL(data.website).hostname.replace("www.", "")}
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
