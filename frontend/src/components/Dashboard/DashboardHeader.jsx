import { useUser } from "../../Contexts/UserContext";
import ICON_MAP from "../../Utils/Icons";
export default function WelcomeDashboard({ isLocked, saveLayout, setIsLocked, setShowAddMenu, showAddMenu }) {
  const { user } = useUser();
  const LockOpened = ICON_MAP["lockOpened"];
  const LockClosed = ICON_MAP["lockClosed"];
  return (

    <div className="flex justify-between mb-10">
      <p
        className="text-3xl md:text-4xl text-blue-900 dark:text-blue-400 mb-4 color-transition animate-fade-in animate-text-pulse"
        style={{ fontFamily: "'Patrick Hand', cursive" }}
      >
        Witaj, {user.name}!
      </p>

      <button
        type="button"
        onClick={() => {
          setIsLocked((prev) => !prev);
          if(!isLocked) saveLayout();
          if (showAddMenu) setShowAddMenu(false);
        }}
        aria-label={isLocked ? "Odblokuj edycję" : "Zablokuj edycję"}
        className={`inline-flex items-center justify-center rounded-full border px-3 py-3 shadow-sm transition color-transition cursor-pointer ${isLocked ? "border-blue-300 bg-white text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-blue-900" : "border-blue-300 bg-white text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-blue-900"}`}
      >
        {isLocked ? <LockClosed className="h-5 w-5" /> : <LockOpened className="h-5 w-5" />}
      </button>
    </div>
  );
}