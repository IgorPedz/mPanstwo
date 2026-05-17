import { useState } from "react";

export default function useResetPassword(token, navigate) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const resetPassword = async (password, repeatPassword) => {
    if (password !== repeatPassword) {
      return setMessage({
        type: "error",
        text: "Hasła nie są takie same",
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
        throw new Error(data.message || "Błąd resetu hasła");
      }

      setMessage({
        type: "success",
        text: "Hasło zostało zmienione",
      });

      setTimeout(() => {
        navigate("/auth", {
          state: {
            infoMessage: "Hasło zostało zmienione!",
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