import { useState, useRef, useEffect } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "../../Utils/ThemeToggle";
import ChangeFonts from "../../Utils/ChangeFonts";

export default function Settings() {
  const [openSettings, setOpenSettings] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenSettings(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left color-transition">

      <div
        className={`absolute left-0 bottom-full w-64
        transition-all duration-200 ease-out color-transition
        rounded-xl shadow-lg border
        bg-white dark:bg-gray-900
        border-gray-200 dark:border-gray-700
        p-4 z-50
        ${openSettings ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}
        `}
      >
        <div className="flex items-center gap-4 color-transition">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 color-transition">
            Motyw
          </div>
          <ThemeToggle />
        </div>

        <div className="flex items-center mt-3 color-transition">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 color-transition">
            Wielkość czcionki
          </div>
          <ChangeFonts />
        </div>
      </div>

      <button
        onClick={() => setOpenSettings(prev => !prev)}
        className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl
        text-gray-700 dark:text-gray-200
        hover:bg-gray-100 dark:hover:bg-gray-800
        transition-all duration-200 color-transition"
      >
        <Cog6ToothIcon className="h-5 w-5 color-transition" />
        <span className="text-sm font-medium color-transition">Ustawienia</span>
      </button>
    </div>
  );
}