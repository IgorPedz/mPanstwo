import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddTileCard from "./AddTileCard";

export default function AddModuleDropdown({
  showAddMenu,
  setShowAddMenu,
  tiles,
  setTiles,
  AVAILABLE_TILES,
  isLocked
}) {
  if (isLocked) return null;

  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const [selectedTiles, setSelectedTiles] = useState([]);

  const toggleTile = (type) => {
    setSelectedTiles((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const addSelectedTiles = () => {
    const newTiles = selectedTiles
      .filter((type) => !tiles.some((t) => t.type === type))
      .map((type) => {
        const tileData = AVAILABLE_TILES.find((t) => t.type === type);
        if (!tileData) return null;

        return {
          id: uuidv4(),
          ...tileData,
        };
      })
      .filter(Boolean);

    if (newTiles.length) {
      setTiles((prev) => [...prev, ...newTiles]);
    }

    setSelectedTiles([]);
    setShowAddMenu(false);
  };

  // 🔥 CLEAN DRAG LOGIC
  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const onMouseMove = (e) => {
    if (!isDragging.current || !scrollRef.current) return;

    e.preventDefault();

    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;

    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const stopDrag = () => {
    isDragging.current = false;
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-200
        ${showAddMenu
          ? "bg-black/25 backdrop-blur-sm opacity-100"
          : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowAddMenu(false)}
      />

      {/* PANEL */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800
        rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out
        ${showAddMenu ? "translate-y-0" : "translate-y-full"}`}
        style={{ height: "70vh" }}
      >
        {/* HANDLE */}
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>

        {/* HEADER */}
        <div className="flex justify-between items-center px-4 pb-3">
          <h3 className="font-bold text-xl text-gray-800 dark:text-gray-200">
            Dodaj moduł
          </h3>

          <button
            onClick={() => setShowAddMenu(false)}
            className="cursor-pointer text-gray-400 hover:text-red-600 transition text-2xl"
          >
            ×
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col h-[calc(70vh-100px)]">
          <div
            ref={scrollRef}
            className="pt-5 px-4 flex-1 overflow-x-auto cursor-grab select-none no-scrollbar"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
          >
            <div className="grid grid-rows-2 grid-flow-col auto-cols-[180px] gap-10 pb-6">
              {AVAILABLE_TILES?.map((tile) => {
                if (!tile?.type) return null;

                const isAdded = tiles.some((t) => t.type === tile.type);

                return (
                  <AddTileCard
                    key={tile.type}
                    tile={tile}
                    isAdded={isAdded}
                    isSelected={selectedTiles.includes(tile.type)}
                    onClick={() => {
                      if (!isAdded) toggleTile(tile.type);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* ACTION BUTTON */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 pt-4 pb-6 px-4 flex justify-center">
          <button
            onClick={addSelectedTiles}
            disabled={!selectedTiles.length}
            className="cursor-pointer w-full md:w-auto px-8 py-3 rounded-full font-semibold
            bg-gradient-to-r from-blue-500 to-indigo-600
            text-white shadow-lg hover:scale-[1.03] hover:shadow-xl
            disabled:from-gray-300 disabled:to-gray-300 disabled:text-gray-500
            transition-all duration-200"
          >
            Dodaj {selectedTiles.length ? `(${selectedTiles.length})` : ""}
          </button>
        </div>
      </div>
    </>
  );
}