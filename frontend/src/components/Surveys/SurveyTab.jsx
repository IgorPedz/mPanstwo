import { motion } from "framer-motion";

export default function Tabs({ labels, tab, setTab }) {
  const tabs = ["active", "expired", "archive"];

  return (
    <div
      className="
        w-fit p-1.5
        flex items-center gap-1
        rounded-[1.5rem]
        bg-slate-50 dark:bg-slate-900/50
        border-2 border-slate-100 dark:border-slate-800
        color-transition
      "
    >
      {tabs.map((t) => {
        const isActive = tab === t;

        return (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`
              relative px-6 py-2.5
              rounded-[1.1rem]
              text-[10px] font-black uppercase tracking-widest
              transition-colors duration-300
              cursor-pointer outline-none
              color-transition
              ${isActive
                ? "text-white dark:text-slate-900"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              }
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="
                  absolute inset-0
                  rounded-[1.1rem]
                  bg-slate-900 dark:bg-white
                  z-0 color-transition
                "
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.6,
                }}
              />
            )}

            <span className="relative z-10">
              {labels[t]}
            </span>
          </button>
        );
      })}
    </div>
  );
}