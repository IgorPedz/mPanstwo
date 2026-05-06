import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function ProfileSettingsContainer({ children }) {
  return (
    <motion.div
      className="
        relative rounded-2xl
        border border-gray-200 dark:border-gray-800
        bg-white/70 dark:bg-gray-900/60
        backdrop-blur-xl
        shadow-sm
        overflow-hidden
        color-transition
      "
      initial="hidden"
      animate="visible"
    >
      <div className="h-[2px] w-full bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500" />

      <div className="divide-y divide-gray-200 dark:divide-gray-800 flex gap-2 flex-col p-6 color-transition">
        {children.map((child, i) => (
          <motion.div key={i} variants={itemVariants} className="color-transition">
            {child}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}