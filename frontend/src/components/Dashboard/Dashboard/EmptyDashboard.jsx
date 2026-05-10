import { motion } from "framer-motion";
import ICON_MAP from "../../../Utils/Maps/Icons";
import { containerVariants, itemVariants } from "../../../Utils/Animations";

export default function EmptyDashboard({ setShowAddMenu }) {
  const SparklesIcon = ICON_MAP["sparkles"];
  const RocketIcon = ICON_MAP["rocket"];
  const HeartIcon = ICON_MAP["heart"];

  return (
    <motion.div
      className="
        flex flex-col items-center justify-center
        min-h-[100dvh] w-full
        /* Kluczowe: Ukrywamy suwaki na poziomie kontenera */
        overflow-hidden fixed inset-0
        color-transition
      "
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* NOWY DYNAMICZNY BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* Efekt Gradientu Mesh */}
        <div className="absolute inset-0 opacity-40 dark:opacity-20 color-transition">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/50 dark:bg-indigo-600/20 blur-[120px] animate-pulse" />
          <div
            className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-200/50 dark:bg-blue-600/20 blur-[120px] animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>
      </div>

      <div className="relative z-10 text-center max-w-3xl px-6">
        {/* MAIN ICON */}
        <motion.div className="mb-10 inline-block" variants={itemVariants}>
          <motion.div
            className="
              relative w-24 h-24
              flex items-center justify-center
              rounded-[2rem]
              bg-slate-900 dark:bg-white
              text-white dark:text-slate-900
              shadow-2xl shadow-indigo-500/20
              color-transition
            "
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <SparklesIcon className="h-10 w-10" />
            {/* Delikatna poświata pod ikoną */}
            <div className="absolute inset-0 rounded-[2rem] bg-indigo-500/20 blur-xl -z-10" />
          </motion.div>
        </motion.div>

        {/* TYPOGRAPHY */}
        <div className="space-y-4 mb-12">
          <motion.h2
            className="
              text-5xl md:text-6xl
              font-black tracking-tight
              text-slate-900 dark:text-white
              color-transition
            "
            variants={itemVariants}
          >
            Zaprojektuj swój <span className="text-indigo-500">workflow</span>
          </motion.h2>

          <motion.p
            className="
              text-lg md:text-xl
              max-w-xl mx-auto
              text-slate-500 dark:text-slate-400
              leading-relaxed
              color-transition
            "
            variants={itemVariants}
          >
            Twój dashboard to czysta karta. Dodaj pierwsze narzędzia, aby zacząć
            budować swoją przestrzeń.
          </motion.p>
        </div>

        {/* FEATURES GRID */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
        >
          {[
            { icon: RocketIcon, text: "Szybki start" },
            { icon: SparklesIcon, text: "Customizacja" },
            { icon: HeartIcon, text: "Ulubione" },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="
                group p-8
                rounded-[2.5rem]
                border border-slate-200/50 dark:border-slate-800/50
                bg-white/40 dark:bg-slate-900/40
                backdrop-blur-md
                hover:bg-white dark:hover:bg-slate-800/60
                cursor-pointer
                transition-all duration-500
                color-transition
              "
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <feature.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-4 transition-transform group-hover:scale-110" />
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          onClick={() => setShowAddMenu(true)}
          className="
            relative group
            px-14 py-7
            rounded-2xl
            bg-slate-900 dark:bg-white
            text-white dark:text-slate-900
            font-black text-[13px] uppercase tracking-[0.2em]
            shadow-[0_20px_50px_rgba(0,0,0,0.2)]
            dark:shadow-[0_20px_50px_rgba(255,255,255,0.05)]
            cursor-pointer
            transition-all duration-300
            hover:scale-105 active:scale-95
            color-transition
          "
          variants={itemVariants}
        >
          <span className="relative z-10 flex items-center gap-2">
            Stwórz Dashboard <RocketIcon className="h-4 w-4" />
          </span>
          <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 rounded-2xl" />
        </motion.button>

        <motion.p
          className="mt-16 text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 opacity-50 color-transition"
          variants={itemVariants}
        >
          mPaństwo • v1.0.4
        </motion.p>
      </div>
    </motion.div>
  );
}
