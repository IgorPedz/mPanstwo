import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "./ThemeToggle";
import ChangeFonts from "./ChangeFonts";

export default function Settings({ size = "md" }) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const buttonRef = useRef();
  const panelRef = useRef();

  const isSmall = size === "sm";

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();

      setCoords({
        bottom: window.innerHeight - rect.top + 12,
        left: rect.left,
      });
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target) &&
        panelRef.current &&
        !panelRef.current.contains(e.target)
      ) {
        closeMenu();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      window.addEventListener("scroll", closeMenu);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", closeMenu);
    };
  }, [open, closeMenu]);

  return (
    <div className="relative inline-block w-full color-transition">
      <button
        ref={buttonRef}
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        className={`
          group cursor-pointer w-full flex items-center gap-3
          ${isSmall ? "px-3 py-2" : "px-4 py-3"}

          text-slate-600 dark:text-slate-400
 dark:hover:text-white
          hover:bg-blue-50 dark:hover:bg-blue-900/50

          rounded-lg transition-all duration-200 color-transition
        `}
      >
        <div className="absolute left-0 top-0 h-full w-[3px] bg-blue-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-200" />
        <Cog6ToothIcon
          className={`
    ${isSmall ? "h-4 w-4" : "h-5 w-5"}

    text-slate-600 dark:text-slate-400
    transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
    transform-gpu

    ${open ? "rotate-90 text-indigo-500" : "group-hover:rotate-45"}
    group-hover:translate-x-1
  `}
        />

        <span className="text-xs font-bold uppercase tracking-[0.15em] color-transition">
          Ustawienia
        </span>
      </button>

      {/* PANEL */}
      {open &&
        createPortal(
          <AnimatePresence>
            <motion.div
              ref={panelRef}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{
                duration: 0.25,
                ease: [0.23, 1, 0.32, 1],
              }}
              style={{
                position: "fixed",
                bottom: `${coords.bottom}px`,
                left: `${coords.left}px`,
              }}
              className="
                w-80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md
                border border-slate-200 dark:border-slate-800/60
                rounded-xl shadow-2xl z-[9999] overflow-hidden
                color-transition
              "
            >
              {/* HEADER */}
              <div className="px-5 py-4 bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-100 dark:border-slate-800/50 color-transition">
                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-indigo-500 mb-1 color-transition">
                  Personalizacja /
                </p>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white color-transition">
                  Ustawienia Systemu
                </h3>
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-5 color-transition">
                {/* THEME */}
                <div className="flex items-center justify-between group color-transition">
                  <div className="flex flex-col pr-4 color-transition">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 color-transition">
                      Motyw wizualny
                    </span>
                    <span className="text-[11px] text-slate-500 color-transition">
                      Jasny / Ciemny tryb
                    </span>
                  </div>

                  <div className="shrink-0">
                    <ThemeToggle />
                  </div>
                </div>

                <div className="h-px bg-slate-100 dark:bg-slate-800/50 color-transition" />

                {/* FONTS */}
                <div className="flex items-center justify-between group color-transition">
                  <div className="flex flex-col pr-4 color-transition">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 color-transition">
                      Typografia
                    </span>
                    <span className="text-[11px] text-slate-500 color-transition">
                      Zmień krój pisma
                    </span>
                  </div>

                  <div className="shrink-0">
                    <ChangeFonts />
                  </div>
                </div>
              </div>

              {/* FOOTER */}
              <div className="px-5 py-2 bg-slate-50 dark:bg-slate-900/50 text-[10px] text-center text-slate-400 color-transition">
                Wersja v1.0.4
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
