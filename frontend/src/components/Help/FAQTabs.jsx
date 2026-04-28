import { useEffect, useRef, useState } from "react";

export default function FAQTabs({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const buttonsRef = useRef({});

  useEffect(() => {
    const activeEl = buttonsRef.current[activeCategory];
    if (!activeEl) return;

    setIndicatorStyle({
      width: activeEl.offsetWidth,
      transform: `translateX(${activeEl.offsetLeft}px)`,
    });
  }, [activeCategory, categories]);

  return (
    <div className="overflow-x-auto">
      <div className="relative flex border border-gray-200 dark:border-gray-800 rounded-full p-1 w-max">

        {/* ANIMOWANY BACKGROUND */}
        <div
          className="absolute top-1 bottom-1 left-1 bg-blue-500 rounded-full transition-all duration-200 ease-out"
          style={indicatorStyle}
        />

        {categories.map((cat) => (
          <button
            key={cat}
            ref={(el) => (buttonsRef.current[cat] = el)}
            onClick={() => setActiveCategory(cat)}
            className={`
              relative z-10 px-5 py-2 text-sm font-medium whitespace-nowrap rounded-full
              transition-colors duration-200 cursor-pointer
              ${
                activeCategory === cat
                  ? "text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}