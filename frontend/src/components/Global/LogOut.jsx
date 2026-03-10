import { useState } from "react";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useUser } from "../../Contexts/UserContext";
import ModalMessage from "../../Utils/ModalMessage";
export default function Settings() {
    const {logout} = useUser()
    const [showLogoutModal, setShowLogoutModal] = useState(false);
return (
    <>
      <button
        onClick={() => setShowLogoutModal(true)}
        className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:text-red-400 transition"
      >
        <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
        <span className="text-sm font-medium">Wyloguj się</span>
      </button>

      <ModalMessage
        isOpen={showLogoutModal}
        title="Wylogowanie"
        message="Czy na pewno chcesz się wylogować?"
        confirmText="Wyloguj"
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