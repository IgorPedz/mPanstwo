import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import ICON_MAP from "../../../Utils/Maps/Icons";
import { ACCENT_MAP } from "../../../Utils/Maps/Accents";
import { COLOR_MAP } from "../../../Utils/Maps/Colors";

const Tile = ({
    id,
    name,
    icon,
    iconColor,
    accent,
    onDelete,
    isLocked
}) => {
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
    const colorClass = COLOR_MAP[accent] || "text-gray-500";
    const accentClass = ACCENT_MAP[accent] || "from-gray-500 to-gray-400";

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`
                color-transition
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                rounded-xl shadow-sm p-5 relative

                transition-all duration-200
                hover:shadow-lg hover:-translate-y-1

                ${isDragging ? "opacity-70 scale-95" : ""}
                ${isLocked ? "cursor-default" : "cursor-pointer"}
            `}
        >

            <div
                className={`
                    h-1 bg-gradient-to-r ${accentClass}
                    rounded-t-xl absolute top-0 left-1 right-1
                    color-transition
                `}
            />

            {!isLocked && onDelete && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(id);
                    }}
                    className="
                        cursor-pointer absolute top-3 right-3
                        text-gray-400 dark:text-gray-300
                        hover:text-red-600
                        transition-colors duration-200
                        color-transition
                    "
                >
                    <XMarkIcon className="h-5 w-5 color-transition" />
                </button>
            )}

            <div
                {...attributes}
                {...listeners}
                onClick={(e) => e.stopPropagation()}
                className={`
                    absolute top-3 left-3
                    text-gray-400 dark:text-gray-300

                    transition-colors duration-200
                    color-transition

                    ${
                        isLocked
                            ? "cursor-default"
                            : "hover:text-gray-700 dark:hover:text-gray-100 cursor-grab active:cursor-grabbing"
                    }
                `}
            >
                <Bars3Icon className="h-5 w-5 color-transition" />
            </div>

            <div className="mt-6 flex items-center gap-4 color-transition">
                {IconComponent && (
                    <IconComponent
                        className={`
                            h-10 w-10
                            ${colorClass}
                            dark:opacity-90
                            color-transition
                        `}
                    />
                )}

                <div className="color-transition">
                    <h3 className="
                        text-sm font-semibold
                        text-gray-800 dark:text-gray-200
                        color-transition
                    ">
                        {name}
                    </h3>

                    <p className="
                        text-xs
                        text-gray-500 dark:text-gray-400
                        color-transition
                    ">
                        Kliknij aby otworzyć moduł
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Tile;