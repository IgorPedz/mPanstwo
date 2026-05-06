import ICON_MAP from "../../../Utils/Maps/Icons";

const TrashIcon = ICON_MAP["trash"];

const DeleteAccountFlow = {
  title: "Usuń konto",

  steps: {
    1: ({ setStep }) => (
      <div className="space-y-5">
        <div className="
          p-4 rounded-xl
          bg-red-50/70 dark:bg-red-900/20
          border border-red-200/60 dark:border-red-800/40
        ">
          <div className="flex items-start gap-3">

            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <TrashIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-red-700 dark:text-red-300 mb-1">
                Usunięcie konta
              </h3>
              <p className="text-xs text-red-600/80 dark:text-red-400">
                Wszystkie dane zostaną trwale usunięte. Tej operacji nie można cofnąć.
              </p>
            </div>

          </div>
        </div>

        <button
          onClick={() => setStep(2)}
          className="
            w-full px-6 py-3
            rounded-xl font-medium
            bg-red-500 hover:bg-red-600
            text-white
            transition-all duration-200 cursor-pointer
          "
        >
          Kontynuuj
        </button>
      </div>
    ),

    2: {
      fields: [
        {
          name: "password",
          type: "password",
          placeholder: "Hasło",
        },
      ],
      submitText: "Usuń konto",
      cancelText: "Anuluj",
    },
  },
};

export default DeleteAccountFlow;