import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useUser } from "../Contexts/UserContext";
export default function useProfile(userId) {
  const { t } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser()

  const fetchProfile = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/profile/${userId}`);
      setProfile(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || t("common.messages.fetchProfileError"));
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (name) => {
    if (!userId || !name) return;

    try {
      const res = await axios.put(`http://localhost:5000/profile/${userId}`, {
        name,
      });

      setProfile((prev) => ({
        ...prev,       
        ...res.data,  
      }));

      return { success: true, message: res.data.message };
    } catch (err) {
      const errorMsg = err.response?.data?.message || t("common.messages.updateProfileError");
      setError(errorMsg);
      return { success: false, message: errorMsg };
    }
  };

  const changeEmail = async (email, password) => {
    if (!userId || !email || !password) return;

    try {
      const res = await axios.put(`http://localhost:5000/profile/${userId}/email`, {
        email,
        password,
      });
      setProfile((prev) => ({ ...prev, email }));
      return { success: true, message: res.data.message };
    } catch (err) {
      const errorMsg = err.response?.data?.message || t("common.messages.changeEmailError");
      return { success: false, message: errorMsg };
    }
  };

  const changePassword = async ({
    oldPassword,
    newPassword,
    confirmPassword,
  }) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/profile/${user.id}/password`,
        {
          oldPassword,
          newPassword,
          confirmPassword,
        }
      );

      return {
        success: true,
        message: res.data.message,
      };
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message || t("common.messages.changePasswordError"),
      };
    }
  };

  const deleteAccount = async (password) => {
    if (!userId || !password) return;

    try {
      const res = await axios.delete(`http://localhost:5000/profile/${userId}`, {
        data: { password },
      });
      return { success: true, message: res.data.message };
    } catch (err) {
      const errorMsg = err.response?.data?.message || t("common.messages.deleteAccountError");
      return { success: false, message: errorMsg };
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    changeEmail,
    changePassword,
    deleteAccount,
    refetch: fetchProfile,
  };
}
