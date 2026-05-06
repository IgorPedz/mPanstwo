import { motion } from "framer-motion";
import { useUser } from "../../Contexts/UserContext";
import useProfile from "../../Hooks/useProfile";

import ProfileHero from "../../components/Profile/ProfileHero";
import ProfileCard from "../../components/Profile/ProfileCard";
import ChangeEmailCard from "../../components/Profile/Cards/ChangeEmailCard";
import ChangePasswordCard from "../../components/Profile/Cards/ChangePasswordCard";
import DeleteAccountCard from "../../components/Profile/Cards/DeleteAccountCard";
import ChangeNameCard from "../../components/Profile/Cards/ChangeNameCard";
import SettingsSection from "../../components/Profile/ProfileSettingsContainer";
import { stats } from "../../components/Profile/ProfileData";
import { pageVariants, itemVariants } from "../../Utils/Animations";

const ProfilePage = () => {
  const { user: authUser } = useUser();

  const { profile, updateProfile, changeEmail, changePassword, deleteAccount } =
    useProfile(authUser?.id);

  return (
    <motion.div
      className="relative p-6 min-h-screen overflow-hidden color-transition"
      variants={pageVariants}
      initial="hidden"
      animate="show"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-200 dark:bg-cyan-900/30 rounded-full blur-3xl opacity-20 dark:opacity-10" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-200 dark:bg-violet-900/30 rounded-full blur-3xl opacity-20 dark:opacity-10" />
      </div>

      <div className="relative z-10 space-y-12">
        <motion.div variants={itemVariants}>
          <ProfileHero user={profile} updateProfile={updateProfile} />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={pageVariants}
        >
          {stats.map((s, i) => (
            <motion.div key={i} variants={itemVariants}>
              <ProfileCard {...s} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={pageVariants} className="space-y-6">
          <motion.div variants={itemVariants}>
            <h2
              className="
              text-2xl md:text-3xl font-semibold
              bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500
              bg-clip-text text-transparent
            "
            >
              Ustawienia konta
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Zarządzaj swoimi danymi i bezpieczeństwem
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <SettingsSection>
              <ChangeNameCard profile={profile} updateProfile={updateProfile} />
              <ChangeEmailCard changeEmail={changeEmail} />
              <ChangePasswordCard changePassword={changePassword} />
              <DeleteAccountCard deleteAccount={deleteAccount} />
            </SettingsSection>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
