/**
 * StatusFilter — na desktop: przyciski pill, na mobile: natywny select.
 *
 * Props:
 *   options  — [{ value, label }]
 *   value    — aktywna wartość
 *   onChange — (value) => void
 *   count    — opcjonalna liczba (np. "12 zgłoszeń")
 *   noun     — rzeczownik do liczny (np. "zgłoszeń")
 */
export default function StatusFilter({ options, value, onChange, count, noun }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">

      {/* Mobile: select */}
      <div className="relative sm:hidden">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none pl-4 pr-9 py-2.5 rounded-xl text-xs font-black uppercase tracking-wide
            bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800
            text-slate-700 dark:text-slate-200 shadow-sm cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-slate-400/30
            color-transition"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {/* Chevron */}
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5
            text-slate-400 dark:text-slate-500"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Desktop: przyciski */}
      <div className="hidden sm:flex gap-1 p-1 rounded-xl bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800 shadow-sm color-transition">
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wide
              transition-all duration-150 cursor-pointer
              ${value === o.value
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              } color-transition`}
          >
            {o.label}
          </button>
        ))}
      </div>

      {/* Licznik */}
      {count != null && noun && (
        <span className="ml-auto text-xs font-bold text-slate-400 dark:text-slate-500 color-transition">
          {count} {noun}
        </span>
      )}
    </div>
  );
}
