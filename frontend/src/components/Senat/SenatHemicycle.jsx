import { useMemo } from "react";

const SPECTRUM = [
  "Lewica", "KO", "PSL-TD", "Polska2050",
  "NPC", "niez.", "Konfederacja", "PiS",
];

const COALITION = new Set(["KO", "PSL-TD", "Lewica", "Polska2050"]);
const SUPPORT   = new Set(["NPC"]);

export const SENAT_CLUB_HEX = {
  Lewica:      "#ef4444",
  KO:          "#3b82f6",
  "PSL-TD":    "#22c55e",
  Polska2050:  "#f1e31f",
  NPC:         "#f97316",
  "niez.":     "#94a3b8",
  Konfederacja:"#64748b",
  PiS:         "#4338ca",
};

const N_ROWS         = 5;
const R_INNER        = 32;
const R_OUTER        = 90;
const CX             = 100;
const CY             = 100;
const TOTAL_SENATORS = 100;

function buildLayout() {
  const radii = Array.from({ length: N_ROWS }, (_, i) =>
    R_INNER + (R_OUTER - R_INNER) * i / (N_ROWS - 1)
  );
  const arcs  = radii.map(r => Math.PI * r);
  const total = arcs.reduce((s, a) => s + a, 0);
  let perRow  = arcs.map(a => Math.round(TOTAL_SENATORS * a / total));
  const diff  = TOTAL_SENATORS - perRow.reduce((s, n) => s + n, 0);
  perRow[N_ROWS - 1] += diff;
  return { radii, perRow };
}

const { radii: RADII, perRow: PER_ROW } = buildLayout();

function allocateRow(n, remaining) {
  const totalRemaining = remaining.reduce((s, r) => s + r, 0);
  if (totalRemaining === n) return [...remaining]; 
  const quotas = remaining.map(r => n * r / totalRemaining);
  const floors  = quotas.map(q => Math.floor(q));
  const deficit = n - floors.reduce((s, f) => s + f, 0);
  quotas
    .map((q, i) => ({ i, frac: q - Math.floor(q) }))
    .sort((a, b) => b.frac - a.frac)
    .slice(0, deficit)
    .forEach(({ i }) => floors[i]++);
  return floors;
}

export default function SenatHemicycle({ clubs }) {
  const seats = useMemo(() => {
    if (!clubs?.length) return [];

    const sorted = [...clubs]
      .filter(c => (c.membersCount ?? 0) > 0)
      .sort((a, b) => {
        const ai = SPECTRUM.indexOf(a.id);
        const bi = SPECTRUM.indexOf(b.id);
        return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
      });

    const remaining = sorted.map(c => c.membersCount);

    const result = [];
    for (let row = 0; row < N_ROWS; row++) {
      const n     = PER_ROW[row];
      const r     = RADII[row];
      const alloc = allocateRow(n, remaining);

      alloc.forEach((a, ci) => { remaining[ci] -= a; });

      let startPos = 0;
      for (let ci = 0; ci < sorted.length; ci++) {
        const nClub = alloc[ci];
        const club  = sorted[ci];
        const color = SENAT_CLUB_HEX[club.id] ?? "#94a3b8";
        const isCoalition = COALITION.has(club.id) || SUPPORT.has(club.id);

        for (let s = 0; s < nClub; s++) {
          const local   = startPos + s;
          const angFrac = n === 1 ? 0.5 : local / (n - 1);
          const theta   = Math.PI * (1 - angFrac);
          result.push({
            x:         CX + r * Math.cos(theta),
            y:         CY - r * Math.sin(theta),
            color,
            clubId:    club.id,
            coalition: isCoalition,
          });
        }
        startPos += nClub;
      }
    }
    return result;
  }, [clubs]);

  const legend = useMemo(() => {
    const sorted = [...(clubs ?? [])]
      .sort((a, b) => (b.membersCount ?? 0) - (a.membersCount ?? 0))
      .map(c => ({
        id:        c.id,
        count:     c.membersCount ?? 0,
        color:     SENAT_CLUB_HEX[c.id] ?? "#94a3b8",
        coalition: COALITION.has(c.id),
        support:   SUPPORT.has(c.id),
      }));

    const coalitionTotal  = sorted.filter(c => c.coalition).reduce((s, c) => s + c.count, 0);
    const supportTotal    = sorted.filter(c => c.support).reduce((s, c) => s + c.count, 0);
    const oppositionTotal = sorted.reduce((s, c) => s + c.count, 0) - coalitionTotal - supportTotal;

    return {
      coalition:      sorted.filter(c => c.coalition),
      support:        sorted.filter(c => c.support),
      opposition:     sorted.filter(c => !c.coalition && !c.support),
      coalitionTotal,
      supportTotal,
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
      <svg viewBox="0 -2 200 106" className="w-full" style={{ maxHeight: 260 }}>
        {seats.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={2.4} fill={s.color} opacity={s.coalition ? 0.95 : 0.32} />
        ))}
        <line x1={CX - R_OUTER - 4} y1={CY} x2={CX + R_OUTER + 4} y2={CY}
          stroke="currentColor" strokeWidth={0.5} className="text-slate-300 dark:text-slate-700" />
        <text x={CX} y={CY + 7} textAnchor="middle" fontSize={5}
          className="fill-slate-400 dark:fill-slate-500" fill="currentColor" opacity={0.7}>
          100 mandatów · XI kadencja
        </text>
      </svg>

      <div className="mt-4 flex flex-col gap-2.5">
        {/* Koalicja */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-500 shrink-0">
            Koalicja
          </span>
          <span className="text-[9px] font-black text-emerald-700 dark:text-emerald-400 shrink-0 -ml-2">
            {legend.coalitionTotal}
            {legend.supportTotal > 0 && (
              <span className="font-bold opacity-70"> (+{legend.supportTotal} wsparcia)</span>
            )}
          </span>
          {legend.coalition.map(c => (
            <div key={c.id} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c.color }} />
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 color-transition">{c.id}</span>
              <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 color-transition">{c.count}</span>
            </div>
          ))}
          {legend.support.map(c => (
            <div key={c.id} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full shrink-0 border border-dashed border-slate-400" style={{ background: c.color }} />
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 color-transition italic">Nowa Polska + Centrum</span>
              <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 color-transition">{c.count}</span>
            </div>
          ))}
        </div>

        {/* Opozycja */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 shrink-0">
            Opozycja
          </span>
          <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 shrink-0 -ml-2">
            {legend.oppositionTotal}
          </span>
          {legend.opposition.map(c => (
            <div key={c.id} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full shrink-0 opacity-50" style={{ background: c.color }} />
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">{c.id}</span>
              <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 color-transition">{c.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
