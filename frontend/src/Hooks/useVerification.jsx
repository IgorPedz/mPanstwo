import { useState, useCallback } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useUser } from "../Contexts/UserContext";

export default function useVerifyEmail() {
  const { t } = useTranslation();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const userId = user?.id || user?._id;

  const sendCode = useCallback(async () => {
    if (!userId) {
      const message = t("common.messages.missingUserId");
      setError(message);
      return { success: false, message };
    }

    setIsSending(true);
    setError(null);

    try {
      const res = await axios.post(
        "http://localhost:5000/send-verification-email",
        {
          userId,
        },
      );

      return {
        success: true,
        message: res.data?.message || t("common.messages.verificationCodeSent"),
      };
    } catch (err) {
      const message =
        err?.response?.data?.message || t("common.messages.verificationCodeSendError");
      setError(message);
      return { success: false, message };
    } finally {
      setIsSending(false);
    }
  }, [userId, t, t]);

  const verifyEmail = useCallback(
    async (code) => {
      if (!userId) {
        const message = t("common.messages.missingUserId");
        setError(message);
        return { success: false, message };
      }

      setLoading(true);
      setError(null);

      try {
        const res = await axios.post("http://localhost:5000/verify-email", {
          userId,
          code,
        });

        return {
          success: true,
          ...res.data,
        };
      } catch (err) {
        const message =
          err?.response?.data?.message || t("common.messages.verifyEmailError");
        setError(message);
        return { success: false, message };
      } finally {
        setLoading(false);
      }
    },
    [userId, t],
  );

  const checkVerification = useCallback(async () => {
  if (!userId) {
    const message = t("common.messages.missingUserId");
    setError(message);

    return {
      success: false,
      is_verified: false,
      message,
    };
  }

  try {
    const res = await axios.post(
      "http://localhost:5000/check-verify",
      {
        userId,
      }
    );

    return {
      success: true,
      is_verified: Boolean(res.data?.is_verified),
    };

  } catch (err) {
    const message =
      err?.response?.data?.message ||
      t("common.messages.verifyStatusError");

    setError(message);

    return {
      success: false,
      is_verified: false,
      message,
    };
  }
}, [userId]);

  return {
    sendCode,
    verifyEmail,
    checkVerification,
    loading,
    isSending,
    error,
  };
}
