import { UserIcon } from "@heroicons/react/24/outline";

export default function LeadershipCard({
  person,
  isLeader,
  isVacancy,
  colorClass,
  leaderLabel,
}) {
  const initials = (person.name ?? "")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`
        flex items-center gap-4 p-4 rounded-2xl border
        ${
          isLeader
            ? "border-l-4 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
            : "border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20"
        }
      `}
      style={isLeader ? { borderLeftColor: "currentColor" } : undefined}
    >
      <div
        className={`
          shrink-0 w-10 h-10 rounded-xl
          flex items-center justify-center
          text-xs font-black
          ${
            isVacancy
              ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
              : isLeader
                ? `bg-slate-100 dark:bg-slate-800 ${colorClass}`
                : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
          }
        `}
      >
        {isVacancy ? <UserIcon className="h-4 w-4" /> : initials}
      </div>

      <div className="min-w-0">
        {isLeader && (
          <span
            className={`
              block mb-0.5
              text-[9px] font-black uppercase tracking-widest
              ${colorClass}
            `}
          >
            {leaderLabel}
          </span>
        )}

        <p
          className={`
            text-sm font-black leading-tight truncate
            ${
              isVacancy
                ? "italic text-slate-400 dark:text-slate-500"
                : "text-slate-900 dark:text-white"
            }
          `}
        >
          {isVacancy ? "Wakat" : person.name}
        </p>

        <p
          className="
            mt-0.5
            text-[11px]
            leading-snug
            line-clamp-2
            text-slate-500 dark:text-slate-400
          "
        >
          {person.title}
        </p>
      </div>
    </div>
  );
}
