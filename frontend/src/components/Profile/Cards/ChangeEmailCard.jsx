import { useModalFlow } from "../../../hooks/useModalFlow";
import ChangeEmailFlow from "../flow/ChangeEmailFlow";
import ModalFlow from "../../Global/Modals/ModalFlow";
import ICON_MAP from "../../../Utils/Maps/Icons";

export default function ChangeEmailCard({ changeEmail }) {
  const EnvelopeIcon = ICON_MAP["contact"];
  const flow = useModalFlow(ChangeEmailFlow);

  const handleSubmit = async (data) => {
    const res = await changeEmail(data.email, data.password);

    if (res.success) {
      return { success: true };
    }

    return { success: false, message: res.message };
  };

  return (
    <>
      {/* CARD */}
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
          bg-blue-500/5
          transition-opacity duration-300
        " />

        <div className="relative z-10 flex items-center gap-4">
          <div className="
            p-2 rounded-xl
            bg-blue-100 dark:bg-blue-900/30
            color-transition
          ">
            <EnvelopeIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-white color-transition">
              Zmień email
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 color-transition">
              Zaktualizuj swój adres email
            </p>
          </div>
        </div>

        <span className="relative z-10 text-gray-400">→</span>
      </div>

      {/* FLOW */}
      <ModalFlow
        flow={ChangeEmailFlow}
        hook={flow}
        onSubmit={handleSubmit}
      />
    </>
  );
}