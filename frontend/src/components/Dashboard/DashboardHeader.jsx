import { useEffect, useState } from "react";
import { useUser } from "../../Contexts/UserContext";
import ICON_MAP from "../../Utils/Icons";

export default function WelcomeDashboard({
  isLocked,
  setIsLocked,
  hasUnsavedChanges,
  saveLayout,
  setShowAddMenu,
  showAddMenu,
}) {
  const { user } = useUser();

  const LockOpened = ICON_MAP["lockOpened"];
  const LockClosed = ICON_MAP["lockClosed"];

  // 💾 sync do localStorage
  useEffect(() => {
    localStorage.setItem("layout-locked", JSON.stringify(isLocked));
  }, [isLocked]);

  const toggleLock = () => {
    setIsLocked((prev) => {
      const next = !prev;

      // 🔥 zapis przy odblokowaniu
      if (!next && hasUnsavedChanges) {
        saveLayout();
      }

      return next;
    });

    if (showAddMenu) {
      setShowAddMenu(false);
    }
  };

  return (
    <div className="flex justify-between mb-5">
      <p
        className="text-3xl md:text-4xl text-blue-900 dark:text-blue-400 animate-text-pulse"
        style={{ fontFamily: "'Patrick Hand', cursive" }}
      >
        Witaj, {user?.name}!
      </p>

      <button
        type="button"
        onClick={toggleLock}
        aria-label={isLocked ? "Odblokuj edycję" : "Zablokuj edycję"}
        className={`inline-flex items-center justify-center rounded-full border px-3 py-3 shadow-sm transition-colors duration-200 cursor-pointer ${
          isLocked
            ? "border-blue-300 bg-white text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-blue-900"
            : "border-blue-300 bg-white text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-blue-900"
        }`}
      >
        {isLocked ? (
          <LockClosed className="h-5 w-5" />
        ) : (
          <LockOpened className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}