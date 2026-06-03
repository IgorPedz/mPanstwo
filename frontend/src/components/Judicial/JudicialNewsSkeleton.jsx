export default function JudicialNewsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="
            animate-pulse rounded-2xl overflow-hidden
            border border-slate-100 dark:border-slate-800
          "
        >
          <div className="aspect-video bg-slate-100 dark:bg-slate-800" />

          <div className="p-4 space-y-2">
            <div className="h-3 rounded-full w-4/5 bg-slate-100 dark:bg-slate-800" />
            <div className="h-3 rounded-full w-3/5 bg-slate-100 dark:bg-slate-800" />
            <div className="h-2 rounded-full w-1/4 bg-slate-100 dark:bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
