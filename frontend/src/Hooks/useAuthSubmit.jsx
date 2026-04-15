import { useState } from "react";
import axios from "axios";
import { useUser } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function useAuthSubmit(isLogin) {
  const [infoMessage, setInfoMessage] = useState("");
  const [isLeaving, setIsLeaving] = useState(false);
  const [messageType, setMessageType] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const validateForm = (data) => {
    const requiredFields = isLogin ? ['email', 'password'] : ['name', 'email', 'password'];
    const allEmpty = requiredFields.every(field => !data[field] || data[field].trim() === '');

    if (allEmpty) {
      return { valid: false, message: "Wymagane są wszystkie pola" };
    }

    if (!data.email) {
      return { valid: false, message: "Email jest wymagany" };
    }
    if (!data.password) {
      return { valid: false, message: "Hasło jest wymagane" };
    }
    if (data.password.length < 6) {
      return { valid: false, message: "Hasło musi mieć minimum 6 znaków" };
    }
    if (!isLogin && !data.name) {
      return { valid: false, message: "Nazwa użytkownika jest wymagana" };
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
        });

        if (rememberMe) {
          localStorage.setItem("token", res.data.token);
          sessionStorage.removeItem("token");
        } else {
          sessionStorage.setItem("token", res.data.token);
          localStorage.removeItem("token");
        }

        login(res.data.user);

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
      setInfoMessage(error.response?.data?.message || "Wystąpił błąd");
    }
  };

  return { onSubmit, infoMessage, setInfoMessage, messageType, setMessageType, isLeaving };
}