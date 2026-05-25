import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useUser } from "../../Contexts/UserContext";
import useProfile from "../../Hooks/useProfile";

import ProfileHero from "../../components/Profile/ProfileHero";
import ProfileStatsGrid from "../../components/Profile/ProfileStatsGrid";
import ProfileSettingsGrid from "../../components/Profile/ProfileSettingsGrid";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileSecurityGrid from "../../components/Profile/ProfileSecurityGrid";

import { containerVariants } from "../../Utils/Animations";
import LoadingSpinner from "../../components/Global/LoadingSpinner";

export default function ProfilePage() {
  const { t } = useTranslation();
  const { user: authUser } = useUser();
  const userId = authUser?.id;

  const {
    profile,
    loading: profileLoading,
    updateProfile,
    changeEmail,
    changePassword,
    deleteAccount,
  } = useProfile(userId);

  if (!userId || profileLoading) {
    return <LoadingSpinner />;
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

        <ProfileHero profile={profile || {}} authUser={authUser} />

        <ProfileStatsGrid stats={profile?.stats || []} />

        <header className="color-transition flex justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 color-transition">
          <div>
            <h2 className="color-transition text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              {t("profile.systemParams")}
            </h2>
            <p className="color-transition text-slate-500 dark:text-slate-400 font-medium">
              {t("profile.manageAccess")}
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

        <header className="color-transition flex justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 mt-8">
          <div>
            <h2 className="color-transition text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              {t("profile.accountSecurity")}
            </h2>
            <p className="color-transition text-slate-500 dark:text-slate-400 font-medium">
              {t("profile.manageSecurity")}
            </p>
          </div>
        </header>

        <ProfileSecurityGrid/>
      </div>
    </motion.div>
  );
}
