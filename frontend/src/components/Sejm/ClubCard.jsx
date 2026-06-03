import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

import ClubLogo from "./ClubLogo";
import { CLUB_HEX } from "./Hemicycle";
import { sectionVariants } from "../../Utils/Animations";

export default function ClubCard({ club, staticData }) {
  const hex = CLUB_HEX[club.id] ?? "#94a3b8";

  const { description = "", parties = [] } = staticData ?? {};

  return (
    <motion.div
      variants={sectionVariants}
      className="rounded-3xl border border-slate-200/70 dark:border-slate-800/60 bg-white dark:bg-slate-900 overflow-hidden color-transition"
    >
      <div className="h-1.5 w-full" style={{ background: hex }} />

      <div className="p-6 md:p-7 flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <ClubLogo id={club.id} name={club.name} size="lg" />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-md text-white"
                style={{ background: hex }}
              >
                {club.id}
              </span>
            </div>

            <h3 className="font-black text-sm leading-snug text-slate-900 dark:text-white">
              {club.name}
            </h3>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-2xl font-black text-slate-900 dark:text-white">
              {club.membersCount}
            </p>

            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
              posłów
            </p>
          </div>
        </div>

        {description && (
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            {description}
          </p>
        )}

        {parties.length > 0 && (
          <div>
            <p className="mb-2 text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Partie składowe
            </p>

            <div className="flex flex-col gap-1.5">
              {parties.map((party) => (
                <div
                  key={party.name}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: party.color }}
                    />

                    <span className="truncate text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {party.name}
                    </span>
                  </div>

                  {party.website && party.website !== "#" && (
                    <a
                      href={party.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 shrink-0 text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    >
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
