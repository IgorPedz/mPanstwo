import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import TypeTabs from "./TypeTabs";
import { useTranslation } from "react-i18next";

export default function BillFilters({ type, onTypeChange, search, onSearchChange }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
      <TypeTabs active={type} onChange={onTypeChange} />

      <div className="relative mb-6">
        <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4
          text-slate-400 dark:text-slate-500 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t("institution.legislation.searchPlaceholder")}
          className="pl-10 pr-4 py-2.5 w-64 rounded-[1.1rem] text-sm
            bg-slate-50 dark:bg-slate-900/50
            border-2 border-slate-100 dark:border-slate-800
            text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500
            focus:outline-none focus:border-indigo-300 dark:focus:border-indigo-700
            color-transition transition-colors"
        />
      </div>
    </div>
  );
}
