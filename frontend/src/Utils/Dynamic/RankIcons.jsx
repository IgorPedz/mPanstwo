import React from "react";

const base = "w-5 h-5";

export const Icons = {
  // 1. Iskra / Pomysł: Pojedynczy, czysty element, z którego wszystko się zaczyna.
  user: (props) => (
    <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8l-2 2h4l-2 2" />
    </svg>
  ),

  // 2. Dialog / Połączenie: Dwa elementy wchodzące w interakcję, tworzące pierwszy link.
  users: (props) => (
    <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 11c1-1.5 2-2.5 3-2.5s2 1 3 2.5v4h-6v-4z" />
      <path d="M14 11c1 1.5 2 2.5 3 2.5s2-1 3-2.5v-4h-6v4z" />
    </svg>
  ),

  // 3. Zgromadzenie / Mała Grupa: Grupa połączonych elementów, tworząca strukturę.
  building: (props) => (
    <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 13h4v8h-4z" />
      <path d="M17 13h4v8h-4z" />
      <path d="M10 3h4v18h-4z" />
      <path d="M3 10l9-7 9 7" />
    </svg>
  ),

  // 4. Sieć / Połączenia: Struktura rozszerza się, tworząc skomplikowaną sieć.
  stats: (props) => (
    <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="10" width="4" height="4" />
      <rect x="17" y="10" width="4" height="4" />
      <rect x="10" y="3" width="4" height="4" />
      <rect x="10" y="17" width="4" height="4" />
      <line x1="7" y1="12" x2="10" y2="12" />
      <line x1="14" y1="12" x2="17" y2="12" />
      <line x1="12" y1="7" x2="12" y2="10" />
      <line x1="12" y1="14" x2="12" y2="17" />
    </svg>
  ),

  // 5. Ruch / Kierunek: Sieć nabiera tempa i kierunku, stając się ruchem społecznym.
  shield: (props) => (
    <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 12 20 22 12 22 12 12 20 12" />
      <polyline points="12 12 12 2 4 2 4 12 12 12" />
      <path d="M4 12c1.5 1 3 1.5 4.5 1.5s3-.5 4.5-1.5" />
      <path d="M20 12c-1.5-1-3-1.5-4.5-1.5s-3 .5-4.5 1.5" />
    </svg>
  ),

  // 6. Głos / Nagłośnienie: Ruch zyskuje potężny, spójny głos.
  scale: (props) => (
    <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 17l-3.5 1h-8L7 17l2-7.5L7 2l3.5 1h8L22 2z" />
      <line x1="12" y1="14" x2="12" y2="10" />
      <path d="M7 10h10" />
    </svg>
  ),

  // 7. Postulat / Plan: Głos przekształca się w konkretne, strukturalne postulaty lub plany.
  document: (props) => (
    <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M9 13h6" />
      <path d="M9 17h3" />
    </svg>
  ),

  // 8. Instytucja / Fundament: Plan staje się fundamentem nowej instytucji lub prawa.
  globe: (props) => (
    <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 21h18" />
      <path d="M4 21V10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11" />
      <path d="M10 8V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v3" />
      <rect x="7" y="11" width="3" height="4" />
      <rect x="14" y="11" width="3" height="4" />
    </svg>
  ),

  // 9. Porozumienie / Sukces: Instytucje i grupy osiągają porozumienie, reprezentowane przez splecioną siłę.
  trophy: (props) => (
    <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V22" />
      <path d="M14 14.66V22" />
      <path d="M18 8A6 6 0 0 1 6 8v3a6 6 0 0 0 12 0V8z" />
    </svg>
  ),

  // 10. Postęp / Trwały Efekt: Ostateczny postęp, trwały i rosnący, wyrastający z całej ewolucji.
  parliament: (props) => (
    <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 12 20 22 12 22 12 12 20 12" />
      <polyline points="12 12 12 2 4 2 4 12 12 12" />
      <path d="M16 17a4 4 0 0 0-8 0" />
      <path d="M12 2v4" />
    </svg>
  ),
};