function AddTile({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600
        rounded-xl shadow-sm p-5
        flex flex-col items-center justify-center
        hover:shadow-lg hover:-translate-y-1
        hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900
        transition-all duration-200 color-transition
        cursor-pointer
      "
    >
      <div className="text-4xl text-blue-700 dark:text-blue-400 color-transition">+</div>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 color-transition">
        Dodaj moduł
      </p>
    </div>
  );
}

export default AddTile;