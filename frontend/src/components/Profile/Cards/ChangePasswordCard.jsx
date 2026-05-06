import { useModalFlow } from "../../../hooks/useModalFlow";
import ModalFlow from "../../Global/Modals/ModalFlow";
import ChangePasswordFlow from "../flow/ChangePasswordFlow";
import ICON_MAP from "../../../Utils/Maps/Icons";

export default function ChangePasswordCard({ changePassword }) {
  const flow = useModalFlow(ChangePasswordFlow);

  const LockIcon = ICON_MAP["lock"];

  const handleSubmit = async (data) => {
    const { old, new: newPass } = data;

    if (!old || !newPass) {
      return { success: false, message: "Uzupełnij wszystkie pola" };
    }

    if (newPass.length < 6) {
      return { success: false, message: "Min. 6 znaków" };
    }

    const res = await changePassword(old, newPass);

    return res;
  };

  return (
    <>
      {/* 🔐 ROW */}
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
          bg-purple-500/5
          transition-opacity duration-300
        " />

        <div className="relative z-10 flex items-center gap-4">

          <div className="
            p-2 rounded-xl
            bg-purple-100 dark:bg-purple-900/30
            color-transition
          ">
            <LockIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-white color-transition">
              Zmień hasło
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 color-transition">
              Zaktualizuj dane logowania
            </p>
          </div>

        </div>

        <span className="relative z-10 text-gray-400">→</span>
      </div>

      {/* 🧠 FLOW ENGINE */}
      <ModalFlow
        flow={ChangePasswordFlow}
        hook={flow}
        onSubmit={handleSubmit}
      />
    </>
  );
}