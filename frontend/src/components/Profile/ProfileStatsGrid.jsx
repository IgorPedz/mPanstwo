import { motion } from "framer-motion";
import ProfileCard from "./ProfileCard";
import { upwardItemVariants } from "../../Utils/Animations";

const ProfileStatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {stats.map((stat, index) => (
        <motion.div key={index} variants={upwardItemVariants} whileHover={{ y: -5 }}>
          <ProfileCard {...stat} />
        </motion.div>
      ))}
    </div>
  );
};

export default ProfileStatsGrid;