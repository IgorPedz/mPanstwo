import ICON_MAP from "../../Utils/Maps/Icons";

export default function NavSections({
  NavData,
  openSections,
  toggleSection,
  location,
  navigate,
}) {
  const ChevronDownIcon = ICON_MAP["dropdown"];

  return (
    <>
      {NavData.map((section) => {
        const isOpen = openSections[section.title];

        return (
          <div key={section.title}>
            <button
              onClick={() => toggleSection(section.title)}
              className="cursor-pointer w-full flex items-center justify-between px-4 py-2 text-xs font-semibold uppercase text-gray-400 hover:text-gray-600 transition-colors"
            >
              {section.title}
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-1 mt-1">
                {section.items.map((item) => {
                  const Icon = ICON_MAP[item.icon];
                  if (!Icon) return null;

                  const active = location.pathname === item.href;

                  return (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.href)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-xl
                        color-transition cursor-pointer

                        ${
                          active
                            ? "text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-gray-800/50"
                            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        }
                      `}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-sm font-medium">
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}