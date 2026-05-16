import ICON_MAP from "../../../Utils/Maps/Icons";
import PasswordStrength from "../../Auth/PasswordStrength";

const LockIcon = ICON_MAP["lock"];

const ChangePasswordFlow = {
  title: "Zmień hasło",

  steps: {
    1: ({ setStep }) => (
      <div className="space-y-4">
        <div
          className="
      p-4 rounded-xl
      bg-purple-50/60 dark:bg-purple-900/20
      border border-purple-200/50 dark:border-purple-800/40
    "
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <LockIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                Zmiana hasła
              </h3>

              <p className="text-xs text-purple-600/80 dark:text-purple-400">
                Upewnij się, że nowe hasło jest silne.
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Po przejściu dalej wpiszesz stare i nowe hasło.
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
          name: "oldPassword",
          type: "password",
          label: "Stare hasło",
          placeholder: "Stare hasło",
        },

        {
          name: "newPassword",
          type: "password",
          label: "Nowe hasło",
          placeholder: "Nowe hasło",

          renderBelow: ({ formData }) => (
            <PasswordStrength password={formData.newPassword} />
          ),
        },

        {
          name: "confirmPassword",
          type: "password",
          label: "Powtórz nowe hasło",
          placeholder: "Potwierdź nowe hasło",
        },
      ],

      submitText: "Zapisz zmiany",
      cancelText: "Anuluj",
    },
  },
};

export default ChangePasswordFlow;
