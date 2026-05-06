import { motion } from "framer-motion";
import { COLOR_MAP, GRADIENT_MAP } from "../../Utils/Maps/Colors";
import ICON_MAP from "../../Utils/Maps/Icons";
import { glowVariants } from "../../Utils/Animations";

const ProfileCard = ({ title, value, icon, color = "indigo" }) => {
  const textColor = COLOR_MAP[color] || COLOR_MAP.indigo;
  const gradient = GRADIENT_MAP[color] || GRADIENT_MAP.indigo;
  const ImportedIcon = ICON_MAP[icon] || ICON_MAP.stats;

  return (
    <motion.div
      className="
    group relative overflow-hidden rounded-2xl
    border border-gray-200 dark:border-gray-800
    bg-white dark:bg-gray-900/60
    backdrop-blur
    p-6
    shadow-sm
    cursor-pointer
    color-transition
  "
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <motion.div
        className={`
          absolute -top-12 -right-12 h-36 w-36
          rounded-full blur-3xl
          bg-gradient-to-br ${gradient}
          opacity-50
        `}
        variants={glowVariants}
        animate="animate"
      />

      <div
        className="
    absolute inset-0
    opacity-0 group-hover:opacity-100
    transition-opacity duration-500
    bg-black/5 dark:bg-white/5
    color-transition
  "
      />

      <div className="relative flex items-center gap-4 color-transition">
        <motion.div
          className="
            flex h-11 w-11 items-center justify-center
            rounded-xl
            bg-gray-100 dark:bg-gray-800
            color-transition
          "
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <ImportedIcon className={`h-6 w-6 ${textColor} color-transition`} />
        </motion.div>

        <div className="color-transition">
          <p className="text-xs text-gray-500 dark:text-gray-400 color-transition">
            {title}
          </p>

          <motion.p
            className="text-xl font-bold text-gray-900 dark:text-white color-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {value}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
