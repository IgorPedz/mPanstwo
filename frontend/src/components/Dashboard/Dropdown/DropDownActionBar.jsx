export default function DropDownActionBar({
  selectedTiles,
  addSelectedTiles,
}) {
  return (
    <div
      className={`
        absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%]

        bg-gray-900/95 dark:bg-white/95 backdrop-blur-xl
        rounded-2xl px-6 py-4 flex justify-between items-center

        transform-gpu will-change-transform
        transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]

        ${
          selectedTiles.length
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-95 pointer-events-none"
        }
      `}
    >

      <span className="text-white dark:text-black font-bold transition-colors duration-300">
        {selectedTiles.length} wybrane
      </span>

      <button
        onClick={addSelectedTiles}
        className="
          cursor-pointer
          bg-blue-600 hover:bg-blue-500
          text-white px-6 py-2 rounded-xl font-semibold

          transition-colors duration-300
        "
      >
        Dodaj
      </button>
    </div>
  );
}