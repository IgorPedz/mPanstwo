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
            className="
                cursor-pointer relative w-20 h-10 flex items-center
                bg-gray-300 dark:bg-gray-700
                rounded-full p-1 shadow-lg
                focus:outline-none
                color-transition
            "
            aria-label="Toggle Dark Mode"
        >

            <div
                className={`
                    absolute top-1 left-1 w-8 h-8
                    bg-white dark:bg-gray-200
                    rounded-full shadow-md
                    transform
                    smooth-transform color-transition

                    ${darkMode ? "translate-x-10" : "translate-x-0"}
                `}
            />

            <SunIcon
                className={`
                    w-6 h-6 absolute left-2 top-1/2 -translate-y-1/2
                    color-transition
                    ${darkMode ? "opacity-0.3 scale-75" : "opacity-100 scale-100 text-yellow-400"}
                    transition-all duration-300 ease-in-out
                `}
            />

            <MoonIcon
                className={`
                    w-6 h-6 absolute right-2 top-1/2 -translate-y-1/2
                    color-transition
                    ${darkMode ? "opacity-100 scale-100 text-gray-900" : "opacity-0.3 scale-75"}
                    transition-all duration-300 ease-in-out
                `}
            />

        </button>
    );
};

export default ThemeToggle;