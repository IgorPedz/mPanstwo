import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import useAuthForm from "../Hooks/useAuthForm";
import useAuthSubmit from "../Hooks/useAuthSubmit";
import InfoMessage from "../Utils/InfoMessage";
import LoginFooter from "../components/Global/LoginFooter";
import Settings from "../components/Global/Settings";
import ImageSlider from "../components/Global/ImagesSlider";

import sejmIMG from "../../public/images/sejmRP.jpg";
import palacIMG from "../../public/images/palacRP.jpg";
import sadIMG from "../../public/images/sadRP.jpeg";
import kprmIMG from "../../public/images/KPRP.jpg";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { formData, setFormData, errors } = useAuthForm();
  const { onSubmit, infoMessage, setInfoMessage, messageType, setMessageType, isLeaving } = useAuthSubmit(isLogin);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.registered) {
      setInfoMessage("Konto zostało zarejestrowane. Zaloguj się.");
      setMessageType(location.state?.messageType || "success");
      setIsLogin(true);

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate, setInfoMessage]);

  return (
    <motion.div
      className="min-h-screen w-full grid lg:grid-cols-2 bg-gray-50 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLeaving ? 0 : 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          <h1
            className="text-5xl font-bold text-gray-900 dark:text-white mb-2"
            style={{ fontFamily: "'Patrick Hand', cursive" }}
          >
            {isLogin ? "Logowanie" : "Stwórz konto"}
          </h1>

          <p className="text-gray-500 mb-8">
            {isLogin
              ? "Witamy ponownie! Zaloguj się, by kontynuować"
              : "Stwórz konto, by móc korzystać z aplikacji!"}
          </p>

          {infoMessage && (
            <InfoMessage
              message={infoMessage}
              type={messageType}
              onClose={() => setInfoMessage("")}
            />
          )}

          <div className="mt-6 relative min-h-[360px]">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -40, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 40, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                >
                  <LoginForm
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={onSubmit}
                    errors={errors}
                    switchToRegister={() => setIsLogin(false)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 40, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -40, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                >
                  <RegisterForm
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={onSubmit}
                    errors={errors}
                    switchToLogin={() => setIsLogin(true)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex relative w-full h-full">
        <ImageSlider
          images={[sejmIMG, palacIMG, sadIMG, kprmIMG]}
          interval={5000}
          autoPlay={true}
          showArrows={true}
        />
      </div>

      <div className="absolute bottom-0 left-10 lg:left-28 flex items-center">
        <Settings />
        <LoginFooter />
      </div>
    </motion.div>
  );
}