export default function ClubsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-64 rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse"
        />
      ))}
    </div>
  );
}