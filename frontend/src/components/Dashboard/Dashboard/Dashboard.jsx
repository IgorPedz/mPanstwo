import { useState, useEffect, useMemo } from "react";
import { useUser } from "../../../Contexts/UserContext";

import useTiles from "../../../Hooks/useTiles";
import useTilesPerPage from "../../../Hooks/useTilesPerPage";
import useNoScroll from "../../../Hooks/UseNoScroll";
import useDashboard from "../../../Hooks/useDashboard";

import TilesGrid from "../DashboardGrid/TilesGrid";
import Pagination from "../DashboardGrid/Pagination";
import DropDown from "../Dropdown/DropDown";

import InfoMessage from "../../Global/InfoMessage";
import EmptyDashboard from "./EmptyDashboard";
import DashboardHeader from "./DashboardHeader";
import DashboardActions from "./DashboardActions";

export default function Dashboard() {
  const { user } = useUser();

  const { tiles, setTiles, availableTiles, infoMessage, setInfoMessage } =
    useTiles();

  const TILES_PER_PAGE = useTilesPerPage();

  const [showAddMenu, setShowAddMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const [isLocked, setIsLocked] = useState(
    () => localStorage.getItem("layout-locked") === "true",
  );

  useNoScroll(true);

  const {
    loadSavedLayout,
    saveLayout,
    hasUnsavedChanges,
    infoType,
    savedTiles,
  } = useDashboard(user, tiles, setTiles, setInfoMessage);

  const isEmpty =
    Array.isArray(savedTiles) && savedTiles.length === 0 && tiles.length === 0;

  const totalPages = useMemo(() => {
    return Math.max(
      1,
      Math.ceil((tiles.length + (isLocked ? 0 : 1)) / TILES_PER_PAGE),
    );
  }, [tiles.length, isLocked, TILES_PER_PAGE]);

  const currentTiles = useMemo(() => {
    return tiles.slice(
      currentPage * TILES_PER_PAGE,
      (currentPage + 1) * TILES_PER_PAGE,
    );
  }, [tiles, currentPage, TILES_PER_PAGE]);

  useEffect(() => {
    if (currentPage > totalPages - 1) {
      setCurrentPage(totalPages - 1);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="flex-1 p-4 sm:p-10 pb-10 min-h-dvh color-transition relative">
      {!isEmpty && (tiles.length > 0 || hasUnsavedChanges) && (
        <DashboardHeader
          isLocked={isLocked}
          hasUnsavedChanges={hasUnsavedChanges}
          saveLayout={saveLayout}
          setIsLocked={setIsLocked}
          setShowAddMenu={setShowAddMenu}
          showAddMenu={showAddMenu}
        />
      )}

      {isEmpty ? (
        <EmptyDashboard setShowAddMenu={setShowAddMenu} />
      ) : (
        <>
          <TilesGrid
            tiles={tiles}
            setTiles={setTiles}
            currentTiles={currentTiles}
            currentPage={currentPage}
            totalPages={totalPages}
            setShowAddMenu={setShowAddMenu}
            isLocked={isLocked}
            savedTiles={savedTiles}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}

      {infoMessage && (
        <InfoMessage
          message={infoMessage}
          type={infoType}
          onClose={() => setInfoMessage("")}
        />
      )}

      {hasUnsavedChanges && (
        <DashboardActions
          saveLayout={saveLayout}
          loadSavedLayout={loadSavedLayout}
        />
      )}

      {showAddMenu && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-[100]"
          onClick={() => setShowAddMenu(false)}
        />
      )}

      <div className="relative z-[9999]">
        <DropDown
          showAddMenu={showAddMenu}
          setShowAddMenu={setShowAddMenu}
          tiles={tiles}
          setTiles={setTiles}
          AVAILABLE_TILES={availableTiles}
          isLocked={isLocked && !isEmpty}
        />
      </div>
    </div>
  );
}
