import { useState, useRef, useEffect } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "./ThemeToggle";
import ChangeFonts from "./ChangeFonts";

export default function Settings({ size = "md" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const isSmall = size === "sm";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full color-transition">
      <button
        onClick={() => setOpen((p) => !p)}
        className={`cursor-pointer w-full flex items-center gap-3
        ${isSmall ? "px-2 py-2" : "px-4 py-3"}
        text-slate-700 dark:text-slate-200
        hover:bg-slate-100 dark:hover:bg-slate-900
        border-l-2 border-transparent hover:border-indigo-500
        transition-all duration-200`}
      >
        <Cog6ToothIcon className={`${isSmall ? "h-4 w-4" : "h-5 w-5"}`} />

        <span className="text-xs font-black uppercase tracking-widest">
          Ustawienia
        </span>
      </button>

      {/* PANEL */}
      <div
        className={`absolute left-0 bottom-full mb-2 w-72
        bg-white dark:bg-slate-950
        border border-slate-200 dark:border-slate-800
        z-50 color-transition
        transition-all duration-200
        ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        {/* HEADER */}
        <div className="color-transition px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">
            System /
          </p>
          <h3 className="color-transition text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">
            Ustawienia
          </h3>
        </div>

        {/* CONTENT */}
        <div className="p-4 space-y-6">
          {/* THEME */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-4">
            <span className="color-transition text-sm font-medium text-slate-700 dark:text-slate-300">
              Motyw
            </span>
            <ThemeToggle />
          </div>

          {/* FONT */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-4">
            <span className="color-transition text-sm font-medium text-slate-700 dark:text-slate-300">
              Czcionka
            </span>
            <ChangeFonts />
          </div>
        </div>
      </div>
    </div>
  );
}
