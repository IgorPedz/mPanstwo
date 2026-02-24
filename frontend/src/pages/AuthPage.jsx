import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../Contexts/UserContext";
import axios from "axios";

import RegisterForm from "../components/Auth/RegisterForm";
import LoginForm from "../components/Auth/LoginForm";

import useAuthForm from "../Hooks/useAuthForm";
import InfoMessage from "../Utils/InfoMessage";
import Settings from "../components/Global/Settings";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { formData, setFormData, errors, handleSubmit } = useAuthForm();
  const { login } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    if (location.state?.registered) {
      setInfoMessage("Konto zostało zarejestrowane. Zaloguj się.");
      setIsLogin(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:5000/login", {
          email: data.email,
          password: data.password,
        });

        localStorage.setItem("token", res.data.token);
        login(res.data.user);
        navigate("/dashboard");
      } else {
        await axios.post("http://localhost:5000/register", {
          name: data.name,
          email: data.email,
          password: data.password,
        });

        navigate("/auth", { state: { registered: true } });
      }
    } catch (error) {
      setInfoMessage(
        error.response?.data?.message || "Wystąpił błąd"
      );
    }
  };

  return (
    <div className="color-transition min-h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-900 px-4 relative">

      <div className="relative w-full max-w-6xl h-[600px] rounded-3xl shadow-2xl overflow-hidden flex">

        <div
          className={`
        w-1/2 h-full flex flex-col justify-center items-center p-12
        transition-transform duration-700
        ${isLogin ? "translate-x-0" : "translate-x-full"}
      `}
        >
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
            {isLogin ? "Zaloguj się" : "Rejestracja"}
          </h1>

          {infoMessage && (
            <InfoMessage message={infoMessage} type="error" onClose={() => setInfoMessage("")} />
          )}

          <div className={`${isLogin ? "block" : "hidden"} w-full max-w-md`}>
            <LoginForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit(onSubmit)}
              errors={errors}
            />
          </div>

          <div className={`${!isLogin ? "block" : "hidden"} w-full max-w-md`}>
            <RegisterForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit(onSubmit)}
              errors={errors}
            />
          </div>
        </div>

        <div
          className={`
        w-1/2 h-full flex flex-col justify-center items-center
        bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600
        dark:from-gray-700 dark:via-gray-800 dark:to-gray-700
        text-white p-12 transition-transform duration-700
        ${isLogin ? "translate-x-0" : "-translate-x-full"}
      `}
        >
          <h2 className="text-3xl font-bold mb-4 text-center">
            {isLogin ? "Witaj ponownie!" : "Dołącz do nas!"}
          </h2>

          <p className="text-center mb-6 opacity-90">
            {isLogin
              ? "Nie masz konta? Zarejestruj się i zacznij korzystać."
              : "Masz już konto? Zaloguj się i kontynuuj."}
          </p>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="cursor-pointer border border-white px-6 py-2 rounded-full hover:bg-white hover:text-indigo-600 transition duration-300"
          >
            {isLogin ? "Zarejestruj się" : "Zaloguj się"}
          </button>
        </div>

      </div>

      <div className="absolute bottom-4 left-4">
        <Settings />
      </div>
    </div>
  );
}