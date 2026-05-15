import { useState, useCallback } from "react";
import axios from "axios";
import { useUser } from "../Contexts/UserContext";

export default function useVerifyEmail() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const userId = user?.id || user?._id;

  const sendCode = useCallback(async () => {
    if (!userId) {
      setError("Brak ID użytkownika");
      return { success: false, message: "Brak ID użytkownika" };
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
        message: res.data?.message || "Kod został wysłany",
      };
    } catch (err) {
      const message =
        err?.response?.data?.message || "Nie udało się wysłać kodu";
      setError(message);
      return { success: false, message };
    } finally {
      setIsSending(false);
    }
  }, [userId]);

  const verifyEmail = useCallback(
    async (code) => {
      if (!userId) {
        setError("Brak ID użytkownika");
        return { success: false, message: "Brak ID użytkownika" };
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
          err?.response?.data?.message || "Błąd weryfikacji email";
        setError(message);
        return { success: false, message };
      } finally {
        setLoading(false);
      }
    },
    [userId],
  );

  const checkVerification = useCallback(async () => {
  if (!userId) {
    setError("Brak ID użytkownika");

    return {
      success: false,
      is_verified: false,
      message: "Brak ID użytkownika",
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
      "Nie udało się sprawdzić statusu weryfikacji";

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
