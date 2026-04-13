import { useEffect, useState } from "react";
import axios from "axios";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { useUser } from "../../Contexts/UserContext";
import useTilesPerPage from "../../Hooks/useTilesPerPage";
import useTiles from "../../Hooks/useTiles";
import TilesGrid from "./TilesGrid";
import Pagination from "./Pagination";
import DropDown from "./DropDown";
import WelcomeDashboard from "./WelcomeDashboard";
import useNoScroll from "../../Hooks/UseNoScroll";
import InfoMessage from "../../Utils/InfoMessage";

export default function Dashboard() {
    const TILES_PER_PAGE = useTilesPerPage();
    const { tiles, setTiles, availableTiles, infoMessage, setInfoMessage } = useTiles();
    const { user } = useUser();
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [infoType, setInfoType] = useState("success");
    const [savedTiles, setSavedTiles] = useState(null);

    useNoScroll(true);

    const loadSavedLayout = async () => {
        if (!user?.id) return;

        try {
            const res = await axios.get(`http://localhost:5000/user_tiles/${user.id}`);
            if (Array.isArray(res.data.tiles)) {
                setTiles(res.data.tiles);
                setSavedTiles(res.data.tiles);
                setInfoType("success");
                setInfoMessage("Wczytano zapisany układ.");
            }
        } catch (error) {
            if (error.response?.status === 404) {
                setSavedTiles(tiles);
            } else {
                setInfoType("error");
                setInfoMessage(error.response?.data?.message || "Błąd wczytywania układu.");
            }
        }
    };

    const saveLayout = async () => {
        try {
            await axios.post("http://localhost:5000/user_tiles", {
                userId: user.id,
                tiles,
            });
            setSavedTiles(tiles);
            setInfoType("success");
            setInfoMessage("Układ został zapisany.");
        } catch (error) {
            setInfoType("error");
            setInfoMessage(error.response?.data?.message || "Błąd zapisu układu.");
        }
    };

    useEffect(() => {
        loadSavedLayout();
    }, [user?.id]);

    const hasUnsavedChanges = savedTiles !== null && JSON.stringify(tiles) !== JSON.stringify(savedTiles);
    const totalPages = Math.ceil((tiles.length + (isLocked ? 0 : 1)) / TILES_PER_PAGE);
    const currentTiles = tiles.slice(currentPage * TILES_PER_PAGE, (currentPage + 1) * TILES_PER_PAGE);

    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages - 1) {
            setCurrentPage(totalPages - 1);
        }
    }, [currentPage, totalPages]);

    return (
        <div className="flex-1 p-4 sm:p-10 pb-10 bg-gray-50 dark:bg-gray-900 min-h-screen overflow-y-auto color-transition">
            <div className="flex items-center justify-between mb-6">
                <WelcomeDashboard />
                <button
                    type="button"
                    onClick={() => {
                        setIsLocked((prev) => !prev);
                        if (showAddMenu) setShowAddMenu(false);
                    }}
                    aria-label={isLocked ? "Odblokuj edycję" : "Zablokuj edycję"}
                    className={`inline-flex items-center justify-center rounded-full border px-3 py-3 shadow-sm transition color-transition cursor-pointer ${isLocked ? "border-blue-300 bg-white text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-blue-900" : "border-blue-300 bg-white text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-blue-900"}`}
                >
                    {isLocked ? <LockClosedIcon className="h-5 w-5" /> : <LockOpenIcon className="h-5 w-5" />}
                </button>
            </div>
            {infoMessage && (
                <InfoMessage
                    message={infoMessage}
                    type={infoType}
                    onClose={() => setInfoMessage("")}
                />
            )}

            <TilesGrid
                tiles={tiles}
                setTiles={setTiles}
                currentTiles={currentTiles}
                currentPage={currentPage}
                totalPages={totalPages}
                setShowAddMenu={setShowAddMenu}
                isLocked={isLocked}
            />

            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />

            {hasUnsavedChanges && (
                <div className="mt-6 flex justify-center px-2">
                    <button
                        type="button"
                        onClick={saveLayout}
                        className="cursor-pointer w-full max-w-md rounded-full border border-blue-400 bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Zapisz układ
                    </button>
                </div>
            )}

            {showAddMenu && !isLocked && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowAddMenu(false)} />}
            <DropDown
                showAddMenu={showAddMenu}
                setShowAddMenu={setShowAddMenu}
                tiles={tiles}
                setTiles={setTiles}
                AVAILABLE_TILES={availableTiles}
                isLocked={isLocked}
            />
        </div>
    );
}