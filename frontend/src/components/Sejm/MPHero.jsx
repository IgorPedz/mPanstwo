import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { sectionVariants } from "../../Utils/Animations";
import { API_BASE } from "../../lib/apiConfig";
import { CLUB_HEX } from "./Hemicycle";
import MPInfoRow from "./MPInfoRow";
import MPRatingWidget from "./MPRatingWidget";
import { fmtDate, fmtNum } from "./mpProfileConstants";

function MPPhoto({ id, name }) {
  const [ok, setOk] = useState(true);
  const initials = (name ?? "").split(" ").filter(Boolean).map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-[3/4] color-transition">
      {ok ? (
        <img
          src={`${API_BASE}/sejm/mp/${id}/photo`}
          alt={name}
          onError={() => setOk(false)}
          className="w-full h-full object-cover object-top"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-4xl font-black text-slate-300 dark:text-slate-600 select-none">{initials}</span>
        </div>
      )}
    </div>
  );
}

export default function MPHero({ id, mp, mpLoading, sejmUrl, speechUrl }) {
  const name      = mp ? (`${mp.firstName ?? ""} ${mp.lastName ?? ""}`.trim() || mp.firstLastName || "") : "";
  const clubColor = CLUB_HEX[mp?.club] ?? "#94a3b8";

  return (
    <motion.div
      variants={sectionVariants}
      className="w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
        bg-white dark:bg-slate-900 overflow-hidden shadow-sm color-transition"
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-indigo-700 to-indigo-500" />

      {mpLoading ? (
        <div className="p-8 animate-pulse flex flex-col sm:flex-row gap-8">
          <div className="w-32 md:w-44 shrink-0 aspect-[3/4] rounded-2xl bg-slate-100 dark:bg-slate-800" />
          <div className="flex-1 space-y-3 pt-2">
            <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-1/4" />
            <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded-full w-2/3" />
            <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-1/2 mt-6" />
            <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-2/5" />
          </div>
        </div>
      ) : mp && (
        <div className="p-6 md:p-10 flex flex-col sm:flex-row gap-8">
          <div className="w-28 sm:w-36 md:w-44 shrink-0">
            <MPPhoto id={id} name={name} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[9px] font-black px-2 py-1 rounded-md text-white" style={{ background: clubColor }}>
                {mp.club}
              </span>
              <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest
                rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 color-transition">
                X kadencja
              </span>
              {mp.active === false && (
                <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-md
                  bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                  Nieaktywny
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white color-transition mb-5">{name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0">
              <div className="space-y-3">
                <MPInfoRow label="Klub / koło"    value={mp.club} />
                <MPInfoRow label="Okręg wyborczy" value={mp.districtName ? `${mp.districtNum}. ${mp.districtName}` : null} />
                <MPInfoRow label="Województwo"    value={mp.voivodeship} />
                <MPInfoRow label="Liczba głosów"  value={fmtNum(mp.numberOfVotes)} />
              </div>
              <div className="space-y-3 mt-3 md:mt-0">
                <MPInfoRow label="Data urodzenia"    value={fmtDate(mp.birthDate)} />
                <MPInfoRow label="Miejsce urodzenia" value={mp.birthLocation} />
                <MPInfoRow label="Wykształcenie"     value={mp.educationLevel} />
                <MPInfoRow label="Zawód"             value={mp.profession} last />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              {sejmUrl && (
                <a href={sejmUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold
                    bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300
                    hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors color-transition">
                  sejm.gov.pl <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                </a>
              )}
              {mp.email && (
                <a href={`mailto:${mp.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold
                    bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300
                    hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors color-transition">
                  {mp.email}
                </a>
              )}
            </div>

            <MPRatingWidget mpId={id} club={mp.club} />
          </div>
        </div>
      )}
    </motion.div>
  );
}
