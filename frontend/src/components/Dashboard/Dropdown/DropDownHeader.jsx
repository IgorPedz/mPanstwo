import { XMarkIcon } from "@heroicons/react/24/solid";

export default function DropDownHeader({ setShowAddMenu }) {
  return (
    <div className="color-transition px-8 pt-6 pb-4 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
      <h2 className="text-2xl font-bold dark:text-white color-transition">
        DODAJ MODUŁ
      </h2>

      <button
        onClick={() => setShowAddMenu(false)}
        className="color-transition cursor-pointer text-red-400 hover:text-red-500 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
      >
        <XMarkIcon className="w-6 h-6" />
      </button>
    </div>
  );
}