import { useState, useEffect } from "react";
import axios from "axios";

export default function useProfile(userId) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setError(err.response?.data?.message || "Błąd pobierania profilu");
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
      setProfile(res.data);
      return { success: true, message: res.data.message };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Błąd aktualizacji profilu";
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
      const errorMsg = err.response?.data?.message || "Błąd zmiany emaila";
      return { success: false, message: errorMsg };
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    if (!userId || !oldPassword || !newPassword) return;

    try {
      const res = await axios.put(`http://localhost:5000/profile/${userId}/password`, {
        oldPassword,
        newPassword,
      });
      return { success: true, message: res.data.message };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Błąd zmiany hasła";
      return { success: false, message: errorMsg };
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
      const errorMsg = err.response?.data?.message || "Błąd usunięcia konta";
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
