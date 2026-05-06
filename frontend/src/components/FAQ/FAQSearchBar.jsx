import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar({ value, onChange, placeholder = "Szukaj pytania..." }) {
  return (
    <div className="relative w-full md:w-80">
      <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full pl-11 pr-4 py-3 rounded-2xl
          border border-gray-200 dark:border-gray-800
          bg-transparent text-gray-800 dark:text-gray-200
          outline-none
          focus:border-blue-500 dark:focus:border-blue-400
          transition-colors
        "
      />
    </div>
  );
}