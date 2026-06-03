import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const COLORS = {
  indigo: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20",
  emerald: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20",
  amber:  "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20",
  sky:    "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/20",
  rose:   "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20",
  purple: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20",
  slate:  "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800",
};

export default function MPActivityCard({ icon: Icon, label, href, onClick, accent = "slate", count }) {
  const El = href ? "a" : "button";
  const props = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { onClick, type: "button" };

  return (
    <El
      {...props}
      className="group relative flex flex-col items-center gap-2.5 p-4 rounded-2xl cursor-pointer
        border border-slate-200/70 dark:border-slate-800/60 bg-white dark:bg-slate-900
        hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all color-transition text-center"
    >
      {count != null && (
        <span className="absolute top-2 right-2 min-w-[18px] h-[18px] px-1 rounded-full text-[9px] font-black
          bg-indigo-600 text-white flex items-center justify-center">
          {count}
        </span>
      )}
      <div className={`p-3 rounded-xl ${COLORS[accent]} transition-transform group-hover:scale-110 duration-200`}>
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-[11px] font-black text-slate-700 dark:text-slate-200 leading-tight color-transition">{label}</span>
      {href && <ArrowTopRightOnSquareIcon className="h-3 w-3 text-slate-300 dark:text-slate-600 group-hover:text-slate-500 transition-colors" />}
    </El>
  );
}
