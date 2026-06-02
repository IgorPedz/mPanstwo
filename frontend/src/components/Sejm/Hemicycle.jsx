import { useMemo } from "react";

/* ── Porządek polityczny (lewica → prawica) ─────────────────────────────── */
const SPECTRUM = [
  "Razem", "Lewica", "KO", "Polska2050", "PSL-TD",
  "Centrum", "Demokracja", "niez.", "Konfederacja_KP", "Konfederacja", "PiS",
];

export const CLUB_HEX = {
  Razem:          "#e11d48",
  Lewica:         "#ef4444",
  KO:             "#3b82f6",
  Polska2050:     "#38bdf8",
  "PSL-TD":       "#22c55e",
  Centrum:        "#a855f7",
  Demokracja:     "#f59e0b",
  "niez.":        "#94a3b8",
  Konfederacja_KP:"#78716c",
  Konfederacja:   "#64748b",
  PiS:            "#4338ca",
};

/* ── Geometria hemicyklu ─────────────────────────────────────────────────── */
const N_ROWS  = 8;
const R_INNER = 28;
const R_OUTER = 92;
const CX      = 100;
const CY      = 104;

function buildLayout() {
  const radii  = Array.from({ length: N_ROWS }, (_, i) =>
    R_INNER + (R_OUTER - R_INNER) * i / (N_ROWS - 1)
  );
  const arcs   = radii.map(r => Math.PI * r);
  const total  = arcs.reduce((s, a) => s + a, 0);
  let perRow   = arcs.map(a => Math.round(460 * a / total));
  const diff   = 460 - perRow.reduce((s, n) => s + n, 0);
  perRow[N_ROWS - 1] += diff;
  return { radii, perRow };
}

const { radii: RADII, perRow: PER_ROW } = buildLayout();

/* ── Komponent ───────────────────────────────────────────────────────────── */
export default function Hemicycle({ clubs }) {
  const seats = useMemo(() => {
    if (!clubs?.length) return [];

    // 1. Sortuj po spektrum politycznym
    const sorted = [...clubs]
      .filter(c => (c.membersCount ?? 0) > 0)
      .sort((a, b) => {
        const ai = SPECTRUM.indexOf(a.id);
        const bi = SPECTRUM.indexOf(b.id);
        return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
      });

    // 2. Oblicz zakresy KĄTOWE każdego klubu (ułamek 0–1 osi lewica→prawica)
    const totalMembers = sorted.reduce((s, c) => s + c.membersCount, 0);
    const ranges = [];
    let accumulated = 0;
    for (const club of sorted) {
      const frac = club.membersCount / totalMembers;
      ranges.push({
        id:       club.id,
        color:    CLUB_HEX[club.id] ?? "#94a3b8",
        startFrac: accumulated,
        endFrac:   accumulated + frac,
      });
      accumulated += frac;
    }

    // 3. Dla każdego fotela wyznacz kolor NA PODSTAWIE KĄTA (nie indeksu sekwencyjnego)
    //    Fotel o kącie fraction = 0 → skrajna lewa; fraction = 1 → skrajna prawa
    const result = [];
    for (let row = 0; row < N_ROWS; row++) {
      const n = PER_ROW[row];
      const r = RADII[row];
      for (let local = 0; local < n; local++) {
        const angFrac = n === 1 ? 0.5 : local / (n - 1); // 0=lewa, 1=prawa
        const theta   = Math.PI * (1 - angFrac);          // PI=lewa, 0=prawa
        const x       = CX + r * Math.cos(theta);
        const y       = CY - r * Math.sin(theta);

        // Znajdź klub dla tego kąta
        const range = ranges.find(rg => angFrac >= rg.startFrac && angFrac < rg.endFrac)
          ?? ranges[ranges.length - 1];

        result.push({ x, y, color: range.color, clubId: range.id });
      }
    }
    return result;
  }, [clubs]);

  /* Posortowana legenda (malejąco wg liczby mandatów) */
  const legend = useMemo(() =>
    [...(clubs ?? [])]
      .sort((a, b) => (b.membersCount ?? 0) - (a.membersCount ?? 0))
      .map(c => ({ id: c.id, name: c.name, count: c.membersCount ?? 0, color: CLUB_HEX[c.id] ?? "#94a3b8" })),
  [clubs]);

  if (!seats.length) {
    return (
      <div className="w-full aspect-[2/1] rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse color-transition" />
    );
  }

  return (
    <div className="w-full">
      {/* SVG hemicyklu */}
      <svg viewBox="0 -2 200 110" className="w-full" style={{ maxHeight: 280 }}>
        {seats.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={1.75} fill={s.color} opacity={0.92} />
        ))}
        {/* Oś pozioma */}
        <line x1={CX - R_OUTER - 4} y1={CY} x2={CX + R_OUTER + 4} y2={CY}
          stroke="currentColor" strokeWidth={0.5} className="text-slate-300 dark:text-slate-700" />
        {/* Etykieta */}
        <text x={CX} y={CY + 7} textAnchor="middle" fontSize={5}
          className="fill-slate-400 dark:fill-slate-500" fill="currentColor" opacity={0.7}>
          460 mandatów · X kadencja
        </text>
      </svg>

      {/* Legenda */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {legend.map(c => (
          <div key={c.id} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c.color }} />
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 color-transition">
              {c.id}
            </span>
            <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 color-transition">
              {c.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
