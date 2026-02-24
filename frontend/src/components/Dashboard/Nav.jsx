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

import Settings from "../Global/Settings";
import LogOut from "../Global/LogOut";
import Logo from "../Global/Logo"

export default function Sidebar() {

  return (
    <aside className="color-transition h-[101vh] w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between shadow-sm">

      <div>
        <Logo />

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

        <Settings />

        <LogOut />

      </div>
    </aside>
  );
}