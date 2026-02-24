import React from "react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

export default function AuthForm({ formData, setFormData, onSubmit, isLogin, errors }) {
  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <form className="text-black dark:text-white flex flex-col gap-4" onSubmit={onSubmit}>
      {!isLogin && (
        <AuthInput
          label="Imię i nazwisko"
          type="text"
          value={formData.name}
          onChange={handleChange("name")}
          placeholder="Jan Kowalski"
          error={errors.name}
        />
      )}
      <AuthInput
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange("email")}
        placeholder="jan@przyklad.pl"
        error={errors.email}
      />
      <AuthInput
        label="Hasło"
        type="password"
        value={formData.password}
        onChange={handleChange("password")}
        placeholder="********"
        error={errors.password}
      />
      <AuthButton>{isLogin ? "Zaloguj się" : "Zarejestruj się"}</AuthButton>
    </form>
  );
}