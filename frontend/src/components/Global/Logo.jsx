export default function Logo() {
  return (
    <div className="relative h-16 flex items-center px-6 border-b border-slate-900/10 dark:border-white/10 color-transition overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-1 bg-blue-600 dark:bg-blue-500" />

      <div className="absolute inset-0 opacity-[0.03] bg-[size:12px_12px]" />

      <h1 className="relative text-lg font-black tracking-[0.2em] uppercase text-slate-900 dark:text-white">
        m<span className="text-blue-600 dark:text-blue-400">PAŃSTWO</span>
      </h1>
    </div>
  );
}
