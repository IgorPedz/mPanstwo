import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const FONT_SCALES = {
  "text-sm": 0.9,
  "text-base": 1,
  "text-lg": 1.15,
  "text-xl": 1.3,
};

export default function ChangeFonts() {
  const [fontSize, setFontSize] = useState("text-base");
  const { t } = useTranslation();

  useEffect(() => {
    const saved = localStorage.getItem("fontSize");
    if (saved && FONT_SCALES[saved]) {
      setFontSize(saved);
      document.documentElement.style.setProperty(
        "--font-scale",
        FONT_SCALES[saved]
      );
    }
  }, []);

  const handleChange = (value) => {
    setFontSize(value);
    document.documentElement.style.setProperty(
      "--font-scale",
      FONT_SCALES[value]
    );
    localStorage.setItem("fontSize", value);
  };

  return (
    <div className="flex items-center justify-between group color-transition w-full">
      <div className="flex flex-col pr-4 color-transition">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 color-transition">
          {t("settings.font")}
        </span>
        <span className="text-[11px] text-slate-500 color-transition">
          {t("settings.fontSize")}
        </span>
      </div>

      <div className="shrink-0 relative inline-block w-24 h-10">
        <select
          value={fontSize}
          onChange={(e) => handleChange(e.target.value)}
          className="
            w-full h-full pl-1 pr-7 cursor-pointer appearance-none text-center
            font-bold uppercase tracking-widest text-xs
            bg-gray-300 dark:bg-gray-700
            text-slate-800 dark:text-slate-200
            rounded-full shadow-lg
            focus:outline-none
            transition-all duration-300 color-transition
            hover:bg-gray-400 dark:hover:bg-gray-600
          "
          aria-label={t("settings.fontSize", "Rozmiar czcionki")}
        >
          <option value="text-sm" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans normal-case text-left">
            {t("settings.fontSmall")}
          </option>
          <option value="text-base" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans normal-case text-left">
            {t("settings.fontMedium")}
          </option>
          <option value="text-lg" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans normal-case text-left">
            {t("settings.fontLarge")}
          </option>
          <option value="text-xl" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans normal-case text-left">
            {t("settings.fontExtraLarge")}
          </option>
        </select>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs opacity-60 font-bold text-slate-800 dark:text-slate-200">
          ▾
        </div>
      </div>
    </div>
  );
}