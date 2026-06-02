import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import {
  pageVariants,
  sectionVariants,
  itemVariants,
  containerVariants,
} from "../../Utils/Animations";
import ICON_MAP from "../../Utils/Maps/Icons";
import { ACCENT_MAP } from "../../Utils/Maps/Accents";
import { COLOR_MAP } from "../../Utils/Maps/Colors";
import presidentData from "../../data/presidentData";
import { useMinistryNews } from "../../Hooks/useMinistryNews";

/* ─── Photo ─────────────────────────────────────────────────────────────── */
function PersonPhoto({ name, src, className, initialsClass }) {
  const [photoUrl, setPhotoUrl] = useState(src || null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (src) { setPhotoUrl(src); return; }
    if (!name) return;

    const controller = new AbortController();
    const params = new URLSearchParams({
      action: "query",
      titles: name,
      prop: "pageimages",
      format: "json",
      pithumbsize: "400",
      origin: "*",
    });
    fetch(`https://pl.wikipedia.org/w/api.php?${params}`, { signal: controller.signal })
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        const page = Object.values(data?.query?.pages ?? {})[0];
        if (page?.thumbnail?.source) setPhotoUrl(page.thumbnail.source);
      })
      .catch(() => {});
    return () => controller.abort();
  }, [name, src]);

  const initials = name.split(" ").filter(Boolean).map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className={`${className} bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden color-transition`}>
      {photoUrl && !imgError ? (
        <img
          src={photoUrl}
          alt={name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 15%" }}
        />
      ) : (
        <span className={`font-black select-none ${initialsClass}`}>{initials}</span>
      )}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function PresidentPage() {
  const navigate = useNavigate();

  const data           = presidentData;
  const accent         = data.accent;
  const iconKey        = data.icon;
  const IconComponent  = ICON_MAP[iconKey] ?? ICON_MAP["flag"];
  const colorClass     = COLOR_MAP[accent] ?? "text-red-700";
  const accentGradient = ACCENT_MAP[accent] ?? "from-red-700 to-red-500";

  const { news, loading: newsLoading } = useMinistryNews("president");

  const ITEMS_PER_PAGE = 2;
  const [newsPage, setNewsPage] = useState(0);
  const [newsDir, setNewsDir]   = useState(1);
  const totalNewsPages = Math.ceil(news.length / ITEMS_PER_PAGE);

  const goPrev = () => { setNewsDir(-1); setNewsPage(p => p - 1); };
  const goNext = () => { setNewsDir( 1); setNewsPage(p => p + 1); };

  const slideVariants = {
    enter:  dir => ({ x: dir > 0 ?  60 : -60, opacity: 0 }),
    center: ()  => ({ x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }),
    exit:   dir => ({ x: dir > 0 ? -60 :  60, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }),
  };

  const allPeople = data.leadership ?? [];

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
  const canNext = leaderOffset < allPeople.length - visible;

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen w-full px-4 md:px-8 py-10 md:py-14 color-transition"
    >
      <div className="w-full space-y-5 color-transition">

        {/* ── Wróć ── */}
        <motion.div variants={sectionVariants}>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-bold cursor-pointer group
              text-slate-400 dark:text-slate-500
              hover:text-slate-700 dark:hover:text-slate-200
              transition-colors color-transition"
          >
            <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Wróć
          </button>
        </motion.div>

        {/* ── 1. HERO ── */}
        <motion.div
          variants={sectionVariants}
          className="relative w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
            bg-white dark:bg-slate-900 shadow-sm overflow-hidden color-transition"
        >
          <div className={`h-1.5 w-full bg-gradient-to-r ${accentGradient}`} />
          <div className={`absolute -right-10 -bottom-10 pointer-events-none
            opacity-[0.04] dark:opacity-[0.07] color-transition ${colorClass}`}>
            <IconComponent className="h-72 w-72" />
          </div>
          <div className="relative p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-6 min-w-0">
              <div className={`shrink-0 p-5 rounded-2xl
                bg-slate-50 dark:bg-slate-800/50
                border-2 border-slate-100 dark:border-slate-700/50
                color-transition ${colorClass}`}>
                <IconComponent className="h-10 w-10" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest
                    rounded-md bg-slate-100 dark:bg-slate-800
                    text-slate-500 dark:text-slate-400 color-transition">
                    {data.type}
                  </span>
                  <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest
                    rounded-md bg-slate-100 dark:bg-slate-800
                    text-slate-500 dark:text-slate-400 color-transition">
                    Władza wykonawcza
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black leading-tight
                  text-slate-900 dark:text-white color-transition">
                  Prezydent Rzeczypospolitej Polskiej
                </h1>
              </div>
            </div>
            <a
              href={data.website}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                text-xs font-black uppercase tracking-wide
                bg-slate-100 dark:bg-slate-800
                text-slate-600 dark:text-slate-300
                hover:bg-slate-200 dark:hover:bg-slate-700
                border border-slate-200/70 dark:border-slate-700/50
                transition-colors cursor-pointer color-transition"
            >
              Strona oficjalna
              <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>

        {/* ── 2. PREZYDENT ── */}
        <motion.div
          variants={sectionVariants}
          className="w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
            bg-white dark:bg-slate-900 p-6 md:p-8 color-transition"
        >
          <p className="text-[10px] font-black uppercase tracking-widest mb-5
            text-slate-400 dark:text-slate-500 color-transition">
            {data.leadershipLabel}
          </p>

          <div className="overflow-hidden -mx-1.5">
            <motion.div
              className="flex"
              animate={{ x: `-${leaderOffset * cardPct}%` }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              {allPeople.map((person, i) => {
                const isPresident = person.role === "minister";
                const Wrapper = person.profileUrl ? "a" : "div";
                const wrapperProps = person.profileUrl
                  ? { href: person.profileUrl, target: "_blank", rel: "noopener noreferrer" }
                  : {};

                return (
                  <div key={i} className="flex-none px-1.5" style={{ width: `${cardPct}%` }}>
                    <Wrapper
                      {...wrapperProps}
                      className={`
                        block relative rounded-2xl overflow-hidden aspect-[3/4] w-full
                        ${isPresident ? "ring-2 ring-slate-300 dark:ring-slate-600" : ""}
                        ${person.profileUrl ? "cursor-pointer" : ""}
                        group focus:outline-none
                      `}
                    >
                      <PersonPhoto
                        name={person.name}
                        src={person.photo}
                        className="absolute inset-0 w-full h-full transition-transform duration-300
                          sm:group-hover:scale-105 group-focus:scale-105"
                        initialsClass={`text-2xl ${colorClass}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                      {person.profileUrl && (
                        <div className="absolute top-2 right-2 opacity-0 sm:group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
                          <div className="w-6 h-6 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 text-white" />
                          </div>
                        </div>
                      )}
                      {isPresident && (
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentGradient}`} />
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-3
                        transition-all duration-200 translate-y-2 opacity-0
                        sm:translate-y-0 sm:opacity-100
                        group-hover:translate-y-0 group-hover:opacity-100
                        group-focus:translate-y-0 group-focus:opacity-100">
                        {isPresident && (
                          <span className={`text-[8px] font-black uppercase tracking-widest block mb-0.5 ${colorClass}`}>
                            {data.leaderLabel}
                          </span>
                        )}
                        <p className="font-black text-xs leading-tight text-white">{person.name}</p>
                        <p className="text-[10px] font-medium mt-0.5 leading-tight text-white/60">{person.title}</p>
                      </div>
                    </Wrapper>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {allPeople.length > visible && (
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLeaderOffset(o => Math.max(0, o - 1))}
                  disabled={!canPrev}
                  className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer
                    bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400
                    hover:bg-slate-200 dark:hover:bg-slate-700
                    disabled:opacity-30 disabled:cursor-not-allowed transition-all color-transition"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setLeaderOffset(o => Math.min(allPeople.length - visible, o + 1))}
                  disabled={!canNext}
                  className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer
                    bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400
                    hover:bg-slate-200 dark:hover:bg-slate-700
                    disabled:opacity-30 disabled:cursor-not-allowed transition-all color-transition"
                >
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">
                {leaderOffset + 1} – {Math.min(leaderOffset + visible, allPeople.length)} / {allPeople.length}
              </span>
            </div>
          )}
        </motion.div>

        {/* ── 3. AKTUALNOŚCI ── */}
        <motion.div
          variants={sectionVariants}
          className="w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
            bg-white dark:bg-slate-900 color-transition overflow-hidden"
        >
          <div className="flex items-center justify-between px-7 md:px-8 pt-7 pb-5">
            <p className="text-[10px] font-black uppercase tracking-widest
              text-slate-400 dark:text-slate-500 color-transition">
              Aktualności
            </p>
            <a
              href={data.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest
                text-slate-400 dark:text-slate-500
                hover:text-slate-700 dark:hover:text-slate-200
                transition-colors color-transition"
            >
              Wszystkie
              <ArrowTopRightOnSquareIcon className="h-3 w-3" />
            </a>
          </div>

          <div className="px-7 md:px-8 pb-7">
            {newsLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="animate-pulse rounded-2xl overflow-hidden
                    border border-slate-100 dark:border-slate-800 color-transition">
                    <div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 color-transition" />
                    <div className="p-4 space-y-2">
                      <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-4/5 color-transition" />
                      <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-3/5 color-transition" />
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full w-1/4 color-transition" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!newsLoading && news.length === 0 && (
              <p className="text-sm text-slate-400 dark:text-slate-500 color-transition">
                Brak aktualności.
              </p>
            )}

            {!newsLoading && news.length > 0 && (
              <>
                <div className="relative overflow-hidden">
                  <AnimatePresence mode="wait" custom={newsDir}>
                    <motion.div
                      key={newsPage}
                      custom={newsDir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      {news
                        .slice(newsPage * ITEMS_PER_PAGE, (newsPage + 1) * ITEMS_PER_PAGE)
                        .map((item, i) => (
                          <a
                            key={i}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col rounded-2xl overflow-hidden cursor-pointer
                              border border-slate-200/70 dark:border-slate-700/50
                              bg-slate-50 dark:bg-slate-800/40
                              hover:border-slate-300 dark:hover:border-slate-600
                              hover:shadow-md transition-all color-transition"
                          >
                            <div className="w-full aspect-video overflow-hidden shrink-0
                              bg-slate-100 dark:bg-slate-800 color-transition">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover
                                    transition-transform duration-500 group-hover:scale-105"
                                />
                              ) : (
                                <div className={`w-full h-full bg-gradient-to-br ${accentGradient}
                                  flex flex-col items-center justify-center gap-2 opacity-80`}>
                                  <IconComponent className="h-10 w-10 text-white/60" />
                                  <span className="text-[10px] font-black uppercase tracking-widest
                                    text-white/50 px-4 text-center line-clamp-2">
                                    Prezydent RP
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col flex-1 p-4 gap-2">
                              <p className="text-xs font-black leading-snug line-clamp-2
                                text-slate-900 dark:text-white
                                group-hover:text-slate-700 dark:group-hover:text-slate-100
                                transition-colors color-transition">
                                {item.title}
                              </p>
                              {item.lead && (
                                <p className="text-[11px] leading-relaxed line-clamp-3
                                  text-slate-500 dark:text-slate-400 color-transition">
                                  {item.lead}
                                </p>
                              )}
                              <div className="flex items-center justify-between mt-auto pt-1">
                                <span className="text-[10px] font-bold
                                  text-slate-400 dark:text-slate-500 color-transition">
                                  {item.date}
                                </span>
                                <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5
                                  text-slate-300 dark:text-slate-600
                                  group-hover:text-slate-500 dark:group-hover:text-slate-400
                                  transition-colors color-transition" />
                              </div>
                            </div>
                          </a>
                        ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-between mt-5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={goPrev}
                      disabled={newsPage === 0}
                      className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer
                        bg-slate-100 dark:bg-slate-800
                        text-slate-500 dark:text-slate-400
                        hover:bg-slate-200 dark:hover:bg-slate-700
                        disabled:opacity-30 disabled:cursor-not-allowed
                        transition-all color-transition"
                    >
                      <ArrowLeftIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={goNext}
                      disabled={newsPage >= totalNewsPages - 1}
                      className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer
                        bg-slate-100 dark:bg-slate-800
                        text-slate-500 dark:text-slate-400
                        hover:bg-slate-200 dark:hover:bg-slate-700
                        disabled:opacity-30 disabled:cursor-not-allowed
                        transition-all color-transition"
                    >
                      <ArrowRightIcon className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      {Array.from({ length: totalNewsPages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => { setNewsDir(i > newsPage ? 1 : -1); setNewsPage(i); }}
                          className={`rounded-full transition-all cursor-pointer color-transition
                            ${i === newsPage
                              ? `w-4 h-1.5 ${colorClass.replace("text-", "bg-")}`
                              : "w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold
                      text-slate-400 dark:text-slate-500 color-transition">
                      {newsPage + 1} / {totalNewsPages}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* ── 4. KOMPETENCJE (lewa) | OPIS + INFO (prawa) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Kompetencje */}
          <motion.div
            variants={sectionVariants}
            className="rounded-3xl border border-slate-200/70 dark:border-slate-800/60
              bg-white dark:bg-slate-900 p-7 md:p-8 color-transition"
          >
            <p className="text-[10px] font-black uppercase tracking-widest mb-5
              text-slate-400 dark:text-slate-500 color-transition">
              Główne zadania i kompetencje
            </p>
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              {data.responsibilities.map((item, i) => (
                <motion.li key={i} variants={itemVariants} className="flex items-start gap-3">
                  <CheckCircleIcon className={`h-5 w-5 shrink-0 mt-0.5 opacity-80 ${colorClass}`} />
                  <span className="leading-snug text-slate-700 dark:text-slate-300 color-transition">
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Opis + Info */}
          <div className="flex flex-col gap-5">

            <motion.div
              variants={sectionVariants}
              className="rounded-3xl border border-slate-200/70 dark:border-slate-800/60
                bg-white dark:bg-slate-900 p-7 md:p-8 color-transition"
            >
              <p className="text-[10px] font-black uppercase tracking-widest mb-4
                text-slate-400 dark:text-slate-500 color-transition">
                O urzędzie
              </p>
              <p className="leading-relaxed text-slate-700 dark:text-slate-300 color-transition">
                {data.description}
              </p>
            </motion.div>

            <motion.div
              variants={sectionVariants}
              className="rounded-3xl border border-slate-200/70 dark:border-slate-800/60
                bg-white dark:bg-slate-900 p-7 md:p-8 color-transition"
            >
              <p className="text-[10px] font-black uppercase tracking-widest mb-4
                text-slate-400 dark:text-slate-500 color-transition">
                Informacje
              </p>
              <div className="space-y-3">
                {data.infoFields.map(([label, value], i, arr) => (
                  <div key={i}>
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-xs font-bold shrink-0
                        text-slate-400 dark:text-slate-500 color-transition">
                        {label}
                      </span>
                      <span className="text-xs font-black text-right
                        text-slate-700 dark:text-slate-200 color-transition">
                        {value}
                      </span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="mt-3 h-px bg-slate-100 dark:bg-slate-800 color-transition" />
                    )}
                  </div>
                ))}
                <div className="h-px bg-slate-100 dark:bg-slate-800 color-transition" />
                <a
                  href={data.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 group cursor-pointer"
                >
                  <span className="text-xs font-bold
                    text-slate-400 dark:text-slate-500 color-transition">
                    Strona WWW
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-black
                    text-slate-500 dark:text-slate-400
                    group-hover:text-slate-800 dark:group-hover:text-slate-100
                    transition-colors color-transition">
                    prezydent.pl
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
