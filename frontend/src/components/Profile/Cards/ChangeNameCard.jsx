import { useModalFlow } from "../../../hooks/useModalFlow";
import ChangeNameFlow from "../flow/ChangeNameFlow";
import ModalFlow from "../../Global/Modals/ModalFlow";
import ICON_MAP from "../../../Utils/Maps/Icons";
import { motion } from "framer-motion";

export default function ChangeNameCard({ updateProfile }) {
  const UserIcon = ICON_MAP["user"];

  const flow = useModalFlow(ChangeNameFlow);

  const handleSubmit = async (data) => {
    if (!data.name?.trim()) {
      return { success: false, message: "Imię jest wymagane" };
    }

    const res = await updateProfile(data.name);
    return res;
  };

  return (
    <>
      <motion.div
        onClick={() => flow.setOpen(true)}
        className="
          relative cursor-pointer
          px-5 py-4
          flex items-center justify-between
          transition-all duration-300
          color-transition
        "
      >
        <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-indigo-500/5 transition-opacity duration-300" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 color-transition">
            <UserIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-white color-transition">
              Zmień imię
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 color-transition">
              Zaktualizuj swoje imię wyświetlane na platformie
            </p>
          </div>
        </div>

        <span className="relative z-10 text-gray-400">→</span>
      </motion.div>

      <ModalFlow
        flow={ChangeNameFlow}
        hook={flow}
        onSubmit={handleSubmit}
      />
    </>
  );
}