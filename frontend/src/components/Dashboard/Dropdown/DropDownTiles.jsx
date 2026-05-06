import { CheckIcon } from "@heroicons/react/24/solid";
import DynamicIcon from "../../../Utils/Dynamic/DynamicIcons";
import { ACCENT_MAP } from "../../../Utils/Maps/Accents";

export default function DropDownTiles({
  tile,
  isAdded,
  isSelected,
  onClick,
}) {
  const accent = ACCENT_MAP[tile.accent] || ACCENT_MAP.blue;

  return (
    <div
      onClick={() => !isAdded && onClick()}
      className={`
        group relative p-6 rounded-[32px]
        border transition-all duration-300 cursor-pointer color-transition

        ${
          isAdded
            ? "opacity-40 grayscale bg-gray-50 dark:bg-gray-800/20 border-gray-200 dark:border-gray-700 cursor-not-allowed"
            : "bg-white dark:bg-gray-800 hover:shadow-xl hover:-translate-y-1 border-gray-200 dark:border-gray-700"
        }

        ${
          isSelected
            ? `shadow-xl ${accent}`
            : ""
        }
      `}
    >
      {/* ICON */}
      <div
        className={`
          w-14 h-14 rounded-2xl flex items-center justify-center mb-5
          color-transition

          ${
            isSelected
              ? `bg-gradient-to-r ${accent} text-white rotate-6 scale-110`
              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-gray-200 dark:group-hover:bg-gray-600"
          }
        `}
      >
        <DynamicIcon name={tile.icon} className="w-7 h-7" />
      </div>

      {/* TEXT */}
      <div>
        <h3 className="color-transition text-xl font-bold text-gray-900 dark:text-white mb-2">
          {tile.name}
        </h3>

        <div className="flex items-center gap-2">
          <span
            className={`
              w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 color-transition `}
          />

          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            {tile.type}
          </p>
        </div>
      </div>

      {/* INDICATOR */}
      <div className="absolute top-6 right-6">
        {isAdded ? (
          <span className="bg-gray-200 dark:bg-gray-700 text-[9px] font-black px-2 py-1 rounded-lg text-gray-500 uppercase">
            W użyciu
          </span>
        ) : isSelected ? (
          <div
            className={`
              rounded-full p-1.5 shadow-lg text-white
              bg-gradient-to-r ${accent} animate-text-pulse
            `}
          >
            <CheckIcon className="w-4 h-4" />
          </div>
        ) : null}
      </div>
    </div>
  );
}