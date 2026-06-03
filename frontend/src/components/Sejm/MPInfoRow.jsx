export default function MPInfoRow({ label, value, last }) {
  if (!value) return null;
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <span className="text-xs font-bold shrink-0 text-slate-400 dark:text-slate-500 color-transition">{label}</span>
        <span className="text-xs font-black text-right text-slate-700 dark:text-slate-200 color-transition leading-relaxed">{value}</span>
      </div>
      {!last && <div className="mt-3 h-px bg-slate-100 dark:bg-slate-800 color-transition" />}
    </div>
  );
}
