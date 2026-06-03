import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function BillPagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-8 pt-6
      border-t border-slate-200 dark:border-slate-800 color-transition">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 0}
          className="w-10 h-10 rounded-2xl flex items-center justify-center cursor-pointer
            bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800
            text-slate-500 dark:text-slate-400 shadow-sm
            hover:border-indigo-200 dark:hover:border-indigo-800
            disabled:opacity-30 disabled:cursor-not-allowed transition-all color-transition"
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </button>
        <button
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages - 1}
          className="w-10 h-10 rounded-2xl flex items-center justify-center cursor-pointer
            bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800
            text-slate-500 dark:text-slate-400 shadow-sm
            hover:border-indigo-200 dark:hover:border-indigo-800
            disabled:opacity-30 disabled:cursor-not-allowed transition-all color-transition"
        >
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
      <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 color-transition">
        {page + 1} / {totalPages}
      </span>
    </div>
  );
}
