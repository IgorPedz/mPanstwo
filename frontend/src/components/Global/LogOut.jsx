import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useUser } from "../../Contexts/UserContext";

export default function Settings() {
    const { user, logout} = useUser()
    return (
        <button
          onClick={logout}
          className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:text-red-400 transition"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          <span className="text-sm font-medium">Wyloguj się</span>
        </button>
    );
}