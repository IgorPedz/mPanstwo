import { useState } from "react";
import { useTranslation } from "react-i18next";

import ICON_MAP from "../../../Utils/Maps/Icons";
import useVerifyEmail from "../../../Hooks/useVerification";

const ShieldIcon =
  ICON_MAP["shield"] || ICON_MAP["contact"];

const VerifyEmailFlow = {
  title: "profileAccount.verifyEmailTitle",

  steps: {
    1: ({ setStep }) => {
      const { t } = useTranslation();
      const { sendCode } = useVerifyEmail();

      const [loading, setLoading] = useState(false);

      const handleSendCode = async () => {
        try {
          setLoading(true);

          await sendCode();

          setStep(2);
        } finally {
          setLoading(false);
        }
      };

      return (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-200/50 dark:border-emerald-800/40">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <ShieldIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  {t("profileAccount.verifyEmailTitle")}
                </h3>

                <p className="text-xs text-emerald-600/80 dark:text-emerald-400">
                  {t("profileAccount.verifyEmailCardDesc")}
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t("profileAccount.verifyEmailStepText")}
          </p>

          <button
            onClick={handleSendCode}
            disabled={loading}
            className="
              cursor-pointer
              w-full px-6 py-3 rounded-xl
              font-medium
              bg-gradient-to-r from-emerald-500 to-teal-500
              hover:from-emerald-600 hover:to-teal-600
              text-white
              transition-all duration-200
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            {loading
              ? t("profileAccount.sendingCode")
              : t("profileAccount.sendVerificationCode")}
          </button>
        </div>
      );
    },

    2: {
      fields: [
        {
          name: "code",
          label: "profileAccount.verificationCodeLabel",
          type: "text",
          placeholder: "profileAccount.verificationCodePlaceholder",
          maxLength: 6,
        },
      ],

      submitText: "profileAccount.verify",
      cancelText: "common.back",
    },
  },
};

export default VerifyEmailFlow;