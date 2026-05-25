import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: "pl", name: "🇵🇱 PL" },
    { code: "en", name: "🇬🇧 EN" },
    { code: "de", name: "🇩🇪 DE" },
  ];

  const changeLanguage = (e) => {
    const code = e.target.value;
    i18n.changeLanguage(code);
    localStorage.setItem("language", code);
  };

  const currentLang = i18n.language?.split("-")[0] || "pl";

  return (
    <div className="flex items-center justify-between group color-transition">
      <div className="flex flex-col pr-4 color-transition">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 color-transition">
          {t("settings.language", "Język")}
        </span>
        <span className="text-[11px] text-slate-500 color-transition">
          {t("settings.langText", "Wybierz preferowany język")}
        </span>
      </div>

      <div className="shrink-0 relative inline-block w-24 h-10">
        <select
          value={currentLang}
          onChange={changeLanguage}
          className="
            w-full h-full pl-3 pr-7 cursor-pointer appearance-none text-center
            font-bold uppercase tracking-widest text-xs
            bg-gray-300 dark:bg-gray-700
            text-slate-800 dark:text-slate-200
            rounded-full shadow-lg
            focus:outline-none
            transition-all duration-300 color-transition
            hover:bg-gray-400 dark:hover:bg-gray-600
          "
          aria-label={t("settings.changeLanguage", "Zmień język")}
        >
          {languages.map((lang) => (
            <option
              key={lang.code}
              value={lang.code}
              className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans normal-case text-left"
            >
              {lang.name}
            </option>
          ))}
        </select>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs opacity-60 font-bold text-slate-800 dark:text-slate-200">
          ▾
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;