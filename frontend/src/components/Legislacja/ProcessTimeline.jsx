import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useLegislativeProcess } from "../../Hooks/useLegislacja";
import { formatDate } from "./legislacjaConstants";

export default function ProcessTimeline({ num }) {
  const { data, loading } = useLegislativeProcess(num);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="mt-1.5 w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 rounded bg-slate-100 dark:bg-slate-800 w-3/4" />
              <div className="h-2 rounded bg-slate-100 dark:bg-slate-800 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!data?.stages?.length) {
    return (
      <p className="text-sm font-medium text-slate-400 dark:text-slate-500 color-transition">
        Brak danych o etapach procesu legislacyjnego.
      </p>
    );
  }

  return (
    <div className="relative pl-6">
      <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700 rounded-full color-transition" />
      <div className="space-y-5">
        {data.stages.map((stage, i) => {
          const isLast = i === data.stages.length - 1;
          return (
            <div key={i} className="relative flex gap-4">
              <div
                className={`absolute -left-[19px] mt-1.5 w-3.5 h-3.5 rounded-full border-2 shrink-0
                  ${isLast
                    ? "bg-indigo-500 border-indigo-500"
                    : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                  } color-transition`}
              />
              <div className="min-w-0">
                <p className={`text-sm font-bold leading-snug color-transition
                  ${isLast ? "text-indigo-700 dark:text-indigo-300" : "text-slate-700 dark:text-slate-300"}`}>
                  {stage.stageName ?? stage.name ?? `Etap ${i + 1}`}
                </p>
                {stage.date && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <CalendarDaysIcon className="h-3 w-3 text-slate-400 dark:text-slate-500 shrink-0" />
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 color-transition">
                      {formatDate(stage.date)}
                    </p>
                  </div>
                )}
                {stage.decision && (
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 color-transition">
                    {stage.decision}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
