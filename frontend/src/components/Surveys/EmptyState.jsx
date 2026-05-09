import { motion } from "framer-motion";
import ICON_MAP from "../../Utils/Maps/Icons";

export default function EmptyState({ onRefetch, variant = "active" }) {
  const DocumentIcon = ICON_MAP["documentcheck"];

  const config = {
    active: {
      title: "Brak aktywnych ankiet",
      desc: "Aktualnie nie mamy nowych ankiet. Wróć później po kolejne wyzwania i punkty.",
    },
    archive: {
      title: "Brak historii odpowiedzi",
      desc: "Nie brałeś jeszcze udziału w żadnej ankiecie.",
    },
    expired: {
      title: "Brak zakończonych ankiet",
      desc: "Nie znaleziono ankiet, które już się zakończyły.",
    },
  }[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        color-transition
        flex flex-col items-center justify-center
        py-24
        rounded-[3.5rem]
        border-2 border-dashed
        border-slate-200 dark:border-slate-800
        bg-slate-50/30 dark:bg-slate-900/20
      "
    >
      {/* ICON */}
      <div className="relative mb-8">
        <div className="bg-blue-600/10 p-8 rounded-[2.5rem] color-transition">
          <DocumentIcon className="h-12 w-12 text-blue-500" />
        </div>

        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
      </div>

      {/* TITLE */}
      <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight text-center">
        {config.title}
      </h2>

      {/* DESC */}
      <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-[280px] text-center text-sm font-medium leading-relaxed">
        {config.desc}
      </p>

      {/* BUTTON */}
      {onRefetch && (
        <motion.button
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRefetch}
          className="
            color-transition
            mt-8 px-8 py-3
            bg-slate-900 dark:bg-white
            text-white dark:text-slate-900
            rounded-2xl
            font-black text-[10px] uppercase tracking-widest
            shadow-lg
            hover:shadow-xl hover:shadow-blue-500/10
            transition-all
            cursor-pointer
          "
        >
          Odśwież tablicę
        </motion.button>
      )}
    </motion.div>
  );
}