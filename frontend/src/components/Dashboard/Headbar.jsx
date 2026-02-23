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
        <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-end relative z-10">

            <nav className="hidden md:flex items-center gap-8">
                {menuItems.map((item) => (
                    <button
                        key={item.label}
                        onClick={item.onClick}
                        className="cursor-pointer flex items-center gap-2 font-medium text-gray-600  hover:text-blue-600 transition"
                    >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="md:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer">
                    {menuOpen ? (
                        <XMarkIcon className="h-7 w-7 text-gray-600 hover:text-blue-600" />
                    ) : (
                        <Bars3Icon className="h-7 w-7 text-gray-600 hover:text-blue-600" />
                    )}
                </button>
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.22 }}
                        className="absolute top-full right-0 w-full bg-white shadow-lg md:hidden"
                    >
                        {menuItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => {
                                    setMenuOpen(false);
                                }}
                                className="cursor-pointer flex items-center gap-2 w-full text-left px-6 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition"
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
