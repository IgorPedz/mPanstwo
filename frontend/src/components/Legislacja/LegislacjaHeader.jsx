export default function LegislacjaHeader({ total, loading }) {
  return (
    <header className="flex justify-between items-end pb-6 color-transition">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-500 color-transition">
          Główna /
        </p>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter color-transition">
          Legislacja
        </h1>
        <div className="h-1 w-20 bg-indigo-500 mb-5 mt-2 color-transition" />
        <p className="text-slate-400 font-medium color-transition">
          Projekty ustaw aktualnie procedowane w Sejmie RP — etapy, dokumenty i opinie obywateli.
        </p>
      </div>
      {total > 0 && !loading && (
        <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 color-transition hidden sm:block">
          {total} projektów
        </p>
      )}
    </header>
  );
}
