import ModuleTile from "./DropDownTiles";

export default function DropDownGrid({
  AVAILABLE_TILES,
  tiles,
  selectedTiles,
  toggleTile,
}) {
  return (
    <div className="px-8 pt-6 overflow-y-auto h-[calc(85vh-140px)] pb-40">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {AVAILABLE_TILES.map((tile) => (
          <ModuleTile
            key={tile.type}
            tile={tile}
            isAdded={tiles.some((t) => t.type === tile.type)}
            isSelected={selectedTiles.includes(tile.type)}
            onClick={() => toggleTile(tile.type)}
          />
        ))}
      </div>
    </div>
  );
}