import { motion } from "framer-motion";

const SocialTab = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="flex justify-center">
      <div className="relative flex gap-1 overflow-x-auto px-2 py-2 max-w-full">

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
                transition-colors

                ${
                  active
                    ? "text-blue-600 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }
              `}
            >
              {/* animated highlight */}
              {active && (
                <motion.div
                  layoutId="tab-highlight"
                  className="
                    absolute inset-0
                    rounded-lg
                    bg-black/5 dark:bg-white/5
                    pointer-events-none
                  "
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                />
              )}

              <span className="relative z-10 flex items-center gap-2">
                <Icon
                  className={`
                    h-4 w-4
                    ${
                      active
                        ? "text-blue-600 dark:text-blue-300"
                        : ""
                    }
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