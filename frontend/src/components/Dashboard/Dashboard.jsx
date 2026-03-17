import { useState } from "react";
import useTilesPerPage from "../../Hooks/useTilesPerPage";
import useTiles from "../../Hooks/useTiles";
import TilesGrid from "./TilesGrid";
import Pagination from "./Pagination";
import DropDown from "./DropDown";
import WelcomeDashboard from "./WelcomeDashboard";
import useNoScroll from "../../Hooks/UseNoScroll";

export default function Dashboard() {
    const TILES_PER_PAGE = useTilesPerPage();
    const { tiles, setTiles, availableTiles } = useTiles();
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    useNoScroll(true);

    const totalPages = Math.ceil((tiles.length + 1) / TILES_PER_PAGE);
    const currentTiles = tiles.slice(currentPage * TILES_PER_PAGE, (currentPage + 1) * TILES_PER_PAGE);

    if (currentPage > totalPages - 1) setCurrentPage(0);

    return (
        <div className="flex-1 p-10 bg-gray-50 dark:bg-gray-900 h-screen color-transition">
            <WelcomeDashboard />

            <TilesGrid tiles={tiles} setTiles={setTiles} currentTiles={currentTiles} currentPage={currentPage} totalPages={totalPages} setShowAddMenu={setShowAddMenu} />

            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />

            {showAddMenu && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowAddMenu(false)} />}
            <DropDown showAddMenu={showAddMenu} setShowAddMenu={setShowAddMenu} tiles={tiles} setTiles={setTiles} AVAILABLE_TILES={availableTiles} />
        </div>
    );
}