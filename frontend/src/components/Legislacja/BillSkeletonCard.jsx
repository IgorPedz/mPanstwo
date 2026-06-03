export default function BillSkeletonCard() {
  return (
    <div className="animate-pulse bg-white dark:bg-slate-900 p-6 rounded-[1.5rem]
      border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 h-44 color-transition">
      <div className="flex justify-between">
        <div className="h-4 w-20 rounded-md bg-slate-100 dark:bg-slate-800" />
        <div className="h-4 w-10 rounded bg-slate-100 dark:bg-slate-800" />
      </div>
      <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-800" />
      <div className="h-3 w-4/5 rounded bg-slate-100 dark:bg-slate-800" />
      <div className="h-3 w-3/5 rounded bg-slate-100 dark:bg-slate-800" />
      <div className="h-3 w-1/3 rounded bg-slate-100 dark:bg-slate-800 mt-3" />
    </div>
  );
}
