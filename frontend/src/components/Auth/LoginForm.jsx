import { useState } from "react";
import AuthInput from "./AuthInput";

export default function LoginForm({
  formData,
  setFormData,
  errors,
  handleSubmit,
  onSubmit,
  switchToRegister,
}) {
  const [rememberMe, setRememberMe] = useState(false);

  const handleFormSubmit = handleSubmit(
    (data) => onSubmit(data, rememberMe),
    true,
  );

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <AuthInput
        label="Email"
        type="email"
        name="email"
        placeholder="Wpisz email"
        formData={formData}
        setFormData={setFormData}
        error={errors.email}
      />

      <AuthInput
        label="Hasło"
        type="password"
        name="password"
        placeholder="Wpisz hasło"
        formData={formData}
        setFormData={setFormData}
        error={errors.password}
      />

      <div className="flex items-center space-x-3">
        <div className="relative">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="
              cursor-pointer appearance-none w-5 h-5
              border-2 border-gray-400 rounded-md
              bg-white dark:bg-gray-800
              checked:bg-indigo-600 checked:border-indigo-600
              focus:outline-none
              transition-colors duration-200 ease-in-out
            "
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

      <div className="flex flex-col gap-4 mt-4">
        <button
          type="submit"
          className="
            cursor-pointer w-full
            bg-indigo-600 hover:bg-indigo-700
            text-white py-4 rounded-xl
            transition-colors duration-200 ease-in-out
          "
        >
          Zaloguj się
        </button>

        <span className="text-gray-700 dark:text-gray-200 font-medium text-center">
          lub
        </span>

        <button
          type="button"
          onClick={switchToRegister}
          className="
            cursor-pointer w-full
            border-2 border-indigo-500
            text-indigo-600
            py-4 rounded-xl
            hover:bg-indigo-50 dark:hover:bg-gray-800
            transition-colors duration-200 ease-in-out
          "
        >
          Stwórz konto
        </button>
      </div>
    </form>
  );
}
