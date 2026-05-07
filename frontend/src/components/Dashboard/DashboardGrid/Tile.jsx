import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import ICON_MAP from "../../../Utils/Maps/Icons";
import { ACCENT_MAP } from "../../../Utils/Maps/Accents";
import { COLOR_MAP } from "../../../Utils/Maps/Colors";

const Tile = ({ id, name, icon, accent, type, onDelete, isLocked }) => {
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

  const IconComponent = ICON_MAP[icon];
  const colorClass = COLOR_MAP[accent] || "text-slate-500";
  const accentGradient = ACCENT_MAP[accent] || "from-slate-500 to-slate-400";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`color-transition cursor-pointer
        group relative p-6 bg-white dark:bg-slate-900 color-transition
        rounded-[2rem] transition-all duration-300 overflow-hidden
        min-h-[160px] flex flex-col justify-between border-2 border-slate-100 dark:border-slate-800
        ${isDragging ? "z-50 scale-105 shadow-2xl border-indigo-500" : "hover:border-slate-300 dark:hover:border-slate-700"}
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
             <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">{type}</span>
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
            {name}
          </h3>
          <p className="text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.2em] mt-1.5 color-transition">
            {isLocked ? "Kliknij by otworzyć" : "Najedź by przesunąć lub usunąć"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tile;