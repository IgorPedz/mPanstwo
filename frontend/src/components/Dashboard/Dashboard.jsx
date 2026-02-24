import { useState, useEffect } from "react";
import ErrorMessage from "../../Utils/ErrorMessage";
import useNoScroll from "../../Utils/UseNoScroll";
import DropDown from "../Dashboard/DropDown";
import { motion, AnimatePresence } from "framer-motion";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";   
import {
    SortableContext,
    useSortable,
    rectSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
    UserGroupIcon,
    BuildingLibraryIcon,
    BuildingOfficeIcon,
    ScaleIcon,
    Bars3Icon,
    XMarkIcon,
    DocumentTextIcon,
    FlagIcon,
    UserIcon,
    BriefcaseIcon,
    AcademicCapIcon,
    BanknotesIcon,
} from "@heroicons/react/24/outline";

import { useUser } from "../../Contexts/UserContext";

const AVAILABLE_TILES = [
    {
        type: "poslowie",
        label: "Posłowie",
        icon: UserGroupIcon,
        accent: "from-blue-800 to-blue-600",
        iconColor: "text-blue-800",
    },
    {
        type: "senatorowie",
        label: "Senatorowie",
        icon: UserIcon,
        accent: "from-indigo-800 to-indigo-600",
        iconColor: "text-indigo-800",
    },
    {
        type: "kluby",
        label: "Kluby Parlamentarne",
        icon: ScaleIcon,
        accent: "from-purple-700 to-purple-500",
        iconColor: "text-purple-700",
    },
    {
        type: "sejm",
        label: "Sejm RP",
        icon: BuildingLibraryIcon,
        accent: "from-emerald-700 to-emerald-500",
        iconColor: "text-emerald-700",
    },
    {
        type: "senat",
        label: "Senat RP",
        icon: BuildingLibraryIcon,
        accent: "from-orange-700 to-orange-500",
        iconColor: "text-orange-700",
    },
    {
        type: "rada",
        label: "Rada Ministrów",
        icon: BuildingOfficeIcon,
        accent: "from-rose-700 to-rose-500",
        iconColor: "text-rose-700",
    },
    {
        type: "ustawy",
        label: "Ustawy",
        icon: DocumentTextIcon,
        accent: "from-green-700 to-green-500",
        iconColor: "text-green-700",
    },
    {
        type: "kancelaria_prezydenta",
        label: "Kancelaria Prezydenta RP",
        icon: BriefcaseIcon,
        accent: "from-gray-700 to-gray-500",
        iconColor: "text-fuchsia-700",
    },
    {
        type: "prezydent",
        label: "Prezydent RP",
        icon: FlagIcon,
        accent: "from-red-700 to-red-500",
        iconColor: "text-red-700",
    },
    {
        type: "uokik",
        label: "UOKiK",
        icon: BanknotesIcon,
        accent: "from-pink-700 to-pink-500",
        iconColor: "text-pink-700",
    },
    {
        type: "tk",
        label: "Trybunał Konstytucyjny",
        icon: AcademicCapIcon,
        accent: "from-yellow-700 to-yellow-500",
        iconColor: "text-yellow-700",
    },
    {
        type: "nsa",
        label: "Naczelny Sąd Administracyjny",
        icon: BuildingOfficeIcon,
        accent: "from-cyan-700 to-cyan-500",
        iconColor: "text-cyan-700",
    },
    {
        type: "krs",
        label: "Krajowa Rada Sądownictwa",
        icon: BuildingOfficeIcon,
        accent: "from-teal-700 to-teal-500",
        iconColor: "text-teal-700",
    },
];

function useTilesPerPage() {
    const [tilesPerPage, setTilesPerPage] = useState(getTilesPerPage());

    function getTilesPerPage() {
        if (window.matchMedia("(min-width: 1100px)").matches) return 9;
        if (window.matchMedia("(min-width: 900px)").matches) return 8;
        if (window.matchMedia("(min-width: 768px)").matches) return 6;
        return 3;
    }

    useEffect(() => {
        const handleResize = () => setTilesPerPage(getTilesPerPage());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return tilesPerPage;
}

function Tile({ id, type, label, icon: Icon, accent, onDelete }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`color-transition bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 relative
        transition-all duration-200
        hover:shadow-lg hover:-translate-y-1
        ${isDragging ? "opacity-70 scale-95" : ""}
        cursor-pointer`}
        >
            <div
                className={`h-1 bg-gradient-to-r ${accent} rounded-t-xl absolute top-0 left-1 right-1 color-transition`}
            />
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(id);
                }}
                className="absolute top-3 right-3 text-gray-400 dark:text-gray-300 hover:text-red-600 transition color-transition cursor-pointer"
            >
                <XMarkIcon className="h-5 w-5" />
            </button>
            <div
                {...attributes}
                {...listeners}
                onClick={(e) => e.stopPropagation()}
                className="absolute top-3 left-3 text-gray-400 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition color-transition cursor-grab active:cursor-grabbing"
            >
                <Bars3Icon className="h-5 w-5" />
            </div>

            <div className="mt-6 flex items-center gap-4">
                <Icon className={`h-10 w-10 text-gray-800 dark:text-gray-200 color-transition`} />
                <div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 color-transition">
                        {label}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 color-transition">
                        Kliknij aby otworzyć moduł
                    </p>
                </div>
            </div>
        </div>
    );
}

