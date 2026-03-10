import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "../../Utils/ThemeToggle";
import ChangeFonts from "../../Utils/ChangeFonts";
export default function Settings() {
    return (
        <div className="color-transition relative inline-block text-left group w-full">

            <div
                className="color-transition absolute left-0 bottom-full w-64 color-transition
        opacity-0 invisible translate-y-2
        group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
        transition-all duration-200 ease-out
        rounded-xl shadow-lg border
        bg-white dark:bg-gray-900
        border-gray-200 dark:border-gray-700
        p-4 z-50"
            >
                <div className="flex flex-row justify-start items-center gap-4">
                    <div className="color-transition text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Motyw
                    </div>
                    <ThemeToggle />
                </div>

                <div className="flex flex-row justify-start items-center">
                    <div className="color-transition text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Wielkość czcionki
                    </div>
                    <ChangeFonts />
                </div>
            </div>

            <button
                className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-xl
        text-gray-700 dark:text-gray-200
        bg-transparent 
        hover:bg-gray-100 dark:hover:bg-gray-800
        transition-all duration-200 color-transition"
            >
                <Cog6ToothIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Ustawienia</span>
            </button>

        </div>
    );
}