export default function ContactHeader() {
  return (
    <div className="w-full space-y-3 color-transition">
      <p className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-500 color-transition">
        Strona /
      </p>
      <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none color-transition">
        Pomoc
      </h1>
      <div className="h-1 w-20 bg-indigo-500 mt-4 color-transition" /> {/* Akcent graficzny */}
      <p className="text-slate-500 dark:text-slate-400 max-w-2xl font-medium pt-4 text-lg color-transition">
        Odpowiedź na najczęściej zadawane pytania dotyczące korzystania z platformy mPanstwo. Znajdź szybkie rozwiązania i wskazówki, aby w pełni wykorzystać możliwości naszego serwisu. Jeśli nie znajdziesz odpowiedzi, skontaktuj się z nami bezpośrednio!
      </p>
    </div>
  );
}