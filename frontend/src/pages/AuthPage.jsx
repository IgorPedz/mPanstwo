import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../Contexts/UserContext";

import AuthForm from "../components/auth/AuthForm";
import AuthToggle from "../components/auth/AuthToggle";
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
    if (location.state && location.state.registered) {
      setInfoMessage("Konto zostało zarejestrowane. Zaloguj się.");
      setIsLogin(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const onSubmit = (data) => {
    if (isLogin) {
      const userData = {
        name: data.name || "Użytkownik",
        email: data.email,
      };
      login(userData);
      navigate("/dashboard");
    } else {
      navigate("/auth", { state: { registered: true } });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-tr from-blue-100 to-indigo-200 
      dark:from-gray-900 dark:to-gray-800 
      px-4 transition-all duration-300">

      <div className="max-w-md w-full 
        bg-white dark:bg-gray-900 
        dark:text-white 
        rounded-3xl shadow-2xl p-8 transition-all duration-300">

        <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Zaloguj się" : "Zarejestruj się"}
        </h1>

        {infoMessage && (
          <InfoMessage
            message={infoMessage}
            type="success"
            onClose={() => setInfoMessage("")}
          />
        )}

        <AuthForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit(onSubmit)}
          isLogin={isLogin}
          errors={errors}
        />

        <div className="mt-4">
          <AuthToggle isLogin={isLogin} setIsLogin={setIsLogin} />
        </div>
      </div>

      <div className="fixed bottom-4 left-4 z-50">
        <Settings />
      </div>
    </div>
  );
}