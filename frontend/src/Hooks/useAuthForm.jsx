import { useState } from "react";

export default function useAuthForm(initialValues = { name: "", email: "", password: "" }) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = (isLogin) => {
    const newErrors = {};

    if (!formData.email?.trim()) {
      newErrors.email = "Email jest wymagany";
    }

    if (!formData.password?.trim()) {
      newErrors.password = "Hasło jest wymagane";
    } else if (formData.password.length < 6) {
      newErrors.password = "Hasło min 6 znaków";
    }

    if (!isLogin && !formData.name?.trim()) {
      newErrors.name = "Nazwa użytkownika jest wymagana";
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