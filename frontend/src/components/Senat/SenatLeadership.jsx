import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { sectionVariants } from "../../Utils/Animations";
import { SENAT_CLUB_HEX } from "./SenatHemicycle";

function SenatorPhoto({ name, photoUrl: directUrl, className, initialsClass }) {
  const [photoUrl, setPhotoUrl] = useState(directUrl ?? null);
  const [imgError, setImgError] = useState(false);
  const initials = (name ?? "").split(" ").filter(Boolean).map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  useEffect(() => { setPhotoUrl(directUrl ?? null); setImgError(false); }, [directUrl]);

  function fetchWikipedia() {
    if (!name) { setImgError(true); return; }
    const params = new URLSearchParams({ action: "query", titles: name, prop: "pageimages", format: "json", pithumbsize: "400", origin: "*" });
    fetch(`https://pl.wikipedia.org/w/api.php?${params}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const page = Object.values(data?.query?.pages ?? {})[0];
        if (page?.thumbnail?.source) setPhotoUrl(page.thumbnail.source);
        else setImgError(true);
      })
      .catch(() => setImgError(true));
  }

  return (
    <div className={`${className} bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden color-transition`}>
      {photoUrl && !imgError ? (
        <img src={photoUrl} alt={name}
          onError={() => { setPhotoUrl(null); setImgError(false); fetchWikipedia(); }}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 group-hover:brightness-105"
          style={{ objectPosition: "center 15%" }} />
      ) : (
        <span className={`font-black select-none ${initialsClass}`}>{initials}</span>
      )}
    </div>
  );
}

export default function SenatLeadership({ leadership, loading, leadershipLabel, colorClass, accentGradient }) {
  const [offset, setOffset] = useState(0);
  const [visible, setVisible] = useState(4);

  useEffect(() => {
    const update = () => setVisible(window.innerWidth >= 640 ? 4 : 2);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const cardPct = 100 / visible;
  const canPrev = offset > 0;
  const canNext = offset < leadership.length - visible;

  return (
    <motion.div
      variants={sectionVariants}
      className="w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
        bg-white dark:bg-slate-900 p-6 md:p-8 color-transition"
    >
      <p className="text-[10px] font-black uppercase tracking-widest mb-5 text-slate-400 dark:text-slate-500 color-transition">
        {leadershipLabel}
      </p>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse rounded-2xl aspect-[3/4] bg-slate-100 dark:bg-slate-800 color-transition" />
          ))}
        </div>
      ) : (
        <>
          <div className="overflow-hidden -mx-1.5">
            <motion.div className="flex"
              animate={{ x: `-${offset * cardPct}%` }}
              transition={{ duration: 0.35, ease: "easeInOut" }}>
              {leadership.map((person, i) => {
                const isMarszalek = person.role === "marszalek";
                return (
                  <div key={i} className="flex-none px-1.5" style={{ width: `${cardPct}%` }}>
                    <div className={`relative rounded-2xl overflow-hidden aspect-[3/4] w-full group
                      ${isMarszalek ? "ring-2 ring-slate-300 dark:ring-slate-600" : ""}`}>
                      <SenatorPhoto
                        name={person.name}
                        photoUrl={person.photoUrl ?? null}
                        className="absolute inset-0 w-full h-full transition-transform duration-300 sm:group-hover:scale-105"
                        initialsClass={`text-2xl ${colorClass}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                      {isMarszalek && (
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentGradient}`} />
                      )}
                      <div className="absolute top-2 left-2">
                        <span className="text-[8px] font-black px-1.5 py-0.5 rounded-md text-white"
                          style={{ background: SENAT_CLUB_HEX[person.club] ?? "#94a3b8" }}>
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
                <button onClick={() => setOffset((o) => Math.max(0, o - 1))} disabled={!canPrev}
                  className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer
                    bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400
                    hover:bg-slate-200 dark:hover:bg-slate-700
                    disabled:opacity-30 disabled:cursor-not-allowed transition-all color-transition">
                  <ArrowLeftIcon className="h-4 w-4" />
                </button>
                <button onClick={() => setOffset((o) => Math.min(leadership.length - visible, o + 1))} disabled={!canNext}
                  className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer
                    bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400
                    hover:bg-slate-200 dark:hover:bg-slate-700
                    disabled:opacity-30 disabled:cursor-not-allowed transition-all color-transition">
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">
                {offset + 1} – {Math.min(offset + visible, leadership.length)} / {leadership.length}
              </span>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
