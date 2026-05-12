import ICON_MAP from "../../../Utils/Maps/Icons";

const EnvelopeIcon = ICON_MAP["contact"];

const ChangeEmailFlow = {
  title: "Zmień email",

  steps: {
    1: ({ setStep }) => (
      <div className="space-y-4">
        <div
          className="
          p-4 rounded-xl
          bg-blue-50/60 dark:bg-blue-900/20
          border border-blue-200/50 dark:border-blue-800/40
        "
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <EnvelopeIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                Zmiana adresu email
              </h3>

              <p className="text-xs text-blue-600/80 dark:text-blue-400">
                Nowy email będzie używany do logowania i powiadomień.
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          W kolejnym kroku podasz nowy adres oraz hasło potwierdzające zmianę.
        </p>
        <button
          onClick={() => setStep(2)}
          className="
        w-full px-6 py-3
        rounded-xl font-medium
        bg-gradient-to-r from-purple-500 to-indigo-500
        hover:from-purple-600 hover:to-indigo-600
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
          name: "email",
          label:"Email",
          type: "email",
          placeholder: "Nowy email",
        },
        {
          name: "password",
          label:"Hasło",
          type: "password",
          placeholder: "Hasło",
        },
      ],
      submitText: "Zapisz",
      cancelText: "Anuluj",
    },
  },
};

export default ChangeEmailFlow;
