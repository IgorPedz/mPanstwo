export default function InfoRow({ label, value, showDivider = true }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <span
          className="
            shrink-0
            text-xs font-bold
            text-slate-400 dark:text-slate-500
          "
        >
          {label}
        </span>

        <span
          className="
            text-right
            text-xs font-black
            text-slate-700 dark:text-slate-200
          "
        >
          {value}
        </span>
      </div>

      {showDivider && (
        <div className="mt-3 h-px bg-slate-100 dark:bg-slate-800" />
      )}
    </>
  );
}
