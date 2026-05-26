import { useState, useCallback } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function useUserSecurity() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSecurity = useCallback(async (userId) => {

    if (!userId) {
      setError(t("common.messages.missingUserId"));

      return {
        success: false,
        is_verified: false,
        has_strong_password: false,
      };
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:5000/user-security", {
        userId,
      });

      return {
        success: true,
        ...res.data,
      };
    } catch (err) {
      const message =
        err?.response?.data?.message || t("common.messages.fetchSecurityError");

      setError(message);

      return {
        success: false,
        is_verified: false,
        has_strong_password: false,
        message,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchSecurity,
    loading,
    error,
  };
}