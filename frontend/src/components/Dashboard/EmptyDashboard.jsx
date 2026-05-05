import { motion } from "framer-motion";
import ICON_MAP from "../../Utils/Icons";

export default function EmptyDashboard({ setShowAddMenu }) {
  const SparklesIcon = ICON_MAP["sparkles"];
  const RocketIcon = ICON_MAP["rocket"];
  const HeartIcon = ICON_MAP["heart"];

  const DummyIcon = ({ className }) => <div className={className} />;

  const safeSparklesIcon = SparklesIcon || DummyIcon;
  const safeRocketIcon = RocketIcon || DummyIcon;
  const safeHeartIcon = HeartIcon || DummyIcon;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[600px] relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-200 dark:bg-cyan-900/30 rounded-full blur-3xl opacity-20 dark:opacity-10" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-200 dark:bg-violet-900/30 rounded-full blur-3xl opacity-20 dark:opacity-10" />
      </motion.div>

      <div className="relative z-10 text-center max-w-2xl px-4 mt-10">
        <motion.div className="mb-8 inline-block relative" variants={itemVariants}>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full blur-lg opacity-75"
            variants={pulseVariants}
            animate="animate"
          />
          <div className="relative bg-gradient-to-br from-cyan-500 to-violet-600 p-8 rounded-full shadow-2xl">
            <motion.div animate="animate" variants={floatingVariants}>
              <safeSparklesIcon className="h-16 w-16 text-white" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h2
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500 dark:from-cyan-400 dark:via-violet-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4"
          variants={itemVariants}
        >
          Witaj na swoim dashboardzie!
        </motion.h2>

        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
          variants={itemVariants}
        >
          Twój dashboard jest pusty. Czas go wypełnić! Dodaj moduły, które będą dla Ciebie przydatne i stwórz idealny pulpit kontrolny.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          variants={containerVariants}
        >
          {[
            { icon: safeRocketIcon, text: "Szybki dostęp" },
            { icon: safeSparklesIcon, text: "Personalizacja" },
            { icon: safeHeartIcon, text: "Ulubione" },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="color-transition bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <feature.icon className="h-8 w-8 text-cyan-500 dark:text-cyan-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          onClick={() => setShowAddMenu(true)}
          className="cursor-pointer relative px-10 py-4 font-semibold text-lg text-white rounded-xl overflow-hidden group"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500 dark:from-cyan-600 dark:via-violet-600 dark:to-cyan-600" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-violet-600 to-cyan-600 dark:from-cyan-700 dark:via-violet-700 dark:to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%", opacity: 0.3 }}
            transition={{ duration: 0.5 }}
          />

          <span className="relative flex items-center justify-center gap-2">
            Dodaj pierwszy moduł
            <motion.svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </motion.svg>
          </span>
        </motion.button>

        <motion.p
          className="mt-8 text-sm text-gray-500 dark:text-gray-400"
          variants={itemVariants}
        >
          Możesz zawsze zmienić lub usunąć moduły później
        </motion.p>
      </div>
    </motion.div>
  );
}