import { useState } from "react";

export default function useAuthForm(initialValues = { name: "", email: "", password: "" }) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email jest wymagany";
    if (!formData.password) newErrors.password = "Hasło jest wymagane";
    if (formData.password && formData.password.length < 6) newErrors.password = "Hasło min 6 znaków";
    return newErrors;
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    callback(formData);
  };

  return { formData, setFormData, errors, handleSubmit };
}