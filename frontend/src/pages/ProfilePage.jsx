import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
    UserIcon,
    TrophyIcon,
    ChartBarIcon,
    BellIcon,
} from "@heroicons/react/24/outline";

import ProfileHero from "../components/Social/ProfileHero";
import Tabs from "../components/Social/SocialTab";
import ProfileCard from "../components/Social/ProfileCard";

const ProfilePage = () => {
    const [user, setUser] = useState({
        name: "Jan Kowalski",
        role: "Ekspert",
        email: "jan.kowalski@example.com",
    });

    const [activeTab, setActiveTab] = useState("profile");

    const tabs = [
        { id: "profile", name: "Profil", icon: UserIcon },
        { id: "achievements", name: "Osiągnięcia", icon: TrophyIcon },
        { id: "polls", name: "Ankiety", icon: ChartBarIcon },
        { id: "notifications", name: "Powiadomienia", icon: BellIcon },
    ];

    const stats = [
        { title: "Ustawy", value: 12, icon: ChartBarIcon, color: "indigo" },
        { title: "Komentarze", value: 34, icon: UserIcon, color: "emerald" },
        { title: "Powiadomienia", value: 5, icon: BellIcon, color: "amber" },
        { title: "Rola", value: user.role, icon: TrophyIcon, color: "purple" },
    ];

    const polls = [
        { id: 1, title: "Reforma podatkowa?", votes: 124 },
        { id: 2, title: "Ocena ustawy edukacyjnej", votes: 87 },
    ];

    const notifications = [
        { id: 1, title: "Ustawa przyjęta", desc: "Głosowanie zakończone" },
        { id: 2, title: "Posiedzenie Sejmu", desc: "Jutro 10:00" },
    ];

    return (
        <div className="p-6 space-y-6 min-h-screen bg-gray-50 dark:bg-gray-900 color-transition">

            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

            <AnimatePresence mode="wait">

                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 24, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -24, filter: "blur(4px)" }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="space-y-6"
                >

                    {activeTab === "profile" && (
                        <>
                            <ProfileHero user={user} setUser={setUser} />

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                                {stats.map((s, i) => (
                                    <ProfileCard key={i} {...s} />
                                ))}
                            </div>
                        </>
                    )}

                    {activeTab === "achievements" && (
                        <div className="text-gray-900 dark:text-white font-semibold">
                            🏆 Osiągnięcia
                        </div>
                    )}

                    {activeTab === "polls" && (
                        <div className="space-y-3">
                            {polls.map((p) => (
                                <div
                                    key={p.id}
                                    className="
              p-4 rounded-xl
              bg-white dark:bg-gray-900
              border border-gray-200 dark:border-gray-800
              text-gray-900 dark:text-white
              cursor-pointer
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition
              color-transition
            "
                                >
                                    {p.title} ({p.votes})
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "notifications" && (
                        <div className="space-y-3">
                            {notifications.map((n) => (
                                <div
                                    key={n.id}
                                    className="
              p-4 rounded-xl
              bg-white dark:bg-gray-900
              border border-gray-200 dark:border-gray-800
              cursor-pointer
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition
              color-transition
            "
                                >
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        {n.title}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {n.desc}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </motion.div>

            </AnimatePresence>
        </div>
    );
};

export default ProfilePage;