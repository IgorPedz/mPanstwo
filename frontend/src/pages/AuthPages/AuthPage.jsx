import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion as m, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";

import useAuthForm from "../../Hooks/useAuthForm";
import useAuthSubmit from "../../Hooks/useAuthSubmit";

import InfoMessage from "../../components/Global/InfoMessage";
import LoginFooter from "../../components/Global/LoginFooter";
import Settings from "../../components/Global/Settings";

import ImageSlider from "../../components/Global/ImageSlider/ImagesSlider";
import slides from "../../components/Global/ImageSlider/AuthSlides";

export default function AuthPage() {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);

  const { formData, setFormData, errors, handleSubmit } = useAuthForm();

  const {
    onSubmit,
    infoMessage: authInfoMessage,
    setInfoMessage: setAuthInfoMessage,
    messageType,
    setMessageType,
    isLeaving,
  } = useAuthSubmit(isLogin);

  const navigate = useNavigate();
  const location = useLocation();

  const [infoMessage, setInfoMessage] = useState("");
  const [infoType, setInfoType] = useState("success");

  useEffect(() => {
    if (location.state?.registered) {
      setInfoMessage(t("common.messages.registrationSuccess"));
      setInfoType(location.state?.messageType || "success");

      Promise.resolve().then(() => setIsLogin(true));

      navigate(location.pathname, {
        replace: true,
        state: {},
      });
    }

    if (location.state?.infoMessage) {
      setInfoMessage(location.state.infoMessage);
      setInfoType(location.state.infoType || "success");

      navigate(location.pathname, {
        replace: true,
        state: {},
      });
    }
  }, [location, navigate]);

  return (
    <m.div
      className="
        transition-colors relative h-screen w-full
        grid lg:grid-cols-2 overflow-hidden
        color-transition
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: isLeaving ? 0 : 1 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="
          transition-colors
          flex flex-col items-center justify-center
          px-8 py-12 relative z-10
        "
      >
        <div className="absolute top-4 left-4 w-fit">
          <Settings size="sm" />
        </div>
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1
              className="
                transition-colors
                text-6xl font-black
                text-slate-900 dark:text-white
                mb-4 uppercase tracking-tighter leading-none
              "
            >
              {isLogin ? t("auth.loginHeading") : t("auth.registerHeading")}
            </h1>

            <p
              className="
                transition-colors
                text-[12px] font-bold uppercase tracking-widest
                text-slate-400 dark:text-slate-500
              "
            >
              {isLogin ? t("auth.hasAccount") : t("auth.noAccount")}
            </p>
          </div>

          <AnimatePresence>
            {(infoMessage || authInfoMessage) && (
              <m.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="
                  fixed z-[9999]
                  top-6 left-1/2 -translate-x-1/2
                  w-[90%] max-w-md
                "
              >
                <InfoMessage
                  message={infoMessage || authInfoMessage}
                  type={infoMessage ? infoType : messageType}
                  onClose={() => {
                    setInfoMessage("");
                    setAuthInfoMessage("");
                  }}
                />
              </m.div>
            )}
          </AnimatePresence>

          <div className="mt-2 relative min-h-fit">
            <AnimatePresence mode="wait">
              <m.div
                key={isLogin ? "login" : "register"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
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

        <div
          className="
            transition-colors pt-10
            w-full justify-center flex
            border-t border-slate-100 dark:border-slate-900
          "
        >
          <LoginFooter />
        </div>
      </div>

      <div
        className="
          transition-colors hidden lg:block relative
          border-l-4 border-slate-900 dark:border-slate-800
        "
      >
        <ImageSlider slides={slides} interval={6000} />
      </div>
    </m.div>
  );
}
