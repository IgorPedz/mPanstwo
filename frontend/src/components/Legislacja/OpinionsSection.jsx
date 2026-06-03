import { useState } from "react";
import {
  ExclamationCircleIcon,
  PaperAirplaneIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { useOpinions } from "../../Hooks/useLegislacja";
import { useUser } from "../../Contexts/UserContext";
import { formatDate } from "./legislacjaConstants";

export default function OpinionsSection({ num }) {
  const { user } = useUser();
  const { opinions, loading, submitting, error, postOpinion } = useOpinions(num);
  const [text, setText] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const { success } = await postOpinion(text.trim());
    if (success) setText("");
  }

  return (
    <div className="space-y-6">
      {user?.id ? (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-50 dark:bg-slate-800/40 rounded-[1.5rem]
            border border-slate-200 dark:border-slate-800 p-6 space-y-4 color-transition"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 color-transition">
            Twoja opinia
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Napisz swoją opinię na temat tego projektu ustawy…"
            maxLength={2000}
            rows={4}
            className="w-full resize-none rounded-2xl px-4 py-3 text-sm
              bg-white dark:bg-slate-900
              border border-slate-200 dark:border-slate-700
              text-slate-900 dark:text-white
              placeholder-slate-400 dark:placeholder-slate-500
              focus:outline-none focus:border-indigo-300 dark:focus:border-indigo-700
              color-transition transition-colors"
          />
          {error && (
            <p className="text-xs font-bold text-red-500 flex items-center gap-1.5">
              <ExclamationCircleIcon className="h-3.5 w-3.5" />
              {error}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 color-transition">
              {text.length} / 2000
            </span>
            <button
              type="submit"
              disabled={submitting || !text.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl
                text-xs font-black uppercase tracking-widest
                bg-slate-900 dark:bg-white text-white dark:text-slate-900
                hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed
                transition-opacity cursor-pointer shadow-sm"
            >
              {submitting ? "Wysyłanie…" : "Dodaj opinię"}
              <PaperAirplaneIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-slate-50 dark:bg-slate-800/40 rounded-[1.5rem]
          border border-slate-200 dark:border-slate-800 p-6 color-transition">
          <p className="text-sm font-medium text-slate-400 dark:text-slate-500 color-transition">
            Zaloguj się, żeby dodać swoją opinię.
          </p>
        </div>
      )}

      {loading ? (
        <div className="space-y-3 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 rounded-[1.5rem] bg-slate-100 dark:bg-slate-800 color-transition" />
          ))}
        </div>
      ) : opinions.length === 0 ? (
        <p className="text-sm font-medium text-slate-400 dark:text-slate-500 color-transition">
          Nie ma jeszcze opinii. Bądź pierwszą osobą, która ją doda!
        </p>
      ) : (
        <div className="space-y-3">
          {opinions.map((op) => (
            <div
              key={op.id}
              className="bg-white dark:bg-slate-900 p-6 rounded-[1.5rem]
                border border-slate-200 dark:border-slate-800 shadow-sm color-transition"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-black text-slate-900 dark:text-white color-transition">
                  {op.author_name}
                </span>
                <div className="flex items-center gap-1.5">
                  <CalendarDaysIcon className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 color-transition">
                    {formatDate(op.created_at?.slice(0, 10))}
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 color-transition">
                {op.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
