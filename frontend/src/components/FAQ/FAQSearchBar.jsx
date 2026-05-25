import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

export default function FAQSearchBar({ value, onChange }) {
  const { t } = useTranslation();
  return (
    <div className="relative w-full color-transition group">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("faq.searchQuestions")}
        className="w-full p-4 pl-12 bg-slate-50 dark:bg-slate-800/30 border-2 border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-black tracking-widest text-slate-900 dark:text-white outline-none focus:border-indigo-500 transition-all color-transition uppercase placeholder:text-slate-400"
      />
      <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
    </div>
  );
}