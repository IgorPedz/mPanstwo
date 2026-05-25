  import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useModalFlow } from "../../../hooks/useModalFlow";
import ModalFlow from "../../Global/Modals/ModalFlow";
import ChangePasswordFlow from "../flow/ChangePasswordFlow";
import InfoMessage from "../../Global/InfoMessage";
import ICON_MAP from "../../../Utils/Maps/Icons";
import { ACCENT_MAP } from "../../../Utils/Maps/Accents";

export default function ChangePasswordCard({ changePassword }) {
  const { t } = useTranslation();
  const flow = useModalFlow(ChangePasswordFlow);
  const LockIcon = ICON_MAP["lock"] || ICON_MAP["shield"];
  const [infoMessage, setInfoMessage] = useState("");
  const [infoType, setInfoType] = useState("success");

  const gradientClasses =
    ACCENT_MAP["purple"] || "from-purple-700 to-purple-500";

  const handleSubmit = async (data) => {

    const { oldPassword, newPassword, confirmPassword } = data;
    try {
      const res = await changePassword({
        oldPassword,
        newPassword,
        confirmPassword,
      });

      if (res?.success) {
        setInfoType("success");
        setInfoMessage(t("profileAccount.passwordChanged"));
      }

      return res;
    } catch (err) {
      return {
        success: false,
        message: "BŁĄD SERWERA",
      };
    }

  };

  return (
    <>
      <div
        onClick={() => flow.setOpen(true)}
        className="
          bg-white dark:bg-slate-900 p-8 rounded-[2rem] 
          border border-slate-200 dark:border-slate-800 shadow-sm 
          transition-all duration-500 color-transition group relative 
          overflow-hidden h-full cursor-pointer
        "
      >
        <div className="absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-[0.05] group-hover:scale-110 transition-transform duration-700 pointer-events-none">
          <LockIcon className="h-32 w-32" />
        </div>

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start mb-6">
            <div
              className={`
              p-4 rounded-2xl transition-all duration-500 color-transition
              bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white
              group-hover:bg-gradient-to-br group-hover:shadow-lg
              ${gradientClasses
                  .split(" ")
                  .map((c) => `group-hover:${c}`)
                  .join(" ")}
            `}
            >
              <LockIcon className="h-6 w-6" />
            </div>

            <div className="text-slate-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all duration-300">
              <span className="text-2xl font-light">→</span>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 color-transition">
              {t("profileAccount.accountData")}
            </p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter color-transition">
              {t("profileAccount.changePasswordTitle")}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {t("profileAccount.changePasswordDesc")}
            </p>
          </div>
        </div>

        <div
          className={`
          absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full 
          transition-all duration-700 bg-gradient-to-r ${gradientClasses}
        `}
        />
      </div>

      <ModalFlow flow={ChangePasswordFlow} hook={flow} onSubmit={handleSubmit} />

      {infoMessage && (
        <InfoMessage
          message={infoMessage}
          type={infoType}
          onClose={() => setInfoMessage("")}
        />
      )}
    </>
  );
}