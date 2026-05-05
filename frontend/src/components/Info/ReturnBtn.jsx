import { ArrowLeftIcon } from "@heroicons/react/24/outline";
export default function returnBtn() {
    return (
        <div className="absolute top-6 left-6 z-20">
            <a
                href="/auth"
                className="flex items-center gap-2 px-4 py-2 rounded-full 
               bg-white/80 dark:bg-gray-900/80 backdrop-blur text-gray-800 dark:text-gray-200
               shadow-md hover:shadow-lg color-transition
               text-sm font-medium cursor-pointer"
            >
                <ArrowLeftIcon className="w-4 h-4" />
                Powrót
            </a>
        </div>
    )
}