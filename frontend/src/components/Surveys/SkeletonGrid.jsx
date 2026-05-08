export default function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div 
          key={i} 
          className="color-transition h-[320px] rounded-[2.5rem] bg-slate-200 dark:bg-slate-800/50 animate-pulse border border-slate-200 dark:border-slate-800"
        />
      ))}
    </div>
  );
}