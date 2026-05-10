import { useState, useEffect } from "react";

const FONT_SCALES = {
  "text-sm": 0.9,
  "text-base": 1,
  "text-lg": 1.15,
  "text-xl": 1.3,
};

export default function ChangeFonts() {
  const [fontSize, setFontSize] = useState("text-base");

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
    <div className="flex items-center justify-between w-full">

      <select
        value={fontSize}
        onChange={(e) => handleChange(e.target.value)}
        className="color-transition cursor-pointer px-3 py-2 text-xs font-bold uppercase tracking-widest
                   bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700
                   text-slate-700 dark:text-slate-200"
      >
        <option value="text-sm">Mała</option>
        <option value="text-base">Średnia</option>
        <option value="text-lg">Duża</option>
        <option value="text-xl">Bardzo duża</option>
      </select>
    </div>
  );
}