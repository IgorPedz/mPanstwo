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
        className="cursor-pointer relative w-full flex items-center gap-3 px-4 py-3
                   text-red-500 dark:text-red-400
                   hover:bg-red-500/5 dark:hover:bg-red-500/10
                   transition-all duration-200
                   group border-l-2 border-transparent hover:border-red-500"
      >
        <div className="absolute left-0 top-0 h-full w-[2px] bg-red-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-200" />

        <ArrowRightEndOnRectangleIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />

        <span className="text-xs font-black uppercase tracking-widest">
          Wyloguj
        </span>
      </button>

      <ModalMessage
        isOpen={showLogoutModal}
        title="Zakończenie sesji"
        message="Czy na pewno chcesz zakończyć sesję użytkownika?"
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