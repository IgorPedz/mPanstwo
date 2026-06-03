import { useState } from "react";
import { useMPRating } from "../../Hooks/useSejm";
import { useUser } from "../../Contexts/UserContext";

function StarIcon({ filled }) {
  return (
    <svg viewBox="0 0 20 20" className="w-5 h-5" fill="currentColor">
      <path
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1"
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      />
    </svg>
  );
}

export default function MPRatingWidget({ mpId, club }) {
  const { user } = useUser();
  const { avgRating, count, userRating, loading, submitting, rate } = useMPRating(mpId);
  const [hovered, setHovered] = useState(null);
  const display = hovered ?? userRating ?? 0;

  const renderStars = (value, interactive = false) =>
    [1, 2, 3, 4, 5].map((s) => (
      <button
        key={s}
        type="button"
        disabled={!interactive || !user || submitting}
        onClick={() => interactive && rate(s, club)}
        onMouseEnter={() => interactive && user && setHovered(s)}
        onMouseLeave={() => interactive && setHovered(null)}
        className={`transition-transform ${interactive && user ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
      >
        <span className={s <= (interactive ? display : value) ? "text-amber-400" : "text-slate-200 dark:text-slate-700"}>
          <StarIcon filled={s <= (interactive ? display : value)} />
        </span>
      </button>
    ));

  if (loading) {
    return <div className="h-8 w-40 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse color-transition" />;
  }

  return (
    <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 color-transition">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 color-transition">
        Ocena użytkowników
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-0.5">{renderStars(0, true)}</div>
        {count > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-slate-800 dark:text-white color-transition">
              {Number(avgRating).toFixed(1)}
            </span>
            <div className="flex items-center gap-0.5 pointer-events-none">
              {renderStars(Math.round(avgRating))}
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500 color-transition">
              ({count} {count === 1 ? "ocena" : count < 5 ? "oceny" : "ocen"})
            </span>
          </div>
        )}
        {count === 0 && !user && (
          <span className="text-xs text-slate-400 dark:text-slate-500 color-transition">
            Brak ocen — zaloguj się, aby ocenić
          </span>
        )}
        {count === 0 && user && !userRating && (
          <span className="text-xs text-slate-400 dark:text-slate-500 color-transition">
            Bądź pierwszy i oceń tego posła
          </span>
        )}
      </div>
      {user && userRating && (
        <p className="mt-1.5 text-[10px] text-indigo-500 dark:text-indigo-400 font-bold color-transition">
          Twoja ocena: {userRating}/5 — kliknij gwiazdkę aby zmienić
        </p>
      )}
      {!user && (
        <p className="mt-1.5 text-[10px] text-slate-400 dark:text-slate-500 color-transition">
          Zaloguj się, aby ocenić posła i zdobyć XP
        </p>
      )}
    </div>
  );
}
