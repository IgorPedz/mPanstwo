import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { sectionVariants } from "../../Utils/Animations";
import { CLUB_HEX } from "./Hemicycle";

export default function MPFilters({ clubs, districts, club, district, search, onClub, onDistrict, onSearch, onReset, hasActiveFilters }) {
  const [distOpen, setDistOpen] = useState(false);

  useEffect(() => {
    if (!distOpen) return;
    const close = () => setDistOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [distOpen]);

  return (
    <motion.div
      variants={sectionVariants}
      className="w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
        bg-white dark:bg-slate-900 p-5 space-y-4 color-transition"
    >
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4
          text-slate-400 dark:text-slate-500 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Szukaj posła po nazwisku..."
          className="w-full pl-9 pr-9 py-2.5 rounded-xl text-sm font-medium
            bg-slate-50 dark:bg-slate-800/60
            border border-slate-200 dark:border-slate-700/60
            text-slate-900 dark:text-white
            placeholder:text-slate-400 dark:placeholder:text-slate-500
            focus:outline-none focus:ring-2 focus:ring-indigo-500/50 color-transition"
        />
        {search && (
          <button
            onClick={() => onSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400
              hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => onClub("all")}
          className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wide transition-all
            ${club === "all"
              ? "bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900"
              : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            } color-transition`}
        >
          Wszystkie
        </button>

        {clubs.map((c) => (
          <button
            key={c}
            onClick={() => onClub(club === c ? "all" : c)}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wide transition-all
              ${club === c ? "text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 color-transition"}`}
            style={club === c ? { background: CLUB_HEX[c] ?? "#64748b" } : {}}
          >
            {c}
          </button>
        ))}

        <div className="relative ml-auto" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setDistOpen((o) => !o)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wide
              bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400
              hover:bg-slate-200 dark:hover:bg-slate-700 transition-all color-transition"
          >
            {district === "all" ? "Okręg" : `Okr. ${district}`}
            <ChevronDownIcon className={`h-3 w-3 transition-transform ${distOpen ? "rotate-180" : ""}`} />
          </button>

          {distOpen && (
            <div className="absolute right-0 top-full mt-1 w-56 rounded-2xl overflow-hidden
              border border-slate-200 dark:border-slate-700
              bg-white dark:bg-slate-900 shadow-xl z-20 color-transition
              max-h-64 overflow-y-auto">
              <button
                onClick={() => { onDistrict("all"); setDistOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors
                  ${district === "all"
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  } color-transition`}
              >
                Wszystkie okręgi
              </button>
              {districts.map((d) => (
                <button
                  key={d.num}
                  onClick={() => { onDistrict(String(d.num)); setDistOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors
                    ${district === String(d.num)
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    } color-transition`}
                >
                  <span className="font-black text-slate-400 dark:text-slate-500 mr-2">{d.num}.</span>
                  {d.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wide
              text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <XMarkIcon className="h-3 w-3" />
            Resetuj
          </button>
        )}
      </div>
    </motion.div>
  );
}
