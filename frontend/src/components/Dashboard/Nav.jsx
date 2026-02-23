import {
  HomeIcon,
  BuildingOffice2Icon,
  ChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { name: "Dashboard", icon: HomeIcon },
  { name: "Państwa", icon: BuildingOffice2Icon },
  { name: "Statystyki", icon: ChartBarIcon },
  { name: "Obywatele", icon: UsersIcon },
];

import { useUser } from "../../Contexts/UserContext";

export default function Sidebar() {
  const { user, logout } = useUser();

  return (
    <aside className="color-transition h-[101vh] w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between shadow-sm">

      {/* Logo */}
      <div>
        <div className="color-transition h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="color-transition text-xl font-bold text-gray-800 dark:text-gray-100">
            m<span className="text-blue-600">Państwo</span>
          </h1>
        </div>

        {/* Nawigacja */}
        <nav className="mt-6 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.name}
              className="cursor-pointer color-transition group w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="p-3 border-t border-gray-100 dark:border-gray-700 space-y-1">
        <button className="cursor-pointer color-transition w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-100 transition">
          <Cog6ToothIcon className="h-5 w-5" />
          <span className="text-sm font-medium">Ustawienia</span>
        </button>

        <button
          onClick={logout}
          className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:text-red-400 transition"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          <span className="text-sm font-medium">Wyloguj się</span>
        </button>
      </div>
    </aside>
  );
}