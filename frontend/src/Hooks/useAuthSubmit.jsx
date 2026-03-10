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

  const onSubmit = async (data, rememberMe) => {
    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:5000/login", {
          email: data.email,
          password: data.password,
        });

        if (rememberMe) {
          localStorage.setItem("token", res.data.token);
        } else {
          sessionStorage.setItem("token", res.data.token);
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