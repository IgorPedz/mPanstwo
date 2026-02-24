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

            <select
                value={fontSize}
                onChange={(e) => handleFontChange(e.target.value)}
                className="color-transition cursor-pointer px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            >
                <option value="text-sm">Mała</option>
                <option value="text-base">Średnia</option>
                <option value="text-lg">Duża</option>
                <option value="text-xl">Bardzo duża</option>
            </select>

        </div>
        
    );
}