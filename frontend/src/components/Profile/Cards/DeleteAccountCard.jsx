import { useModalFlow } from "../../../hooks/useModalFlow";
import { useUser } from "../../../Contexts/UserContext";
import ICON_MAP from "../../../Utils/Maps/Icons";
import DeleteAccountFlow from "../flow/DeleteAccountFlow";
import ModalFlow from "../../Global/Modals/ModalFlow";

export default function DeleteAccountCard({ deleteAccount }) {
  const { logout } = useUser();
  const flow = useModalFlow(DeleteAccountFlow);

  const TrashIcon = ICON_MAP["trash"];

  const handleSubmit = async (data) => {
    const res = await deleteAccount(data.password);

    if (res.success) {
      setTimeout(() => logout(), 1200);
      return { success: true };
    }

    return { success: false, message: res.message };
  };

  return (
    <>
      <div
        onClick={() => flow.setOpen(true)}
        className="
          relative cursor-pointer
          px-5 py-4
          flex items-center justify-between
          transition-all duration-300
          color-transition
        "
      >
        <div className="
          absolute inset-0
          opacity-0 hover:opacity-100
          bg-red-500/5
          transition-opacity duration-300
        " />

        <div className="relative z-10 flex items-center gap-4">

          <div className="
            p-2 rounded-xl
            bg-red-100 dark:bg-red-900/30
            color-transition
          ">
            <TrashIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-white color-transition">
              Usuń konto
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 color-transition">
              Operacja nieodwracalna
            </p>
          </div>

        </div>

        <span className="relative z-10 text-red-400">→</span>
      </div>

      {/* 🧠 FLOW ENGINE */}
      <ModalFlow
        flow={DeleteAccountFlow}
        hook={flow}
        onSubmit={handleSubmit}
      />
    </>
  );
}