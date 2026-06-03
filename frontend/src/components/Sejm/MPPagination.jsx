import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function MPPagination({ page, total, perPage, onChange }) {
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) return null;

  const canPrev = page > 0;
  const canNext = page < pages - 1;

  const visible = new Set(
    [0, pages - 1, page - 2, page - 1, page, page + 1, page + 2].filter(
      (p) => p >= 0 && p < pages,
    ),
  );
  const sorted = [...visible].sort((a, b) => a - b);

  return (
    <div className="flex items-center justify-between mt-6">
      <button
        onClick={() => onChange(page - 1)}
        disabled={!canPrev}
        className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer
          bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400
          hover:bg-slate-200 dark:hover:bg-slate-700
          disabled:opacity-30 disabled:cursor-not-allowed transition-all color-transition"
      >
        <ArrowLeftIcon className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-1">
        {sorted.map((p, i) => (
          <>
            {i > 0 && sorted[i] - sorted[i - 1] > 1 && (
              <span key={`gap-${p}`} className="px-1 text-xs text-slate-400 dark:text-slate-600">…</span>
            )}
            <button
              key={p}
              onClick={() => onChange(p)}
              className={`min-w-[2rem] h-8 px-2 rounded-lg text-xs font-black transition-all
                ${p === page
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 color-transition"
                }`}
            >
              {p + 1}
            </button>
          </>
        ))}
      </div>

      <button
        onClick={() => onChange(page + 1)}
        disabled={!canNext}
        className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer
          bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400
          hover:bg-slate-200 dark:hover:bg-slate-700
          disabled:opacity-30 disabled:cursor-not-allowed transition-all color-transition"
      >
        <ArrowRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
