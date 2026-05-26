import { useState } from "react";
import axios from "axios";
import { useUser } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function useAuthSubmit(isLogin) {
  const { t } = useTranslation();
  const [infoMessage, setInfoMessage] = useState("");
  const [isLeaving, setIsLeaving] = useState(false);
  const [messageType, setMessageType] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const validateForm = (data) => {
    const requiredFields = isLogin ? ['email', 'password'] : ['name', 'email', 'password'];
    const allEmpty = requiredFields.every(field => !data[field] || data[field].trim() === '');

    if (allEmpty) {
      return { valid: false, message: t("common.messages.allFieldsRequired") };
    }

    if (!data.email) {
      return { valid: false, message: t("common.messages.emailRequired") };
    }
    if (!data.password) {
      return { valid: false, message: t("common.messages.passwordRequired") };
    }
    if (data.password.length < 6) {
      return { valid: false, message: t("common.messages.passwordMinLength") };
    }
    if (!isLogin && !data.name) {
      return { valid: false, message: t("common.messages.usernameRequired") };
    }
    return { valid: true };
  };

  const onSubmit = async (data, rememberMe) => {
    const validation = validateForm(data);
    if (!validation.valid) {
      setMessageType("error");
      setInfoMessage(validation.message);
      return;
    }

    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:5000/login", {
          email: data.email,
          password: data.password,
          rememberMe,
        });

        if (rememberMe) {
          localStorage.setItem("token", res.data.token);
          sessionStorage.removeItem("token");
        } else {
          sessionStorage.setItem("token", res.data.token);
          localStorage.removeItem("token");
        }

        login(res.data.user, rememberMe);

        setIsLeaving(true);

        setTimeout(() => {
          navigate("/dashboard");
        }, 400);

      } else {
        await axios.post("http://localhost:5000/register", {
          name: data.name,
          email: data.email,
          password: data.password,
        });

        navigate("/auth", { state: { registered: true } });
      }
    } catch (error) {
      setMessageType("error");
      setInfoMessage(error.response?.data?.message || t("common.messages.errorOccurred"));
    }
  };

  return { onSubmit, infoMessage, setInfoMessage, messageType, setMessageType, isLeaving };
}