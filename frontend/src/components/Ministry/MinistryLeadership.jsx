import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { sectionVariants } from "../../Utils/Animations";
import PersonPhoto from "./PersonPhoto";

const PARTY_HEX = {
  Razem: "#e11d48",
  Lewica: "#ef4444",
  KO: "#3b82f6",
  "Polska 2050": "#f1e31f",
  PSL: "#22c55e",
  Centrum: "#a855f7",
  Demokracja: "#f59e0b",
  Bezpartyjny: "#94a3b8",
  Konfederacja_KP: "#78716c",
  Konfederacja: "#64748b",
  PiS: "#4338ca",
};

export default function MinistryLeadership({ people, leadershipLabel, leaderLabel, colorClass, accentGradient }) {
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
  const canNext = offset < people.length - visible;

  return (
    <motion.div
      variants={sectionVariants}
      className="w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
        bg-white dark:bg-slate-900 p-6 md:p-8 color-transition"
    >
      <p className="text-[10px] font-black uppercase tracking-widest mb-5
        text-slate-400 dark:text-slate-500 color-transition">
        {leadershipLabel}
      </p>

      <div className="overflow-hidden -mx-1.5">
        <motion.div
          className="flex"
          animate={{ x: `-${offset * cardPct}%` }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {people.map((person, i) => {
            const isMinister = person.role === "minister";
            const isDG = person.role === "dyrektor_generalny";
            const Wrapper = person.profileUrl ? "a" : "div";
            const wrapperProps = person.profileUrl
              ? { href: person.profileUrl, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <div key={i} className="flex-none px-1.5" style={{ width: `${cardPct}%` }}>
                <Wrapper
                  {...wrapperProps}
                  tabIndex={Wrapper === "div" ? 0 : undefined}
                  className={`block relative rounded-2xl overflow-hidden aspect-[3/4] w-full
                    ${isMinister ? "ring-2 ring-slate-300 dark:ring-slate-600" : isDG ? "opacity-80" : ""}
                    ${person.profileUrl ? "cursor-pointer" : ""}
                    group focus:outline-none`}
                >
                  <PersonPhoto
                    name={person.name}
                    src={person.photo}
                    className="absolute inset-0 w-full h-full transition-transform duration-300 sm:group-hover:scale-105 group-focus:scale-105"
                    initialsClass={`text-2xl ${isMinister ? colorClass : isDG ? "text-slate-400 dark:text-slate-500" : colorClass}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  {person.party && (
                    <div className="absolute top-2 left-2">
                      <span
                        className="text-[8px] font-black px-1.5 py-0.5 rounded-md text-white"
                        style={{ background: PARTY_HEX[person.party] ?? "#94a3b8" }}
                      >
                        {person.party}
                      </span>
                    </div>
                  )}
                  {person.profileUrl && (
                    <div className="absolute top-2 right-2 opacity-0 sm:group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
                      <div className="w-6 h-6 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 text-white" />
                      </div>
                    </div>
                  )}
                  {isMinister && (
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentGradient}`} />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-3
                    transition-all duration-200 translate-y-2 opacity-0
                    sm:translate-y-0 sm:opacity-100
                    group-hover:translate-y-0 group-hover:opacity-100
                    group-focus:translate-y-0 group-focus:opacity-100">
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
                    <p className="font-black text-xs leading-tight text-white">{person.name}</p>
                    <p className="text-[10px] font-medium mt-0.5 leading-tight text-white/60">{person.title}</p>
                  </div>
                </Wrapper>
              </div>
            );
          })}
        </motion.div>
      </div>

      {people.length > visible && (
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOffset((o) => Math.max(0, o - 1))}
              disabled={!canPrev}
              className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer
                bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400
                hover:bg-slate-200 dark:hover:bg-slate-700
                disabled:opacity-30 disabled:cursor-not-allowed transition-all color-transition"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setOffset((o) => Math.min(people.length - visible, o + 1))}
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
            {offset + 1} – {Math.min(offset + visible, people.length)} / {people.length}
          </span>
        </div>
      )}
    </motion.div>
  );
}
