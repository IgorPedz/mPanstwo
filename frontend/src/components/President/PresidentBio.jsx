import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { sectionVariants } from "../../Utils/Animations";
import PersonPhoto from "../Ministry/PersonPhoto";

export default function PresidentBio({
  person,
  biography,
  biographyLabel,
  colorClass,
  accentGradient,
}) {
  return (
    <motion.div
      variants={sectionVariants}
      className="w-full rounded-3xl border border-slate-200/70 dark:border-slate-800/60
        bg-white dark:bg-slate-900 p-6 md:p-8 color-transition"
    >
      <p className="text-[10px] font-black uppercase tracking-widest mb-5
        text-slate-400 dark:text-slate-500 color-transition">
        {biographyLabel}
      </p>

      <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
        {/* Photo */}
        <div className="shrink-0 sm:w-44 md:w-52">
          <Wrapper person={person} accentGradient={accentGradient} colorClass={colorClass} />
        </div>

        {/* Bio text */}
        <div className="flex flex-col justify-center gap-3 min-w-0">
          <div>
            <p className={`text-xs font-black uppercase tracking-widest mb-0.5 ${colorClass}`}>
              {person.title}
            </p>
            <h3 className="text-xl font-black text-slate-900 dark:text-white color-transition leading-tight">
              {person.name}
            </h3>
          </div>
          <div className="h-px bg-slate-100 dark:bg-slate-800 color-transition" />
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed color-transition">
            {biography}
          </p>
          {person.profileUrl && (
            <a
              href={person.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 w-fit text-xs font-black
                text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200
                transition-colors color-transition mt-1"
            >
              prezydent.pl
              <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Wrapper({ person, accentGradient, colorClass }) {
  return (
    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden group">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentGradient} z-10`} />
      <PersonPhoto
        name={person.name}
        src={person.photo}
        className="absolute inset-0 w-full h-full"
        initialsClass={`text-3xl ${colorClass}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    </div>
  );
}
