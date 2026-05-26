import { useTranslation } from "react-i18next";

export default function NotificationFooter() {
  const { t } = useTranslation()
  return (
    <footer className="mt-20 text-center border-t border-dashed border-slate-200 dark:border-slate-800 pt-10 color-transition">
      <p className="text-xs font-bold text-slate-300 dark:text-slate-700 uppercase tracking-[0.5em] color-transition">
        {t("notifications.endOfTransmission")}
      </p>
    </footer>
  );
}
