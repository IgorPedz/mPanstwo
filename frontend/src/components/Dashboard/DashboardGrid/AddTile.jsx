import { useTranslation } from "react-i18next";

function AddTile({ onClick, disabled }) {
  const { t } = useTranslation();

  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`
        bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600
        rounded-xl shadow-sm p-5
        flex flex-col items-center justify-center
        transition-all duration-200 color-transition
        ${disabled ? "cursor-not-allowed opacity-60" : "hover:shadow-lg hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer"}
      `}
    >
      <div className="text-4xl text-blue-700 dark:text-blue-400 color-transition">+</div>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 color-transition">
        {disabled ? t("dashboard.addTile.locked") : t("dashboard.addTile.addModule")}
      </p>
    </div>
  );
}

export default AddTile;