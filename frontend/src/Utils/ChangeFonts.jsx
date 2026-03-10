import { useState, useEffect } from "react";

export default function ChangeFonts() {
    const [fontSize, setFontSize] = useState("text-base");

    useEffect(() => {
        const savedFont = localStorage.getItem("fontSize");

        if (savedFont) {
            setFontSize(savedFont);
            document.documentElement.classList.add(savedFont);
        }
    }, []);

    const handleFontChange = (size) => {
        document.documentElement.classList.remove(
            "text-sm",
            "text-base",
            "text-lg",
            "text-xl"
        );

        document.documentElement.classList.add(size);
        setFontSize(size);
        localStorage.setItem("fontSize", size);
    };

    return (
        <div className="color-transition flex items-center gap-4 p-4 rounded-xl dark:text-white transition-all duration-300">

            <div className="relative inline-block w-30">
                <select
                    value={fontSize}
                    onChange={(e) => handleFontChange(e.target.value)}
                    className="appearance-none cursor-pointer px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 color-transition"
                >
                    <option value="text-sm">Mała</option>
                    <option value="text-base">Średnia</option>
                    <option value="text-lg">Duża</option>
                    <option value="text-xl">Bardzo duża</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
            </div>

        </div>

    );
}