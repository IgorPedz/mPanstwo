import { useState } from "react";
import { useTranslation } from "react-i18next";
export default function useAuthForm(initialValues = { name: "", email: "", password: "" }) {
  const { t } = useTranslation()
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = (isLogin) => {
    const newErrors = {};

    if (!formData.email?.trim()) {
      newErrors.email = t("auth.errorEmailRequired");
    }

    if (!formData.password?.trim()) {
      newErrors.password = t("auth.errorPasswordRequired");
    } else if (formData.password.length < 6) {
      newErrors.password = t("auth.errorPasswordMin");
    }

    if (!isLogin && !formData.name?.trim()) {
      newErrors.name = t("auth.errorNameRequired");
    }

    return newErrors;
  };

  const handleSubmit = (callback, isLogin) => (e) => {
    e.preventDefault();
    const validationErrors = validate(isLogin);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    callback(formData);
  };

  return { formData, setFormData, errors, handleSubmit };
}