import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem("darkMode") === "true";
        setDarkMode(savedMode);
        document.documentElement.classList.toggle("dark", savedMode);
    }, []);

    const toggleDarkMode = () => {
        setDarkMode((prev) => {
            const newMode = !prev;
            localStorage.setItem("darkMode", newMode);
            document.documentElement.classList.toggle("dark", newMode);
            return newMode;
        });
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="cursor-pointer relative w-20 h-10 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 shadow-lg transition-colors focus:outline-none color-transition"
            aria-label="Toggle Dark Mode"
        >
            <div
                className={`absolute top-1 left-1 w-8 h-8 bg-white dark:bg-gray-200 rounded-full shadow-md transform transition-transform duration-300 ease-in-out color-transition ${darkMode ? "translate-x-10" : "translate-x-0"
                    }`}
            ></div>

            <SunIcon className="w-6 h-6 text-yellow-400 absolute left-2 top-1/2 -translate-y-1/2 dark:text-gray-100 color-transition" />
            <MoonIcon className="w-6 h-6 text-gray-900 dark:text-black-100 absolute right-2 top-1/2 -translate-y-1/2 color-transition" />
        </button>
    );
};

export default ThemeToggle;