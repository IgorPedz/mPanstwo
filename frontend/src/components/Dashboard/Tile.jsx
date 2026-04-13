import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import ICON_MAP from "../../Utils/Icons"

const Tile = ({id, type, name, icon, accent, iconColor, onDelete, isLocked}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id, disabled: isLocked });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    const IconComponent = ICON_MAP[icon];

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`color-transition bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 relative
                transition-all duration-200
                hover:shadow-lg hover:-translate-y-1
                ${isDragging ? "opacity-70 scale-95" : ""} ${isLocked ? "cursor-default" : "cursor-pointer"}`}
        >
            <div
                className={`h-1 bg-gradient-to-r ${accent} rounded-t-xl absolute top-0 left-1 right-1 color-transition`}
            />

            {!isLocked && onDelete && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(id);
                    }}
                    className="absolute top-3 right-3 text-gray-400 dark:text-gray-300 hover:text-red-600 transition color-transition cursor-pointer"
                >
                    <XMarkIcon className="h-5 w-5" />
                </button>
            )}

            <div
                {...attributes}
                {...listeners}
                onClick={(e) => e.stopPropagation()}
                className={`absolute top-3 left-3 text-gray-400 dark:text-gray-300 transition color-transition ${isLocked ? "cursor-default" : "hover:text-gray-700 dark:hover:text-gray-100 cursor-grab active:cursor-grabbing"}`}
            >
                <Bars3Icon className="h-5 w-5" />
            </div>

            <div className="mt-6 flex items-center gap-4">
                {IconComponent && (
                    <IconComponent className="h-10 w-10 text-gray-800 dark:text-gray-200 color-transition" />
                )}
                <div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 color-transition">
                        {name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 color-transition">
                        Kliknij aby otworzyć moduł
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Tile;