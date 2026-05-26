import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function useResetPassword(token, navigate) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const resetPassword = async (password, repeatPassword) => {
    if (password !== repeatPassword) {
      return setMessage({
        type: "error",
        text: t("common.messages.passwordMismatch"),
      });
    }

    try {
      setLoading(true);
      setMessage(null);

      const res = await fetch("http://localhost:5000/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || t("common.messages.resetPasswordError"));
      }

      setMessage({
        type: "success",
        text: t("profileAccount.passwordChanged"),
      });

      setTimeout(() => {
        navigate("/auth", {
          state: {
            infoMessage: t("profileAccount.passwordChanged"),
            infoType: "success",
          },
        });
      }, 1500);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    message,
    resetPassword,
  };
}