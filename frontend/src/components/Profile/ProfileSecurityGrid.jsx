import { motion } from "framer-motion";
import { upwardItemVariants } from "../../Utils/Animations";
import VerifyEmailCard from "./Cards/VerifyEmailCard";

const ProfileSecurityGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <motion.div variants={upwardItemVariants} whileHover={{ y: -5 }}>
        <VerifyEmailCard/>
      </motion.div>
    </div>
  );
};

export default ProfileSecurityGrid;
