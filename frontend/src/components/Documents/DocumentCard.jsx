import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export default function DocumentCard({ title, description, icon, badge, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        group relative cursor-pointer rounded-2xl
        border border-gray-200 dark:border-gray-800
        p-6 color-transition
        hover:bg-gray-50 dark:hover:bg-gray-900
        hover:border-gray-300 dark:hover:border-gray-700
        hover:shadow-lg dark:hover:shadow-gray-900/50
        transition-all duration-300
      "
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="color-transition p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
            {icon}
          </div>
          <h2 className="text-xl font-semibold color-transition group-hover:text-blue-500 dark:group-hover:text-blue-400">
            {title}
          </h2>
        </div>
        {badge && (
          <span className="
            px-3 py-1 rounded-full text-xs font-semibold
            border border-gray-200 dark:border-gray-800
            text-gray-600 dark:text-gray-300
            color-transition
            group-hover:bg-gray-100 dark:group-hover:bg-gray-800
          ">
            {badge}
          </span>
        )}
      </div>
      <p className="text-gray-600 dark:text-gray-400 color-transition">
        {description}
      </p>
      <ArrowTopRightOnSquareIcon className="
        absolute top-6 right-6 w-5 h-5 
        text-gray-400 opacity-0 
        group-hover:opacity-100 group-hover:text-blue-500
        transition-all duration-300
      " />
    </div>
  );
}