function AddTile({ onClick }) {
    return (
        <div
            onClick={onClick}
            className="
        bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600
        rounded-xl shadow-sm p-5
        flex flex-col items-center justify-center
        hover:shadow-lg hover:-translate-y-1
        hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900
        transition-all duration-200 color-transition
        cursor-pointer
      "
        >
            <div className="text-4xl text-blue-700 dark:text-blue-400 color-transition">+</div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 color-transition">Dodaj moduł</p>
        </div>
    );
}

export default function Dashboard() {
    const [tiles, setTiles] = useState([]);
    const [error, setError] = useState("");
    const [showAddMenu, setShowAddMenu] = useState(false);
    let [currentPage, setCurrentPage] = useState(0);

    const { user } = useUser();

    useNoScroll(true);

    useEffect(() => {
        const saved = localStorage.getItem("mpanstwo-tiles");
        if (saved) setTiles(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("mpanstwo-tiles", JSON.stringify(tiles));
    }, [tiles]);

    const deleteTile = (id) => {
        setTiles((prev) => prev.filter((t) => t.id !== id));
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setTiles((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const TILES_PER_PAGE = useTilesPerPage();
    const totalPages = Math.ceil((tiles.length + 1) / TILES_PER_PAGE);
    const currentTiles = tiles.slice(
        currentPage * TILES_PER_PAGE,
        (currentPage + 1) * TILES_PER_PAGE
    );

    useEffect(() => {
        if (currentPage > totalPages - 1) {
            setCurrentPage(0);
        }
    }, [totalPages]);

    return (
        <div className="flex-1 p-10 bg-gray-50 dark:bg-gray-900 h-screen color-transition">
            <div className="flex justify-between">
                <h1
                    className="tracking-wide text-2xl md:text-2xl text-blue-900 dark:text-blue-400 mb-4 color-transition"
                    style={{ fontFamily: "'Patrick Hand', cursive" }}
                >
                    Witaj, {user.name}!
                </h1>
            </div>

            <AnimatePresence initial={false} mode="wait">
                <motion.div
                    key={currentPage}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ type: "tween", duration: 0.3 }}
                >
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
                        <SortableContext items={currentTiles.map((t) => t.id)} strategy={rectSortingStrategy}>
                            {currentTiles.map((tile) => (
                                <Tile key={tile.id} {...tile} onDelete={deleteTile} />
                            ))}
                        </SortableContext>
                    </DndContext>
                    {currentPage === totalPages - 1 && <AddTile onClick={() => setShowAddMenu(true)} />}
                </motion.div>
            </AnimatePresence>

            {totalPages > 1 && (
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                        className="cursor-pointer px-4 py-2 bg-blue-200 dark:bg-blue-900 text-lg dark:text-blue-200 rounded hover:bg-blue-300 dark:hover:bg-blue-700 disabled:opacity-50 transition color-transition"
                    >
                        {"<"}
                    </button>
                    <span className="px-4 py-2 text-gray-800 dark:text-gray-200 text-lg color-transition">
                        {currentPage + 1} / {totalPages}
                    </span>
                    <button
                        disabled={currentPage === totalPages - 1}
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
                        className="cursor-pointer px-4 py-2 bg-blue-200 dark:bg-blue-900 text-lg dark:text-blue-200 rounded hover:bg-blue-300 dark:hover:bg-blue-700 disabled:opacity-50 transition color-transition"
                    >
                        {">"}
                    </button>
                </div>
            )}

            <ErrorMessage message={error} onClose={() => setError("")} />

            {showAddMenu && (
                <div
                    className="fixed inset-0 bg-black/30 z-40"
                    onClick={() => setShowAddMenu(false)}
                />
            )}

            <DropDown
                showAddMenu={showAddMenu}
                setShowAddMenu={setShowAddMenu}
                tiles={tiles}
                setTiles={setTiles}
                AVAILABLE_TILES={AVAILABLE_TILES}
            />
        </div>
    );
}