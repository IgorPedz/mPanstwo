import { motion } from "framer-motion";

const SocialTab = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="
      flex justify-center
      bg-white dark:bg-gray-900
      color-transition
    ">
      <div className="
        relative flex gap-1 overflow-x-auto
        px-2 py-2 max-w-full
        color-transition
      ">

        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative flex items-center gap-2
                px-4 py-2 rounded-lg
                text-sm font-medium
                whitespace-nowrap shrink-0
                cursor-pointer

                transition-all duration-200
                color-transition

                ${active
                  ? "bg-blue-100 dark:bg-gray-800 text-blue-700 dark:text-blue-300"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }
              `}
            >
              {/* subtle motion highlight layer */}
              {active && (
                <motion.div
                  layoutId="tab-highlight"
                  className="
                    absolute inset-0
                    rounded-lg
                    bg-blue-200/40 dark:bg-blue-500/10
                    pointer-events-none
                  "
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                />
              )}

              <span className="relative z-10 flex items-center gap-2 color-transition">
                <Icon
                  className={`
                    h-4 w-4 cursor-pointer
                    color-transition
                    ${active ? "text-blue-700 dark:text-blue-300" : ""}
                  `}
                />
                {tab.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SocialTab;