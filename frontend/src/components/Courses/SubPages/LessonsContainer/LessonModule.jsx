import { motion } from "framer-motion";

export default function LessonModule({ module, onNext }) {
  const content =
    typeof module.content === "string"
      ? JSON.parse(module.content)
      : module.content;

  return (
    <div className="min-h-screen flex items-center justify-center p-6  transition-colors duration-300 color-transition">
      <div className="w-full max-w-2xl relative group">
        
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4, scale: 1.005 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 24,
            opacity: { duration: 0.3 } 
          }}
          className="
            relative
            w-full
            rounded-3xl
            border
            border-slate-200/80 dark:border-slate-800/80
            bg-white/90 dark:bg-slate-900/90
            backdrop-blur-md
            shadow-xl shadow-slate-100 dark:shadow-black/40
            p-8 sm:p-10
            transition-colors duration-300 color-transition
          "
        >
          <h2 className="
            text-2xl sm:text-3xl font-black mb-5
            text-slate-900 dark:text-slate-50
            tracking-tight leading-tight
          ">
            {content.title}
          </h2>

          <p className="
            text-base sm:text-[17px] leading-8
            text-slate-600 dark:text-slate-300/90
            font-normal
          ">
            {content.text}
          </p>

          <div className="w-full h-px bg-slate-100 dark:bg-slate-800/60 my-8" />

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="
                text-[10px] font-black
                text-slate-400 dark:text-slate-500
                uppercase tracking-[0.15em]
              ">
                moduł lekcji
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Wprowadzenie
              </span>
            </div>

            {/* PRZYCISK DALEJ */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onNext}
              className="
                px-6 py-3.5
                rounded-2xl
                font-black text-sm
                text-white
                bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
                hover:shadow-xl hover:shadow-indigo-500/20
                transition-shadow duration-300 color-transition
                cursor-pointer
                flex items-center gap-2
              "
            >
              Dalej 
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </motion.button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}