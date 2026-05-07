import { motion } from "framer-motion";
import { upwardItemVariants } from "../../Utils/Animations";
import ChangeNameCard from "./Cards/ChangeNameCard";
import ChangeEmailCard from "./Cards/ChangeEmailCard";
import ChangePasswordCard from "./Cards/ChangePasswordCard";
import DeleteAccountCard from "./Cards/DeleteAccountCard";

const ProfileSettingsGrid = ({ profile, updateProfile, changeEmail, changePassword, deleteAccount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div variants={upwardItemVariants} whileHover={{ y: -5 }}>
        <ChangeNameCard profile={profile} updateProfile={updateProfile} />
      </motion.div>

      <motion.div variants={upwardItemVariants} whileHover={{ y: -5 }}>
        <ChangeEmailCard changeEmail={changeEmail} />
      </motion.div>

      <motion.div variants={upwardItemVariants} whileHover={{ y: -5 }}>
        <ChangePasswordCard changePassword={changePassword} />
      </motion.div>

      <motion.div variants={upwardItemVariants} whileHover={{ y: -5 }}>
        <DeleteAccountCard deleteAccount={deleteAccount} />
      </motion.div>
    </div>
  );
};

export default ProfileSettingsGrid;