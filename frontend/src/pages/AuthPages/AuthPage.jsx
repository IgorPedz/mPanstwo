import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion as m, AnimatePresence } from "framer-motion";

import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";
import useAuthForm from "../../Hooks/useAuthForm";
import useAuthSubmit from "../../Hooks/useAuthSubmit";
import InfoMessage from "../../components/Global/InfoMessage";
import LoginFooter from "../../components/Global/LoginFooter";
import ImageSlider from "../../components/Global/ImageSlider/ImagesSlider";
import slides from "../../components/Global/ImageSlider/AuthSlides";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { formData, setFormData, errors, handleSubmit } = useAuthForm();
  const {
    onSubmit,
    infoMessage,
    setInfoMessage,
    messageType,
    setMessageType,
    isLeaving,
  } = useAuthSubmit(isLogin);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.registered) {
      setInfoMessage("Konto zostało zarejestrowane. Zaloguj się.");
      setMessageType(location.state?.messageType || "success");
      Promise.resolve().then(() => setIsLogin(true));
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate, setInfoMessage, setMessageType]);

  return (
    <m.div
      className="transition-colors relative min-h-screen w-full grid lg:grid-cols-2 color-transition overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLeaving ? 0 : 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="transition-colors flex flex-col items-center justify-center px-8 py-12 relative z-10 ">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="transition-colors text-6xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter leading-none tracking-tighter">
              {isLogin ? "LOGOWANIE" : "REJESTRACJA"}
            </h1>

            <p className="transition-colorstext-[12px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              {isLogin
                ? "Masz konto? Zaloguj się"
                : "Nie masz konta? Zarejestruj się"}
            </p>
          </div>

          <AnimatePresence>
            {infoMessage && (
              <m.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="fixed z-50 top-10 left-1/2 -translate-x-1/2 lg:left-1/4 w-[90%] max-w-md"
              >
                <InfoMessage
                  message={infoMessage}
                  type={messageType}
                  onClose={() => setInfoMessage("")}
                />
              </m.div>
            )}
          </AnimatePresence>

          <div className="mt-2 relative min-h-[450px]">
            <AnimatePresence mode="wait">
              <m.div
                key={isLogin ? "login" : "register"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {isLogin ? (
                  <LoginForm
                    formData={formData}
                    setFormData={setFormData}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    switchToRegister={() => setIsLogin(false)}
                  />
                ) : (
                  <RegisterForm
                    formData={formData}
                    setFormData={setFormData}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    switchToLogin={() => setIsLogin(true)}
                  />
                )}
              </m.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="transition-colors mt-auto pt-10 w-full max-w-md border-t border-slate-100 dark:border-slate-900">
          <LoginFooter />
        </div>
      </div>
       
      <div className="transition-colors hidden lg:block relative w-full h-full border-l-4 border-slate-900 dark:border-slate-800">
        <ImageSlider slides={slides} interval={6000} />

      </div>
    </m.div>
  );
}
