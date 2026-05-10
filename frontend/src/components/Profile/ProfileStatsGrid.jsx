import { motion } from "framer-motion";
import ProfileCard from "./ProfileCard";
import { upwardItemVariants } from "../../Utils/Animations";

const ProfileStatsGrid = ({ stats = [] }) => {
  const normalized = stats.map((s) => ({
    title: s.title,
    value: s.valueNumber ?? s.valueText,
    icon: s.icon,
    color: s.color,
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {normalized.map((stat) => (
        <ProfileCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default ProfileStatsGrid;