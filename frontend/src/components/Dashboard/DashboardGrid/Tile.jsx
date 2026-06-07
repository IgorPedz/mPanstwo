import { useRef, useEffect } from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import ICON_MAP from "../../../Utils/Maps/Icons";
import { ACCENT_MAP } from "../../../Utils/Maps/Accents";
import { COLOR_MAP } from "../../../Utils/Maps/Colors";
import { getMinistriesData } from "../../../data/ministriesData";
import { getJudicialData } from "../../../data/judicialData";
import { getPresidentData } from "../../../data/presidentData";
import { getSejmData } from "../../../data/sejmData";
import { getSenatData } from "../../../data/senatData";

const JUDICIAL_SLUGS = new Set([
  "sn",
  "constitutional_tribunal",
  "supreme_administrative_court",
  "national_council_of_the_judiciary",
]);

function resolveInstitutionStyle(slug, fallbackAccent, fallbackIcon, t) {
  if (slug === "president") {
    const d = getPresidentData(t);
    return { accent: d.accent, icon: d.icon };
  }
  if (slug === "sejm" || slug === "members_of_parliament") {
    const d = getSejmData(t);
    return { accent: d.accent, icon: d.icon };
  }
  if (slug === "senate") {
    const d = getSenatData(t);
    return { accent: d.accent, icon: d.icon };
  }
  if (slug === "parliamentary_clubs") {
    return { accent: "indigo", icon: "userGroup" };
  }
  if (JUDICIAL_SLUGS.has(slug)) {
    const d = getJudicialData(t)[slug];
    if (d) return { accent: d.accent, icon: d.icon };
  }
  const d = getMinistriesData(t)[slug];
  if (d) return { accent: d.accent, icon: d.icon };
  return { accent: fallbackAccent, icon: fallbackIcon };
}

const NAVIGABLE_SLUGS = new Set([
  "chancellery_of_the_prime_minister",
  "council_of_ministers",
  "presidential_chancellery",
]);

const TILE_ROUTES = (slug, icon, accent) => {
  if (slug === "president")          return { path: "/president", state: { icon, accent } };
  if (slug === "sejm")               return { path: "/sejm",      state: { icon, accent } };
  if (slug === "members_of_parliament") return { path: "/sejm/mp" };
  if (slug === "senate")             return { path: "/senat",     state: { icon, accent } };
  if (["sn", "constitutional_tribunal", "supreme_administrative_court", "national_council_of_the_judiciary"].includes(slug))
    return { path: `/courts/${slug}`, state: { icon, accent } };
  if (slug === "parliamentary_clubs") return { path: "/clubs",     state: { icon, accent } };
  if (slug?.startsWith("ministry_of_") || NAVIGABLE_SLUGS.has(slug))
    return { path: `/ministry/${slug}`, state: { icon, accent } };
  return null;
};


const Tile = ({ id, slug, icon: iconProp, accent: accentProp, onDelete, isLocked }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dragOccurredRef = useRef(false);

  const { accent, icon } = resolveInstitutionStyle(slug, accentProp, iconProp, t);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: isLocked });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  useEffect(() => {
    if (isDragging) dragOccurredRef.current = true;
  }, [isDragging]);

  const handleClick = () => {
    if (!isLocked) return;
    if (dragOccurredRef.current) {
      dragOccurredRef.current = false;
      return;
    }
    const route = TILE_ROUTES(slug, icon, accent);
    if (route) navigate(route.path, { state: route.state });
  };

  const IconComponent = ICON_MAP[icon];
  const colorClass = COLOR_MAP[accent] || "text-slate-500";
  const accentGradient = ACCENT_MAP[accent] || "from-slate-500 to-slate-400";
  const isNavigable = !!TILE_ROUTES(slug, icon, accent);

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      className={`color-transition
        group relative p-6 bg-white dark:bg-slate-900 color-transition
        rounded-[2rem] transition-all duration-300 overflow-hidden
        min-h-[160px] flex flex-col justify-between border-2 border-slate-100 dark:border-slate-800
        ${isNavigable ? "cursor-pointer" : "cursor-default"}
        ${isDragging ? "z-50 scale-105 shadow-2xl border-indigo-500" : isNavigable ? "hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md" : "hover:border-slate-300 dark:hover:border-slate-700"}
      `}
    >

      <div className={`absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-[0.08] transition-transform duration-700 group-hover:scale-125 group-hover:-rotate-12 pointer-events-none ${colorClass}`}>
        {IconComponent && <IconComponent className="h-32 w-32" />}
      </div>

      <div className="color-transition absolute bottom-0 left-0 w-full h-1.5 bg-slate-100 dark:bg-slate-800 overflow-hidden pointer-events-none">
        <div className={`
          h-full w-full bg-gradient-to-r ${accentGradient}
          transform -translate-x-full group-hover:translate-x-0 
          transition-transform duration-500 ease-out
        `} />
      </div>

      <div className="relative z-20 flex justify-between items-start">
        {!isLocked ? (
          <>
            <div
              {...attributes}
              {...listeners}
              className="color-transition p-2 bg-slate-50 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl text-slate-400 hover:text-indigo-500 transition-all cursor-grab active:cursor-grabbing border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            >
              <Bars3Icon className="h-4 w-4" />
            </div>
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
                className="color-transition p-2 bg-slate-50 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl text-slate-400 hover:text-red-500 cursor-pointer transition-all border border-transparent hover:border-red-100 dark:hover:border-red-900/30"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </>
        ) : (
          <div className="color-transition flex items-center gap-2 px-3 py-1 bg-slate-100/50 dark:bg-slate-800/50 rounded-full border border-slate-200/50 dark:border-slate-700/50">
             <div className="w-1 h-1 rounded-full bg-slate-400 animate-pulse" />
             <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">{t(`dashboard.dashboardContent.${slug}.type`)}</span>
          </div>
        )}
      </div>

      <div className="relative z-10 flex items-center gap-4">
        <div
          className={`
            color-transition p-4 rounded-2xl 
            bg-slate-50 dark:bg-slate-800/50 
            border-2 border-transparent group-hover:border-white dark:group-hover:border-slate-700
            transition-all duration-300 ${colorClass}
          `}
        >
          {IconComponent && <IconComponent className="h-7 w-7 transition-transform group-hover:scale-110" />}
        </div>
        
        <div className="overflow-hidden">
          <h3 className="color-transition font-black text-lg text-slate-900 dark:text-white tracking-tighter uppercase leading-none truncate">
            {t(`dashboard.dashboardContent.${slug}.title`)}
          </h3>
          <p className="text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.2em] mt-1.5 color-transition">
            {isLocked ? t("dashboard.tile.lockedHint") : t("dashboard.tile.hoverHint")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tile;