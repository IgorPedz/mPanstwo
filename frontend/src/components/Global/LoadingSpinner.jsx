import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-6 color-transition">
      <motion.div
        className="flex gap-3"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-3 h-3 rounded-full bg-indigo-500"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          />
        ))}
      </motion.div>

      <motion.p
        className="text-slate-500 dark:text-slate-400 text-sm font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Ładowanie...
      </motion.p>
    </div>
  );
}
