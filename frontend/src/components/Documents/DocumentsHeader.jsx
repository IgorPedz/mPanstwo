import { useTranslation } from "react-i18next";

export default function DocumentsHeader() {
  const { t } = useTranslation();
  
  return (
    <div className="w-full space-y-3 color-transition">
      <p className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-500 color-transition">
        {t("documents.page")}
      </p>
      <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none color-transition">
        {t("documents.documents")}
      </h1>
      <div className="h-1 w-20 bg-indigo-500 mt-4 color-transition" /> 
      <p className="text-slate-500 dark:text-slate-400 max-w-2xl font-medium pt-4 text-lg color-transition">
        {t("documents.description")}
      </p>
    </div>
  );
}