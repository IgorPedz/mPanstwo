import { useTranslation } from "react-i18next";
import ICON_MAP from "../../../Utils/Maps/Icons";

const EnvelopeIcon = ICON_MAP["contact"];

const ChangeEmailFlow = {
  title: "profileAccount.changeEmailTitle",

  steps: {
    1: ({ setStep }) => {
      const { t } = useTranslation();

      return (
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
                  {t("profileAccount.changeEmailTitle")}
                </h3>

                <p className="text-xs text-blue-600/80 dark:text-blue-400">
                  {t("profileAccount.changeEmailCardDesc")}
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t("profileAccount.changeEmailStepText")}
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
            {t("common.continue")}
          </button>
        </div>
      );
    },

    2: {
      fields: [
        {
          name: "email",
          label: "auth.email",
          type: "email",
          placeholder: "profileAccount.newEmailPlaceholder",
        },
        {
          name: "password",
          label: "auth.password",
          type: "password",
          placeholder: "auth.password",
        },
      ],
      submitText: "common.save",
      cancelText: "common.cancel",
    },
  },
};

export default ChangeEmailFlow;
