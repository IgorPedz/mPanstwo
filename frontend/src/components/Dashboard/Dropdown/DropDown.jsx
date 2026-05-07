import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import DropDownBackdrop from "./DropDownBackdrop";
import DropDownHeader from "./DropDownHeader";
import DropDownGrid from "./DropDownGrid";
import DropDownActionBar from "./DropDownActionBar";

export default function DropDown({
  showAddMenu,
  setShowAddMenu,
  tiles,
  setTiles,
  AVAILABLE_TILES,
  isLocked,
}) {
  const [selectedTiles, setSelectedTiles] = useState([]);

  if (isLocked) return null;

  const toggleTile = (type) => {
    setSelectedTiles((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const addSelectedTiles = () => {
    const newTiles = selectedTiles
      .filter((type) => !tiles.some((t) => t.type === type))
      .map((type) => {
        const tileData = AVAILABLE_TILES.find((t) => t.type === type);
        return { ...tileData, id: uuidv4() };
      });

    setTiles((prev) => [...prev, ...newTiles]);
    setSelectedTiles([]);
    setShowAddMenu(false);
  };

  return (
    <>
      <DropDownBackdrop
        show={showAddMenu}
        onClose={() => setShowAddMenu(false)}
      />

      <div
        className={`
          fixed bottom-0 left-0 right-0 z-[70]
          h-[85vh]
          pointer-events-none
          transform-gpu will-change-transform
          transition-transform duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${showAddMenu ? "translate-y-0" : "translate-y-full"}
        `}
      >

        <div className={`
          pointer-events-auto 
          h-full w-full
          bg-white dark:bg-gray-900
          border-t border-gray-200 dark:border-gray-800
          rounded-t-[40px]
          transition-colors duration-200 ease-in-out
          flex flex-col overflow-hidden
        `}>
          
          <DropDownHeader setShowAddMenu={setShowAddMenu} />

          <DropDownGrid
            AVAILABLE_TILES={AVAILABLE_TILES}
            tiles={tiles}
            selectedTiles={selectedTiles}
            toggleTile={toggleTile}
          />

          <DropDownActionBar
            selectedTiles={selectedTiles}
            addSelectedTiles={addSelectedTiles}
          />
        </div>
      </div>
    </>
  );
}