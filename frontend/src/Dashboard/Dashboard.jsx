import { useState, useEffect } from "react";
import ErrorMessage from "../ErrorMessages/ErrorMessage";
import useNoScroll from "../Utills/UseNoScroll";
import { motion, AnimatePresence } from "framer-motion";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    useSortable,
    rectSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from "uuid";

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
        iconColor: "text-gray-700",
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


const iconColors = {
    poslowie: "text-blue-800",
    senatorowie: "text-orange-800",
    senat: "text-indigo-800",
    kluby: "text-purple-700",
    sejm: "text-emerald-700",
    rada: "text-rose-700",
    ustawy: "text-green-700",
    kancelaria_prezydenta: "text-gray-700",
    prezydent: "text-red-700",
    uokik: "text-pink-700",
    tk: "text-yellow-700",
    nsa: "text-cyan-700",
    krs: "text-teal-700",
};

const TILES_PER_PAGE = 9;

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

    let iconClass = "text-gray-800";

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`bg-white border border-gray-200 rounded-xl shadow-sm p-5 relative
        transition-all duration-200
        hover:shadow-lg hover:-translate-y-1
        ${isDragging ? "opacity-70 scale-95" : ""}
        cursor-pointer`}
        >

            {/* gradient pasek */}
            <div
                className={`h-1 bg-gradient-to-r ${accent} rounded-t-xl absolute top-0 left-0 right-0`}
            />

            {/* delete */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(id);
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition cursor-pointer"
            >
                <XMarkIcon className="h-5 w-5" />
            </button>

            {/* drag handle */}
            <div
                {...attributes}
                {...listeners}
                onClick={(e) => e.stopPropagation()}
                className="absolute top-3 left-3 text-gray-400 hover:text-gray-700 transition cursor-grab active:cursor-grabbing"
            >
                <Bars3Icon className="h-5 w-5" />
            </div>

            <div className="mt-6 flex items-center gap-4">
                <Icon className={`h-10 w-10 ${iconClass}`} />
                <div>
                    <h3 className="font-semibold text-gray-800">{label}</h3>
                    <p className="text-sm text-gray-500">Kliknij aby otworzyć moduł</p>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard() {
    const [tiles, setTiles] = useState([]);
    const [error, setError] = useState("");
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    useNoScroll(true);

    useEffect(() => {
        const saved = localStorage.getItem("mpanstwo-tiles");
        if (saved) setTiles(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("mpanstwo-tiles", JSON.stringify(tiles));
    }, [tiles]);

    const addTile = (type) => {
        const tileData = AVAILABLE_TILES.find((t) => t.type === type);
        if (!tileData) return;

        // jeśli kafelek już istnieje → pokaz błąd
        if (tiles.some((t) => t.type === type)) {
            setError(`Moduł "${tileData.label}" jest już dodany!`);
            return;
        }

        setTiles([
            ...tiles,
            {
                id: uuidv4(),
                type: tileData.type, // konieczne do kolorów i uników
                label: tileData.label,
                icon: tileData.icon,
                accent: tileData.accent,
            },
        ]);
    };
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

    const totalPages = Math.ceil(tiles.length / TILES_PER_PAGE);
    const paginatedTiles = tiles.slice(currentPage * TILES_PER_PAGE, (currentPage + 1) * TILES_PER_PAGE);

    return (
        <div className="flex-1 p-10 bg-gray-50 min-h-screen">

            <div className="flex justify-between">
                <h1
                    className="tracking-wider text-3xl md:text-4xl text-blue-900 mb-4"
                    style={{ fontFamily: "'Patrick Hand', cursive" }}
                >
                    Witaj, Igor!
                </h1>

                <button
                    onClick={() => setShowAddMenu(!showAddMenu)}
                    className="flex items-center justify-center w-12 h-12 text-blue-900 text-2xl font-bold rounded-full hover:text-blue-700 transition"
                >
                    +
                </button>
            </div>

            <AnimatePresence initial={false} mode="wait">
                <motion.div
                    key={currentPage}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ type: "tween", duration: 0.3 }}
                >
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext
                            items={paginatedTiles.map((t) => t.id)}
                            strategy={rectSortingStrategy}
                        >
                            {paginatedTiles.map((tile) => (
                                <Tile key={tile.id} {...tile} onDelete={deleteTile} />
                            ))}
                        </SortableContext>
                    </DndContext>
                </motion.div>
            </AnimatePresence>

            {totalPages > 1 && (
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 0))}
                        className="cursor-pointer px-3 py-1 bg-blue-200 rounded hover:bg-blue-300 disabled:opacity-50"
                    >
                        {"<"}
                    </button>
                    <span className="px-3 py-1">{currentPage + 1} / {totalPages}</span>
                    <button
                        disabled={currentPage === totalPages - 1}
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages - 1))}
                        className="cursor-pointer px-3 py-1 bg-blue-200 rounded hover:bg-blue-300 disabled:opacity-50"
                    >
                        {">"}
                    </button>
                </div>
            )}
            {tiles.length === 0 && (
                <p className="text-gray-400 mt-20 text-center">
                    Nie ma żadnego modułu!
                </p>
            )}
            <ErrorMessage message={error} onClose={() => setError("")} />

            {showAddMenu && (
                <div
                    className="fixed inset-0 bg-black/30 z-40"
                    onClick={() => setShowAddMenu(false)}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 overflow-y-auto`}
                style={{ transform: showAddMenu ? "translateX(0)" : "translateX(100%)" }}

            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="font-semibold text-lg">Dodaj moduł</h3>
                    <button
                        onClick={() => setShowAddMenu(false)}
                        className="cursor-pointer text-gray-500 hover:text-red-700"
                    >
                        ×
                    </button>
                </div>

                <div className="p-4 grid grid-cols-1 gap-3">
                    {AVAILABLE_TILES.map((tile) => {
                        const isAdded = tiles.some((t) => t.type === tile.type);
                        return (
                            <button
                                key={tile.type}
                                onClick={() => {
                                    if (!isAdded) addTile(tile.type);
                                }}
                                disabled={isAdded}
                                className={`flex items-center gap-2 p-3 border rounded-lg transition 
            ${isAdded ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        : "bg-blue-50 hover:bg-blue-100 cursor-pointer"}`}
                            >
                                <tile.icon className={`h-6 w-6 ${iconColors[tile.type] || "text-gray-800"}`} />
                                <span>{tile.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>


        </div>
    );
}
