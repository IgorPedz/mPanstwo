import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// props:
// - showAddMenu, setShowAddMenu, tiles, setTiles, AVAILABLE_TILES
export default function AddModuleDropdown({ showAddMenu, setShowAddMenu, tiles, setTiles, AVAILABLE_TILES }) {
    const scrollRef = useRef(null);
    const [selectedTiles, setSelectedTiles] = useState([]);

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
                return {
                    id: uuidv4(),
                    type: tileData.type,
                    label: tileData.label,
                    icon: tileData.icon,
                    accent: tileData.accent,
                    iconColor: tileData.iconColor,
                };
            });

        if (newTiles.length > 0) setTiles((prev) => [...prev, ...newTiles]);
        setSelectedTiles([]);
        setShowAddMenu(false)
    };

    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const onMouseDown = (e) => {
        isDragging.current = true;
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft.current = scrollRef.current.scrollLeft;
    };
    const onMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5;
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };
    const onMouseUp = () => (isDragging.current = false);
    const onMouseLeave = () => (isDragging.current = false);

    return (
        <>
            <div
                className={`fixed inset-0 z-40 transition-all duration-200 ${showAddMenu
                    ? "bg-black/25 backdrop-blur-sm opacity-100"
                    : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setShowAddMenu(false)}
            />

            <div
                className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl
                    transition-transform duration-300 ease-out
                    ${showAddMenu ? "translate-y-0" : "translate-y-full"}`}
                style={{ height: "70vh" }}
            >
                <div className="flex justify-center pt-2 pb-1">
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                </div>

                <div className="flex justify-between items-center px-4 pb-3">
                    <h3 className="font-bold text-xl text-gray-800">Dodaj moduł</h3>
                    <button
                        onClick={() => setShowAddMenu(false)}
                        className="text-gray-400 hover:text-red-600 text-2xl cursor-pointer"
                    >
                        ×
                    </button>
                </div>

                <div
                    ref={scrollRef}
                    className="px-4 overflow-x-auto overflow-y-hidden cursor-grab select-none no-scrollbar"
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseLeave}
                >
                    <div className="grid grid-rows-2 grid-flow-col auto-cols-[160px] gap-10">
                        {AVAILABLE_TILES.map((tile) => {
                            const isAdded = tiles.some((t) => t.type === tile.type);
                            const isSelected = selectedTiles.includes(tile.type);

                            return (
                                <div
                                    key={tile.type}
                                    onClick={() => !isAdded && toggleTile(tile.type)}
                                    disabled={isAdded}
                                    className={` cursor-pointer
                                        group relative h-44 w-44 flex flex-col items-center justify-center
                                        rounded-2xl p-5 transition-all duration-300
                                        ${isAdded
                                            ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                                            : `bg-gray-50 hover:scale-[1.05] hover:shadow-lg
                                               ${isSelected ? "ring-4 ring-blue-400 ring-offset-2 ring-offset-gray-50" : ""}`
                                        }
                                    `}
                                >
                                    <tile.icon
                                        className={`h-12 w-12 mb-3 transition-transform duration-300
                                            ${isAdded ? "text-gray-400" : tile.iconColor}`}
                                    />
                                    <span className={`${isAdded ? "text-gray-400" : "text-gray-800"} text-sm font-medium text-center `}>
                                        {tile.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="sticky bottom-0 bg-white pt-4 pb-6 px-4 flex justify-center">
                    <button
                        onClick={addSelectedTiles}
                        disabled={selectedTiles.length === 0}
                        className="w-full md:w-auto px-8 py-3 rounded-full font-semibold
                                   bg-gradient-to-r from-blue-500 to-indigo-600 text-white
                                   shadow-lg hover:scale-[1.03] hover:shadow-xl
                                   disabled:from-gray-300 disabled:to-gray-300 disabled:text-gray-500
                                   transition-all duration-200 cursor-pointer"
                    >
                        Dodaj {selectedTiles.length > 0 ? `(${selectedTiles.length})` : ""}
                    </button>
                </div>
            </div>

        </>
    );
}