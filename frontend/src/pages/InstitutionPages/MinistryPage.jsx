import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowLeftIcon,
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
import ministriesData from "../../data/ministriesData";

/* ─── Photo ─────────────────────────────────────────────────────────────── */
// `src` — direct URL (gov.pl photo from scraper); falls back to Wikipedia API
function PersonPhoto({ name, src, className, initialsClass }) {
  const [photoUrl, setPhotoUrl] = useState(src || null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // If we already have an official photo, skip Wikipedia lookup
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
export default function MinistryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation();

  const data          = ministriesData[slug];
  const title         = t(`dashboard.dashboardContent.${slug}.title`, { defaultValue: slug });
  const accent        = state?.accent     ?? data?.accent     ?? "blue";
  const iconKey       = state?.icon       ?? data?.icon       ?? "ministry";
  const IconComponent = ICON_MAP[iconKey] ?? ICON_MAP["ministry"];
  const colorClass    = COLOR_MAP[accent] ?? "text-blue-800";
  const accentGradient = ACCENT_MAP[accent] ?? "from-blue-800 to-blue-600";

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center color-transition">
        <p className="text-slate-400 dark:text-slate-500 color-transition">
          Nie znaleziono informacji o tej instytucji.
        </p>
      </div>
    );
  }

  const institutionType  = data.type          ?? "Ministerstwo";
  const leadershipLabel  = data.leadershipLabel ?? "Kierownictwo";
  const leaderLabel      = data.leaderLabel     ?? "Minister";

  const ministers     = data.leadership?.filter(p => p.role === "minister")           ?? [];
  const wiceministrzy = data.leadership?.filter(p => p.role === "wiceminister")       ?? [];
  const dyrektorzy    = data.leadership?.filter(p => p.role === "dyrektor_generalny") ?? [];
  const allPeople     = [...ministers, ...wiceministrzy, ...dyrektorzy];

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
            {IconComponent && <IconComponent className="h-72 w-72" />}
          </div>
          <div className="relative p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-6 min-w-0">
              <div className={`shrink-0 p-5 rounded-2xl
                bg-slate-50 dark:bg-slate-800/50
                border-2 border-slate-100 dark:border-slate-700/50
                color-transition ${colorClass}`}>
                {IconComponent && <IconComponent className="h-10 w-10" />}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest
                    rounded-md bg-slate-100 dark:bg-slate-800
                    text-slate-500 dark:text-slate-400 color-transition">
                    {institutionType}
                  </span>
                  <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest
                    rounded-md bg-slate-100 dark:bg-slate-800
                    text-slate-500 dark:text-slate-400 color-transition">
                    Władza wykonawcza
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black leading-tight
                  text-slate-900 dark:text-white color-transition">
                  {title}
                </h1>
              </div>
            </div>
            {data.website && (
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
            )}
          </div>
        </motion.div>

        {/* ── 2. KIEROWNICTWO — jedna linia ── */}
        <motion.div
          variants={sectionVariants}
          className="w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
            bg-white dark:bg-slate-900 p-6 md:p-8 color-transition"
        >
          <p className="text-[10px] font-black uppercase tracking-widest mb-5
            text-slate-400 dark:text-slate-500 color-transition">
            {leadershipLabel}
          </p>

          {/* Jedna linia: mobile ~3.5 kart, desktop 8 kart, reszta po scrollu */}
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth">
            {allPeople.map((person, i) => {
              const isMinister = person.role === "minister";
              const isDG       = person.role === "dyrektor_generalny";

              const Wrapper = person.profileUrl ? "a" : "div";
              const wrapperProps = person.profileUrl
                ? { href: person.profileUrl, target: "_blank", rel: "noopener noreferrer" }
                : {};

              const tabProps = Wrapper === "div" ? { tabIndex: 0 } : {};

              return (
                <Wrapper
                  key={i}
                  {...wrapperProps}
                  {...tabProps}
                  className={`
                    flex-none snap-start
                    w-[calc((100%-2.25rem)/4)]
                    ${allPeople.length <= 8
                      ? "sm:flex-1 sm:w-auto"
                      : "sm:w-[calc((100%-5.25rem)/8)]"
                    }
                    relative rounded-2xl overflow-hidden aspect-[3/4]
                    ${isMinister ? "ring-2 ring-slate-300 dark:ring-slate-600" : isDG ? "opacity-80" : ""}
                    ${person.profileUrl ? "cursor-pointer" : ""}
                    group focus:outline-none
                  `}
                >
                  {/* Zdjęcie */}
                  <PersonPhoto
                    name={person.name}
                    src={person.photo}
                    className="absolute inset-0 w-full h-full
                      transition-transform duration-300
                      sm:group-hover:scale-105 group-focus:scale-105"
                    initialsClass={`text-2xl ${isMinister ? colorClass : isDG ? "text-slate-400 dark:text-slate-500" : colorClass}`}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                  {/* Link icon — desktop hover / mobile focus */}
                  {person.profileUrl && (
                    <div className="absolute top-2 right-2
                      opacity-0 sm:group-hover:opacity-100 group-focus:opacity-100
                      transition-opacity">
                      <div className="w-6 h-6 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Accent bar ministra */}
                  {isMinister && (
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentGradient}`} />
                  )}

                  {/* Tekst — mobile: ukryty, pojawia się na focusie/tapie
                              desktop: zawsze widoczny                      */}
                  <div className={`
                    absolute bottom-0 left-0 right-0 p-3
                    transition-all duration-200
                    translate-y-2 opacity-0
                    sm:translate-y-0 sm:opacity-100
                    group-hover:translate-y-0 group-hover:opacity-100
                    group-focus:translate-y-0 group-focus:opacity-100
                  `}>
                    {isMinister && (
                      <span className={`text-[8px] font-black uppercase tracking-widest block mb-0.5 ${colorClass}`}>
                        {leaderLabel}
                      </span>
                    )}
                    {isDG && (
                      <span className="text-[8px] font-black uppercase tracking-widest block mb-0.5 text-slate-300">
                        Dyr. Generalny
                      </span>
                    )}
                    <p className="font-black text-xs leading-tight text-white">
                      {person.name}
                    </p>
                    <p className="text-[10px] font-medium mt-0.5 leading-tight text-white/60">
                      {person.title}
                    </p>
                  </div>
                </Wrapper>
              );
            })}

          </div>
        </motion.div>

        {/* ── 3. KOMPETENCJE (lewa) | OPIS + INFO (prawa) ── */}
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

            {/* Opis */}
            <motion.div
              variants={sectionVariants}
              className="rounded-3xl border border-slate-200/70 dark:border-slate-800/60
                bg-white dark:bg-slate-900 p-7 md:p-8 color-transition"
            >
              <p className="text-[10px] font-black uppercase tracking-widest mb-4
                text-slate-400 dark:text-slate-500 color-transition">
                O ministerstwie
              </p>
              <p className="leading-relaxed text-slate-700 dark:text-slate-300 color-transition">
                {data.description}
              </p>
            </motion.div>

            {/* Info */}
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
                {[
                  ["Nazwa instytucji", title],
                  ["Typ", institutionType],
                  ["Władza", "Wykonawcza"],
                  ["Podlega", "Radzie Ministrów"],
                ].map(([label, value], i, arr) => (
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
                {data.website && (
                  <>
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
                        gov.pl
                        <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                      </span>
                    </a>
                  </>
                )}
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}
