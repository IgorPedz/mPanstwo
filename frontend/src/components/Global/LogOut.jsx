import { useState } from "react";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useUser } from "../../Contexts/UserContext";
import ModalMessage from "../Global/Modals/ModalMessage";

export default function LogOut() {
  const { logout } = useUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowLogoutModal(true)}
        className="cursor-pointer w-full flex items-center gap-4 px-4 py-3
                   text-red-600 dark:text-red-400
                   hover:bg-red-50 dark:hover:bg-red-900/50
                   hover:text-red-700 dark:hover:text-red-300
                   transition-all duration-200
                   group"
      >
          <ArrowRightEndOnRectangleIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        <span className="text-sm font-medium transition-colors duration-200">Wyloguj się</span>
      </button>

      <ModalMessage
        isOpen={showLogoutModal}
        title="Wylogowanie"
        message="Czy na pewno chcesz się wylogować z konta?"
        confirmText="Wyloguj się"
        cancelText="Anuluj"
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={() => {
          logout();
          setShowLogoutModal(false);
        }}
      />
    </>
  );
}