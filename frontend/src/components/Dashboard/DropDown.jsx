import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddTileCard from "./AddTileCard";

export default function AddModuleDropdown({ showAddMenu, setShowAddMenu, tiles, setTiles, AVAILABLE_TILES }) {
  const scrollRef = useRef(null);
  const [selectedTiles, setSelectedTiles] = useState([]);

  const toggleTile = (type) =>
    setSelectedTiles((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  const addSelectedTiles = () => {
    const newTiles = selectedTiles
      .filter((type) => !tiles.some((t) => t.type === type))
      .map((type) => {
        const tileData = AVAILABLE_TILES.find((t) => t.type === type);
        return { id: uuidv4(), ...tileData };
      });

    if (newTiles.length > 0) setTiles((prev) => [...prev, ...newTiles]);
    setSelectedTiles([]);
    setShowAddMenu(false);
  };

  const handleScrollDrag = {
    isDragging: useRef(false),
    startX: useRef(0),
    scrollLeft: useRef(0),
    onMouseDown: (e) => {
      handleScrollDrag.isDragging.current = true;
      handleScrollDrag.startX.current = e.pageX - scrollRef.current.offsetLeft;
      handleScrollDrag.scrollLeft.current = scrollRef.current.scrollLeft;
    },
    onMouseMove: (e) => {
      if (!handleScrollDrag.isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      scrollRef.current.scrollLeft = handleScrollDrag.scrollLeft.current - (x - handleScrollDrag.startX.current) * 1.5;
    },
    onMouseUp: () => (handleScrollDrag.isDragging.current = false),
    onMouseLeave: () => (handleScrollDrag.isDragging.current = false),
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-all duration-200 ${showAddMenu ? "bg-black/25 backdrop-blur-sm opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setShowAddMenu(false)}
      />

      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${showAddMenu ? "translate-y-0" : "translate-y-full"}`}
        style={{ height: "70vh" }}
      >
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full transition color-transition" />
        </div>

        <div className="flex justify-between items-center px-4 pb-3">
          <h3 className="font-bold text-xl text-gray-800 dark:text-gray-200 color-transition">Dodaj moduł</h3>
          <button
            onClick={() => setShowAddMenu(false)}
            className="text-gray-400 dark:text-gray-300 hover:text-red-600 transition color-transition text-2xl cursor-pointer"
          >
            ×
          </button>
        </div>

        <div
          ref={scrollRef}
          className="pt-5 px-4 flex flex-row flex-wrap overflow-x-auto h-[calc(70vh-120px)] cursor-grab select-none no-scrollbar"
          onMouseDown={handleScrollDrag.onMouseDown}
          onMouseMove={handleScrollDrag.onMouseMove}
          onMouseUp={handleScrollDrag.onMouseUp}
          onMouseLeave={handleScrollDrag.onMouseLeave}
        >
          <div className="grid grid-rows-2 grid-flow-col auto-cols-[180px] gap-10">
            {AVAILABLE_TILES.map((tile) => (
              <AddTileCard
                key={tile.type}
                tile={tile}
                isAdded={tiles.some((t) => t.type === tile.type)}
                isSelected={selectedTiles.includes(tile.type)}
                onClick={() => !tiles.some((t) => t.type === tile.type) && toggleTile(tile.type)}
              />
            ))}
          </div>
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-gray-800 pt-4 pb-6 px-4 flex justify-center">
          <button
            onClick={addSelectedTiles}
            disabled={selectedTiles.length === 0}
            className="w-full md:w-auto px-8 py-3 rounded-full font-semibold
                       bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700
                       text-white shadow-lg hover:scale-[1.03] hover:shadow-xl
                       disabled:from-gray-300 disabled:to-gray-300 disabled:text-gray-500
                       transition-all duration-200 cursor-pointer color-transition"
          >
            Dodaj {selectedTiles.length > 0 ? `(${selectedTiles.length})` : ""}
          </button>
        </div>
      </div>
    </>
  );
}