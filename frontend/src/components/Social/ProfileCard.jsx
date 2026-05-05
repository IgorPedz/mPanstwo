import { COLOR_MAP, GRADIENT_MAP } from "../../Utils/Colors";
import ICON_MAP from "../../Utils/Icons";
const ProfileCard = ({ title, value, icon, color = "indigo" }) => {
  const textColor = COLOR_MAP[color] || COLOR_MAP.indigo;
  const gradient = GRADIENT_MAP[color] || GRADIENT_MAP.indigo;
  const ImportedIcon = ICON_MAP[icon] || ICON_MAP.stats;

  return (
    <div className="
      relative overflow-hidden rounded-2xl
      border border-gray-200 dark:border-gray-800
      p-6 shadow-sm
      transition-all duration-300
      hover:shadow-xl hover:-translate-y-1
      cursor-pointer
      color-transition
    ">

      <div
        className={`
          absolute -top-10 -right-10 h-32 w-32
          rounded-full blur-2xl
          bg-gradient-to-br ${gradient}
          color-transition
        `}
      />

      <div className="relative flex items-center gap-4">

        <div className="
          flex h-11 w-11 items-center justify-center
          rounded-xl
          color-transition
        ">
          <ImportedIcon className={`h-6 w-6 ${textColor} color-transition`} />
        </div>

        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 color-transition">
            {title}
          </p>

          <p className="text-xl font-bold text-gray-900 dark:text-white color-transition">
            {value}
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProfileCard;