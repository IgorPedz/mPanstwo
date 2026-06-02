import { useMemo } from "react";

/* ── Porządek polityczny (lewica → prawica) ─────────────────────────────── */
const SPECTRUM = [
  "Razem",
  "Lewica",
  "KO",
  "Polska2050",
  "PSL-TD",
  "Centrum",
  "Demokracja",
  "niez.",
  "Konfederacja_KP",
  "Konfederacja",
  "PiS",
];

const COALITION = new Set(["KO", "PSL-TD", "Lewica", "Polska2050", "Centrum"]);
// 4 posłów niezrzeszonych należy do koalicji rządzącej
const COALITION_NIEZ = 4;

export const CLUB_HEX = {
  Razem: "#e11d48",
  Lewica: "#ef4444",
  KO: "#3b82f6",
  Polska2050: "#f1e31f",
  "PSL-TD": "#22c55e",
  Centrum: "#a855f7",
  Demokracja: "#f59e0b",
  "niez.": "#94a3b8",
  Konfederacja_KP: "#78716c",
  Konfederacja: "#64748b",
  PiS: "#4338ca",
};

/* ── Geometria hemicyklu ─────────────────────────────────────────────────── */
const N_ROWS = 8;
const R_INNER = 28;
const R_OUTER = 92;
const CX = 100;
const CY = 104;

function buildLayout() {
  const radii = Array.from(
    { length: N_ROWS },
    (_, i) => R_INNER + ((R_OUTER - R_INNER) * i) / (N_ROWS - 1),
  );
  const arcs = radii.map((r) => Math.PI * r);
  const total = arcs.reduce((s, a) => s + a, 0);
  let perRow = arcs.map((a) => Math.round((460 * a) / total));
  const diff = 460 - perRow.reduce((s, n) => s + n, 0);
  perRow[N_ROWS - 1] += diff;
  return { radii, perRow };
}

const { radii: RADII, perRow: PER_ROW } = buildLayout();

/* ── Komponent ───────────────────────────────────────────────────────────── */
export default function Hemicycle({ clubs }) {
  const seats = useMemo(() => {
    if (!clubs?.length) return [];

    const sorted = [...clubs]
      .filter((c) => (c.membersCount ?? 0) > 0)
      .sort((a, b) => {
        const ai = SPECTRUM.indexOf(a.id);
        const bi = SPECTRUM.indexOf(b.id);
        return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
      });

    const totalMembers = sorted.reduce((s, c) => s + c.membersCount, 0);
    const ranges = [];
    let accumulated = 0;
    for (const club of sorted) {
      const frac = club.membersCount / totalMembers;
      ranges.push({
        id: club.id,
        color: CLUB_HEX[club.id] ?? "#94a3b8",
        startFrac: accumulated,
        endFrac: accumulated + frac,
      });
      accumulated += frac;
    }

    const result = [];
    for (let row = 0; row < N_ROWS; row++) {
      const n = PER_ROW[row];
      const r = RADII[row];
      for (let local = 0; local < n; local++) {
        // angFrac dla pozycji SVG — sięga dokładnie do krawędzi łuku
        const angFrac  = n === 1 ? 0.5 : local / (n - 1);
        // clubFrac dla przypisania klubu — offset ½ unika trafiania na granicę startFrac=0
        // (dzięki temu małe Razem ~0.87% pojawia się tylko w dużych zewnętrznych rzędach)
        const clubFrac = n === 1 ? 0.5 : (local + 0.5) / n;
        const theta = Math.PI * (1 - angFrac);
        const x = CX + r * Math.cos(theta);
        const y = CY - r * Math.sin(theta);

        const range =
          ranges.find(
            (rg) => clubFrac >= rg.startFrac && clubFrac < rg.endFrac,
          ) ?? ranges[ranges.length - 1];

        result.push({
          x,
          y,
          color: range.color,
          clubId: range.id,
          coalition: COALITION.has(range.id),
        });
      }
    }
    return result;
  }, [clubs]);

  /* Posortowana legenda */
  const legend = useMemo(() => {
    const sorted = [...(clubs ?? [])]
      .sort((a, b) => (b.membersCount ?? 0) - (a.membersCount ?? 0))
      .map((c) => ({
        id: c.id,
        name: c.name,
        count: c.membersCount ?? 0,
        color: CLUB_HEX[c.id] ?? "#94a3b8",
        coalition: COALITION.has(c.id),
      }));

    const coalitionTotal =
      sorted.filter((c) => c.coalition).reduce((s, c) => s + c.count, 0) +
      COALITION_NIEZ;
    const oppositionTotal =
      sorted.reduce((s, c) => s + c.count, 0) - coalitionTotal;

    return {
      coalition: sorted.filter((c) => c.coalition),
      opposition: sorted.filter((c) => !c.coalition),
      coalitionTotal,
      oppositionTotal,
    };
  }, [clubs]);

  if (!seats.length) {
    return (
      <div className="w-full aspect-[2/1] rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse color-transition" />
    );
  }

  return (
    <div className="w-full">
      <svg viewBox="0 -2 200 110" className="w-full" style={{ maxHeight: 280 }}>
        {seats.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={1.75}
            fill={s.color}
            opacity={s.coalition ? 0.95 : 0.32}
          />
        ))}
      </svg>

      <div className="mt-4 flex flex-col gap-2.5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-500 shrink-0">
            Koalicja
          </span>
          <span className="text-[9px] font-black text-emerald-700 dark:text-emerald-400 shrink-0 -ml-2">
            {legend.coalitionTotal - COALITION_NIEZ}
            <span className="font-bold opacity-70">
              {" "}
              (+{COALITION_NIEZ} wsparcia)
            </span>
          </span>
          {legend.coalition.map((c) => (
            <div key={c.id} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: c.color }}
              />
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 color-transition">
                {c.id}
              </span>
              <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 color-transition">
                {c.count}
              </span>
            </div>
          ))}
          {/* 4 niezrzeszonych jako wsparcie koalicji */}
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0 border border-dashed border-slate-400"
              style={{ background: CLUB_HEX["niez."] }}
            />
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 color-transition italic">
              niezależni
            </span>
            <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 color-transition">
              {COALITION_NIEZ}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 shrink-0">
            Opozycja
          </span>
          <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 shrink-0 -ml-2">
            {legend.oppositionTotal}
          </span>
          {legend.opposition.map((c) => (
            <div key={c.id} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0 opacity-50"
                style={{ background: c.color }}
              />
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">
                {c.id}
              </span>
              <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 color-transition">
                {c.id === "niez." ? c.count - COALITION_NIEZ : c.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
