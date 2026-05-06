import ICON_MAP from "../../Utils/Maps/Icons";
import { COLOR_MAP } from "../../Utils/Maps/Colors";

export default function AddTileCard({ tile, isAdded, isSelected, onClick }) {
  const IconComponent = ICON_MAP[tile.icon];

  const colorClass = COLOR_MAP[tile.color] || "text-gray-500";

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer group relative h-35 w-35 flex flex-col items-center justify-center
        rounded-2xl p-5 transition-all duration-300 color-transition
        ${isAdded
          ? "bg-gray-50 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
          : `bg-gray-50 dark:bg-gray-700 hover:scale-[1.05] hover:shadow-lg ${
              isSelected
                ? "ring-4 ring-blue-400 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-800"
                : ""
            }`
        }`}
    >
      {IconComponent && (
        <IconComponent
          className={`h-12 w-12 mb-3 transition-transform duration-300 ${
            isAdded
              ? "text-gray-400 dark:text-gray-500"
              : colorClass
          }`}
        />
      )}

      <span
        className={`text-sm font-medium text-center color-transition ${
          isAdded
            ? "text-gray-400 dark:text-gray-500"
            : "text-gray-800 dark:text-gray-200"
        }`}
      >
        {tile.name}
      </span>
    </div>
  );
}