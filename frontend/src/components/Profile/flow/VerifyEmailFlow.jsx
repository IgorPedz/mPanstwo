import ICON_MAP from "../../../Utils/Maps/Icons";
import useVerifyEmail from "../../../Hooks/useVerification";

const ShieldIcon = ICON_MAP["shield"] || ICON_MAP["contact"];

const VerifyEmailFlow = {
  title: "Weryfikacja Email",

  steps: {
    1: ({ setStep }) => {
      const { sendCode } = useVerifyEmail();

      return (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-200/50 dark:border-emerald-800/40">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <ShieldIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  Weryfikacja email
                </h3>

                <p className="text-xs text-emerald-600/80 dark:text-emerald-400">
                  Kliknij przycisk aby wysłać kod na email.
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Po przejściu dalej otrzymasz na emaila kod weryfikujący, który bedziesz musiał wpisać.
          </p>
          <button
            onClick={async () => {
              await sendCode();
              setStep(2);
            }}
            className="cursor-pointer
              w-full px-6 py-3 rounded-xl
              font-medium
              bg-gradient-to-r from-emerald-500 to-teal-500
              hover:from-emerald-600 hover:to-teal-600
              text-white
              transition-all duration-200
            "
          >
            Wyślij kod
          </button>
        </div>
      );
    },

    2: {
      fields: [
        {
          name: "code",
          label: "Kod weryfikacyjny",
          type: "text",
          placeholder: "000000",
          maxLength: 6,
        },
      ],

      submitText: "Zweryfikuj",
      cancelText: "Wróć",
    },
  },
};

export default VerifyEmailFlow;
