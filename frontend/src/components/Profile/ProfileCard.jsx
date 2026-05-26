import ICON_MAP from "../../Utils/Maps/Icons";
import { ACCENT_MAP } from "../../Utils/Maps/Accents";
import { useTranslation } from "react-i18next";
const ProfileCard = ({ title, value, translationKey, icon, color }) => {
  const Icon = ICON_MAP[icon] || ICON_MAP["star"];
  const { t } = useTranslation();
  const gradientClasses = ACCENT_MAP[color] || "from-slate-700 to-slate-500";

  const translatedValue =
    title === "rank" && translationKey
      ? t(`achievements.ranks.${translationKey}.name`, value)
      : title === "role" && translationKey
      ? t(`profile.roleValues.${translationKey}`, value)
      : value;
  console.log(translationKey, translatedValue);
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-500 color-transition group relative overflow-hidden h-full">
      
      <div className="absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-[0.05] group-hover:scale-110 transition-transform duration-700 pointer-events-none">
        <Icon className="h-32 w-32" />
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-6">
          
          <div className={`
            p-4 rounded-2xl transition-all duration-500 color-transition
            bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white
            group-hover:bg-gradient-to-br group-hover:shadow-lg
            ${gradientClasses.split(' ').map(c => `group-hover:${c}`).join(' ')}
          `}>
            <Icon className="h-6 w-6" />
          </div>
          
          <div className={`h-2.5 w-2.5 rounded-full bg-gradient-to-tr ${gradientClasses} opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />
        </div>

        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 color-transition">
            {t(`profile.profileCards.${title}`)}
          </p>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter color-transition">
            {translatedValue}
          </h3>
        </div>
      </div>

      <div className={`
        absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full 
        transition-all duration-700 bg-gradient-to-r ${gradientClasses}
      `} />
    </div>
  );
};

export default ProfileCard;