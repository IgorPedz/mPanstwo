import { useState, useEffect } from "react";
import axios from "axios"
import ErrorMessage from "../../Utils/ErrorMessage";
import useNoScroll from "../../Utils/UseNoScroll";
import DropDown from "./DropDown";
import Tile from "./Tile"
import AddTile from "./AddTile";
import WelcomeDashboard from "./WelcomeDashboard"
import { motion, AnimatePresence } from "framer-motion";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers"
import {
    SortableContext,
    rectSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";

import { useUser } from "../../Contexts/UserContext";

function useTilesPerPage() {
    const [tilesPerPage, setTilesPerPage] = useState(getTilesPerPage());

    function getTilesPerPage() {
        if (window.matchMedia("(min-width: 1100px)").matches) return 12;
        if (window.matchMedia("(min-width: 900px)").matches) return 9;
        if (window.matchMedia("(min-width: 768px)").matches) return 8;
        return 5;
    }

    useEffect(() => {
        const handleResize = () => setTilesPerPage(getTilesPerPage());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return tilesPerPage;
}

export default function Dashboard() {
    const [tiles, setTiles] = useState([]);
    const [error, setError] = useState("");
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");
    let [currentPage, setCurrentPage] = useState(0);
    const [availableTiles, setAvailableTiles] = useState([])

    const { user } = useUser();

    useNoScroll(true);

    useEffect(() => {
        const saved = localStorage.getItem("mpanstwo-tiles");
        if (saved) setTiles(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("mpanstwo-tiles", JSON.stringify(tiles));
    }, [tiles]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:5000/dashboard_content");
                setAvailableTiles(res.data)
            } catch (error) {
                console.log(error)
                setInfoMessage(
                    error.response?.data?.message || "Wystąpił błąd"
                );
            }
        };

        fetchData();
    }, []);
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
        <div className="flex-1 p-10  bg-gray-50 dark:bg-gray-900 h-screen color-transition">
            <WelcomeDashboard />
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
                AVAILABLE_TILES={availableTiles}
            />
        </div>
    );
}
