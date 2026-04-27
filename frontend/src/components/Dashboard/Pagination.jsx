export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        disabled={currentPage === 0}
        onClick={() => setCurrentPage(p => Math.max(p - 1, 0))}
        className="color-transition cursor-pointer px-4 py-2 bg-blue-200 dark:bg-blue-900 text-lg dark:text-blue-200 rounded hover:bg-blue-300 dark:hover:bg-blue-700 disabled:opacity-50 transition"
      >{"<"}</button>

      <span className="color-transition px-4 py-2 text-gray-800 dark:text-gray-200 text-lg">{currentPage + 1} / {totalPages}</span>

      <button
        disabled={currentPage === totalPages - 1}
        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages - 1))}
        className="color-transition cursor-pointer px-4 py-2 bg-blue-200 dark:bg-blue-900 text-lg dark:text-blue-200 rounded hover:bg-blue-300 dark:hover:bg-blue-700 disabled:opacity-50 transition"
      >{">"}</button>
    </div>
  );
}