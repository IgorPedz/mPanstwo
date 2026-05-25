import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const ThemeToggle = () => {
  const { t } = useTranslation();
  
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      return savedMode === "true";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.remove("no-transition");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  return (
    <div className="flex items-center justify-between group color-transition w-full">
      {/* Tytuł i podtytuł (Label + Subtitle) wyciągnięte z pliku Settings */}
      <div className="flex flex-col pr-4 color-transition">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 color-transition">
          {t("settings.theme")}
        </span>
        <span className="text-[11px] text-slate-500 color-transition">
          {t("settings.lightMode")} / {t("settings.darkMode")}
        </span>
      </div>

      {/* Przełącznik po prawej stronie */}
      <div className="shrink-0">
        <button
          onClick={toggleDarkMode}
          className="
            cursor-pointer relative w-20 h-10 flex items-center
            bg-gray-300 dark:bg-gray-700
            rounded-full p-1 shadow-lg
            focus:outline-none
            color-transition
          "
          aria-label={t("settings.toggleDarkMode", "Toggle Dark Mode")}
        >
          <div
            className={`
              absolute top-1 left-1 w-8 h-8
              bg-white dark:bg-gray-200
              rounded-full shadow-md
              transform
              smooth-transform color-transition
              ${darkMode ? "translate-x-10" : "translate-x-0"}
            `}
          />

          <SunIcon
            className={`
              w-6 h-6 absolute left-2 top-1/2 -translate-y-1/2
              color-transition
              ${darkMode ? "opacity-0.3 scale-75" : "opacity-100 scale-100 text-yellow-400"}
              transition-all duration-300 ease-in-out
            `}
          />

          <MoonIcon
            className={`
              w-6 h-6 absolute right-2 top-1/2 -translate-y-1/2
              color-transition
              ${darkMode ? "opacity-100 scale-100 text-gray-900" : "opacity-0.3 scale-75"}
              transition-all duration-300 ease-in-out
            `}
          />
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;