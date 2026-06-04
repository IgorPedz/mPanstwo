export const Icons = {

  // 1 — Obywatel: sylwetka człowieka
  rank1: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
    </svg>
  ),

  // 2 — Czytelnik: otwarta książka
  rank2: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 6C10 4.3 7 4 4 5v13c3-1 6-.5 8 1.5V6z" />
      <path d="M12 6c2-1.7 5-2 8-1v13c-3-1-6-.5-8 1.5V6z" />
    </svg>
  ),

  // 3 — Głos: dłoń w górze
  rank3: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 4v10" />
      <path d="M9 7V6a3 3 0 0 1 6 0v1" />
      <path d="M15 7V5" />
      <path d="M9 10v-.5a2 2 0 0 0-4 0V14a6 6 0 0 0 12 0v-4.5a2 2 0 0 0-4 0V10" />
    </svg>
  ),

  // 4 — Obrońca: tarcza
  rank4: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3L4 6.5v5.6c0 4.4 3.4 8.4 8 9.4 4.6-1 8-5 8-9.4V6.5L12 3z" />
    </svg>
  ),

  // 5 — Prawodawca: młotek sędziowski
  rank5: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 4l5 5-3 3-5-5 3-3z" />
      <path d="M3 21l8.5-8.5" />
      <path d="M3 17.5l3.5 3.5" />
      <path d="M10 9l2 2" />
    </svg>
  ),

  // 6 — Medal: krążek na wstążce
  rank6: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="15" r="5" />
      <path d="M8.5 4h7l-1.5 6h-4L8.5 4z" />
      <path d="M10 10c.7 1.2 1.3 2 2 2.5.7-.5 1.3-1.3 2-2.5" />
    </svg>
  ),

  // 7 — Sprawiedliwość: waga
  rank7: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 4v16" />
      <path d="M4 9h16" />
      <path d="M5 9L3 15a3.5 3.5 0 0 0 7 0L8 9" />
      <path d="M16 9l-2 6a3.5 3.5 0 0 0 7 0l-2-6" />
    </svg>
  ),

  // 8 — Pochodnia: płomień na słupku
  rank8: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 14v8M9.5 14h5" />
      <path d="M9 10c0-3 1.2-6 3-8 1.8 2 3 5 3 8H9z" />
      <path d="M10.5 6.5c.4-1 1-2 1.5-2.5" />
    </svg>
  ),

  // 9 — Korona
  rank9: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 17h18" />
      <path d="M3 17l2.5-9 4.5 5.5L12 5l2 8.5L18.5 8 21 17" />
      <circle cx="3"  cy="8"  r="1.2" />
      <circle cx="12" cy="5"  r="1.2" />
      <circle cx="21" cy="8"  r="1.2" />
    </svg>
  ),

  // 10 — Prezydent: gwiazda pięcioramienna
  rank10: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),

};
