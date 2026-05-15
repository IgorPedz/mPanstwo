import { useState, useEffect } from "react";

import { useModalFlow } from "../../../hooks/useModalFlow";
import useVerifyEmail from "../../../Hooks/useVerification";

import VerifyEmailFlow from "../flow/VerifyEmailFlow";
import ModalFlow from "../../Global/Modals/ModalFlow";

import ICON_MAP from "../../../Utils/Maps/Icons";
import { ACCENT_MAP } from "../../../Utils/Maps/Accents";

import InfoMessage from "../../Global/InfoMessage";

export default function VerifyEmailCard({ verifyEmail }) {
  const ShieldCheckIcon =
    ICON_MAP["shield"] || ICON_MAP["contact"];

  const flow = useModalFlow(VerifyEmailFlow);

  const gradientClasses =
    ACCENT_MAP["emerald"] || "from-emerald-600 to-teal-500";

  const { checkVerification } = useVerifyEmail();

  const [isVerified, setIsVerified] = useState(false);

  const [infoMessage, setInfoMessage] = useState("");
  const [infoType, setInfoType] = useState("success");

  useEffect(() => {
    const loadVerification = async () => {
      const res = await checkVerification();

      if (res?.success) {
        setIsVerified(Boolean(res.is_verified));
      }
    };

    loadVerification();
  }, [checkVerification]);

  const handleSubmit = async (data) => {
    const res = await verifyEmail(data.code);

    if (res?.success) {
      const verifyStatus = await checkVerification();

      if (verifyStatus?.success) {
        setIsVerified(Boolean(verifyStatus.is_verified));
      }

      setInfoType("success");

      setInfoMessage(
        "Adres email został zweryfikowany pomyślnie"
      );

      return { success: true };
    }

    return {
      success: false,
      message:
        res?.message || "Niepoprawny kod weryfikacyjny",
    };
  };

  return (
    <>
      <div
        onClick={() => !isVerified && flow.setOpen(true)}
        className={`
          bg-white dark:bg-slate-900 p-8 rounded-[2rem] 
          border border-slate-200 dark:border-slate-800 shadow-sm 
          transition-all duration-500 color-transition group relative 
          overflow-hidden h-full ${
            isVerified
              ? "cursor-default"
              : "cursor-pointer"
          }
        `}
      >
        <div className="absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-[0.05] group-hover:scale-110 transition-transform duration-700 pointer-events-none">
          <ShieldCheckIcon className="h-32 w-32" />
        </div>

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start mb-6">
            <div
              className={`
                p-4 rounded-2xl color-transition
                ${
                  isVerified
                    ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                }
                group-hover:bg-gradient-to-br group-hover:shadow-lg
                ${
                  !isVerified
                    ? gradientClasses
                        .split(" ")
                        .map((c) => `group-hover:${c}`)
                        .join(" ")
                    : ""
                }
              `}
            >
              <ShieldCheckIcon className="h-6 w-6" />
            </div>

            {!isVerified && (
              <div className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 ">
                <span className="text-2xl font-light">
                  →
                </span>
              </div>
            )}

            {isVerified && (
              <div className="bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Zweryfikowany
              </div>
            )}
          </div>

          <div>
            <p className="color-transition text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
              Bezpieczeństwo konta
            </p>

            <h3 className="color-transition text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
              Weryfikacja Email
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {isVerified
                ? "Twoja tożsamość została potwierdzona. Konto jest bezpieczne."
                : "Potwierdź swój adres, aby odblokować wszystkie funkcje systemu."}
            </p>
          </div>
        </div>

        {!isVerified && (
          <div
            className={`
              absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full 
              transition-all duration-700 bg-gradient-to-r ${gradientClasses}
            `}
          />
        )}
      </div>

      <ModalFlow
        flow={VerifyEmailFlow}
        hook={flow}
        onSubmit={handleSubmit}
      />

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