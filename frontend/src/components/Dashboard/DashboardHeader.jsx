import { useEffect } from "react";
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

  const LockOpened = ICON_MAP["lock"];
  const LockClosed = ICON_MAP["unlock"];

  useEffect(() => {
    localStorage.setItem("layout-locked", JSON.stringify(isLocked));
  }, [isLocked]);

  const toggleLock = () => {
    setIsLocked((prev) => {
      const next = !prev;

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
    <div className="flex justify-between mb-5 items-center">

      <p
        className="text-3xl md:text-4xl text-gray-900 dark:text-gray-100 animate-text-pulse"
        style={{ fontFamily: "'Patrick Hand', cursive" }}
      >
        Witaj, {user?.name}!
      </p>

      <button
        type="button"
        onClick={toggleLock}
        aria-label={isLocked ? "Odblokuj edycję" : "Zablokuj edycję"}
        className="
          inline-flex items-center justify-center
          rounded-full border border-gray-200 dark:border-gray-800
          p-3
          text-gray-700 dark:text-gray-200
          hover:border-gray-300 dark:hover:border-gray-700
          transition
          cursor-pointer
        "
      >
        {isLocked ? (
          <LockOpened className="h-5 w-5" />
        ) : (
          <LockClosed className="h-5 w-5" />
        )}
      </button>

    </div>
  );
}