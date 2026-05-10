import { motion } from "framer-motion";
import { useUser } from "../../Contexts/UserContext";
import useProfile from "../../Hooks/useProfile";

import ProfileHero from "../../components/Profile/ProfileHero";
import ProfileStatsGrid from "../../components/Profile/ProfileStatsGrid";
import ProfileSettingsGrid from "../../components/Profile/ProfileSettingsGrid";
import ProfileHeader from "../../components/Profile/ProfileHeader";

import { containerVariants } from "../../Utils/Animations";

export default function ProfilePage() {
  const { user: authUser } = useUser();

  const userId = authUser?.id;

  const {
    profile,
    loading,
    updateProfile,
    changeEmail,
    changePassword,
    deleteAccount,
  } = useProfile(userId);

  if (!userId || loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-slate-400 color-transition">
        Ładowanie profilu...
      </div>
    );
  }
  return (
    <motion.div
      className="w-full min-h-screen py-8 px-4 md:px-8 color-transition"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div className="max-w-[1800px] mx-auto">

        <ProfileHeader />

        <ProfileHero
          profile={profile || {}}
          authUser={authUser}
        />

        {/* 🔥 SAFE STATS */}
        <ProfileStatsGrid stats={profile?.stats || []} />

        <header className="flex justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 color-transition">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter color-transition">
              Parametry Systemowe
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium color-transition">
              Zarządzaj dostępem i tożsamością wewnątrz systemu
            </p>
          </div>
        </header>

        <ProfileSettingsGrid
          profile={profile || {}}
          updateProfile={updateProfile}
          changeEmail={changeEmail}
          changePassword={changePassword}
          deleteAccount={deleteAccount}
        />

      </div>
    </motion.div>
  );
} 