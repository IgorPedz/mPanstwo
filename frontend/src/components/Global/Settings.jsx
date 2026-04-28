import { useState, useRef, useEffect } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "../../Utils/ThemeToggle";
import ChangeFonts from "../../Utils/ChangeFonts";

export default function Settings({ size = "md" }) {
  const [openSettings, setOpenSettings] = useState(false);
  const ref = useRef();

  const isSmall = size === "sm";

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
    <div
      ref={ref}
      className="
        w-full relative inline-block text-left
        color-transition
      "
    >

      <div
        className={`
          absolute left-0 bottom-full w-60
          shadow-lg border
          bg-white dark:bg-gray-900
          border-gray-200 dark:border-gray-700
          p-4 z-50
          rounded-xl

          transition-all duration-200 ease-out
          color-transition

          ${
            openSettings
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-2 pointer-events-none"
          }
        `}
      >

        <div className="flex items-center gap-4 color-transition">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 color-transition">
            Motyw
          </div>
          <div className="color-transition">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center mt-3 gap-2 color-transition">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 color-transition">
            Wielkość czcionki
          </div>
          <div className="color-transition">
            <ChangeFonts />
          </div>
        </div>
      </div>

      <button
        onClick={() => setOpenSettings((prev) => !prev)}
        className={`
          cursor-pointer flex items-center gap-3
          ${isSmall ? "px-2 py-2" : "px-4 py-4"} w-full

          text-gray-700 dark:text-gray-200
          hover:bg-gray-100 dark:hover:bg-gray-800

          transition-all duration-200
          color-transition
        `}
      >
        <Cog6ToothIcon className={`${isSmall ? "h-4 w-4" : "h-5 w-5"} color-transition`} />
          <span className="text-sm font-medium color-transition">
            Ustawienia
          </span>
      </button>
    </div>
  );
}