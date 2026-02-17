import {
  HomeIcon,
  BuildingOffice2Icon,
  ChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { name: "Dashboard", icon: HomeIcon },
  { name: "Państwa", icon: BuildingOffice2Icon },
  { name: "Statystyki", icon: ChartBarIcon },
  { name: "Obywatele", icon: UsersIcon },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between shadow-sm">
      
      {/* Góra */}
      <div>
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800">
            m<span className="text-blue-600">Państwo</span>
          </h1>
        </div>

        <nav className="mt-6 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.name}
              className="cursor-pointer group w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Dół */}
      <div className="p-3 border-t border-gray-100 space-y-1">
        <button className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition">
          <UserCircleIcon className="h-5 w-5" />
          <span className="text-sm font-medium">Moje konto</span>
        </button>

        <button className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition">
          <Cog6ToothIcon className="h-5 w-5" />
          <span className="text-sm font-medium">Ustawienia</span>
        </button>

        <button className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition">
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          <span className="text-sm font-medium">Wyloguj się</span>
        </button>
      </div>
    </aside>
  );
}
