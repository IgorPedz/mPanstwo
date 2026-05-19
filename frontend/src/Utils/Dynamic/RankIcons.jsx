export const Icons = {
  rank1: (props) => (  // Jajo / Zarodek
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <ellipse cx="12" cy="12" rx="7" ry="9" />
    </svg>
  ),

  rank2: (props) => (  // Pęknięte jajo / Larwa
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <ellipse cx="12" cy="13" rx="6.5" ry="8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9 L10 6 M16 9 L14 6" />
    </svg>
  ),

  rank3: (props) => (  // Kiełek / Młoda roślina
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4 L12 12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 8 C8 6 10 4 12 6 C14 4 16 6 16 8" />
      <circle cx="12" cy="16" r="3" />
    </svg>
  ),

  rank4: (props) => (  // Młoda roślina / Zwierzak
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 10 Q12 4 17 10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10 L12 18" />
      <circle cx="9" cy="13" r="1.5" />
      <circle cx="15" cy="13" r="1.5" />
    </svg>
  ),

  rank5: (props) => (  // Rozwinięta forma
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4 L12 20" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 10 Q12 6 18 10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16 Q12 13 17 16" />
    </svg>
  ),

  rank6: (props) => (  // Drzewo / Wojownik
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4 L12 18" />
      <circle cx="12" cy="9" r="5" />
      <circle cx="12" cy="15" r="3.5" />
    </svg>
  ),

  rank7: (props) => (  // Potężne drzewo / Rycerz
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 L12 19" />
      <circle cx="12" cy="8" r="6" />
      <circle cx="12" cy="15" r="4" />
    </svg>
  ),

  rank8: (props) => (  // Kryształ / Legenda
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <polygon points="12,3 19,10 19,17 12,21 5,17 5,10" />
      <polygon points="12,7 16,11 12,15 8,11" />
    </svg>
  ),

  rank9: (props) => (  // Smok / Mityczna forma
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10 Q12 4 20 10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 14 L12 18 L16 14" />
      <circle cx="8" cy="11" r="1" />
      <circle cx="16" cy="11" r="1" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12 L12 20" />
    </svg>
  ),

  rank10: (props) => (  // Boska / Apex / Kosmiczna
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 L12 8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16 L12 21" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12 L8 12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 12 L21 12" />
    </svg>
  ),
};