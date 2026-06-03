import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { TYPE_BADGE, TYPE_LABELS, formatDate } from "./legislacjaConstants";

export default function BillDetailHeader({ num, loading, data, onNavigateBack }) {
  const badge = TYPE_BADGE[data?.type] ?? TYPE_BADGE.inny;

  return (
    <header className="pb-6 color-transition">
      <p className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-500 color-transition">
        Główna /{" "}
        <button
          onClick={onNavigateBack}
          className="hover:text-indigo-700 cursor-pointer transition-colors"
        >
          Legislacja
        </button>{" "}
        /
      </p>

      {loading ? (
        <div className="animate-pulse mt-2 space-y-2">
          <div className="h-10 w-2/3 rounded-xl bg-slate-100 dark:bg-slate-800" />
          <div className="h-1 w-20 bg-slate-100 dark:bg-slate-800 rounded-full" />
          <div className="h-5 w-1/3 rounded bg-slate-100 dark:bg-slate-800" />
        </div>
      ) : data ? (
        <>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter color-transition mt-2 leading-tight">
            Druk nr {num}
          </h1>
          <div className="h-1 w-20 bg-indigo-500 mb-4 mt-2 color-transition" />
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest color-transition ${badge}`}>
              {TYPE_LABELS[data.type] ?? "Inny"}
            </span>
            {data.deliveryDate && (
              <div className="flex items-center gap-1.5">
                <CalendarDaysIcon className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 color-transition">
                  {formatDate(data.deliveryDate)}
                </span>
              </div>
            )}
          </div>
        </>
      ) : null}
    </header>
  );
}
