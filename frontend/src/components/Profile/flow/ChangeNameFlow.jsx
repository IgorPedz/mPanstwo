import ICON_MAP from "../../../Utils/Maps/Icons";

const UserIcon = ICON_MAP["user"];

const ChangeNameFlow = {
  title: "Zmień imię",

  steps: {
    1: ({ setStep }) => (
      <div className="space-y-4">
        <div
          className="
          p-4 rounded-xl
          bg-indigo-50/60 dark:bg-indigo-900/20
          border border-indigo-200/50 dark:border-indigo-800/40
        "
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <UserIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                Aktualizacja profilu
              </h3>
              <p className="text-xs text-indigo-600/80 dark:text-indigo-400">
                Zmienisz nazwę wyświetlaną w całym systemie.
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Imię będzie widoczne dla innych użytkowników.
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
          name: "name",
          type: "text",
          placeholder: "Twoje imię i nazwisko",
          defaultValue: "",
        },
      ],
      submitText: "Zapisz",
      cancelText: "Anuluj",
    },
  },
};

export default ChangeNameFlow;
