import { useState } from "react";
import AuthInput from "./AuthInput";

export default function LoginForm({
  formData,
  setFormData,
  onSubmit,        
  errors,
  switchToRegister
}) {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, rememberMe); 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <AuthInput
        label="Email"
        type="email"
        name="email"
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />

      <AuthInput
        label="Hasło"
        type="password"
        name="password"
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        validate={(value) => {
          if (!value) return "Hasło jest wymagane";
          if (value.length < 6) return "Hasło musi mieć minimum 6 znaków";
          return "";
        }}
      />

      <div className="flex items-center space-x-3">
        <div className="relative">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="cursor-pointer appearance-none w-5 h-5 border-2 border-gray-400 rounded-md bg-white dark:bg-gray-800 checked:bg-indigo-600 checked:border-indigo-600 transition-all duration-200 focus:outline-none"
          />
          <svg
            className="absolute top-0 left-0 w-5 h-5 text-white pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ display: rememberMe ? "block" : "none" }}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <span className="text-gray-700 dark:text-gray-200 font-medium">
          Pamiętaj mnie
        </span>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl transition"
        >
          Zaloguj się
        </button>

        <button
          type="button"
          onClick={switchToRegister}
          className="cursor-pointer w-full border-2 border-indigo-500 text-indigo-600 py-4 rounded-xl hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
        >
          Stwórz konto
        </button>
      </div>
    </form>
  );
}