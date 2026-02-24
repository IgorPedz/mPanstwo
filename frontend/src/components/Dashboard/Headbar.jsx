import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
    Bars3Icon,
    XMarkIcon,
    UserIcon,
    InboxIcon,
    TrophyIcon,
} from "@heroicons/react/24/outline";

export default function Headbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const menuItems = [
        { label: "Moje konto", icon: UserIcon },
        { label: "Skrytka ankiet", icon: InboxIcon },
        { label: "Osiągnięcia", icon: TrophyIcon },
    ];

    return (
        <header className="color-transition w-full bg-white dark:bg-gray-900 shadow-md px-6 py-5 flex items-center justify-end relative z-10 text-gray-900 dark:text-gray-100">

                <nav className="hidden md:flex items-center gap-8">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={item.onClick}
                            className="color-transition cursor-pointer flex items-center gap-2 font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Mobile toggle button */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer">
                        {menuOpen ? (
                            <XMarkIcon className="h-7 w-7 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" />
                        ) : (
                            <Bars3Icon className="h-7 w-7 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" />
                        )}
                    </button>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.22 }}
                            className="color-transition absolute top-full right-0 w-full bg-white dark:bg-gray-900 shadow-lg md:hidden"
                        >
                            {menuItems.map((item) => (
                                <button
                                    key={item.label}
                                    onClick={() => setMenuOpen(false)}
                                    className="cursor-pointer flex items-center gap-2 w-full text-left px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.label}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
        </header>
    );
}