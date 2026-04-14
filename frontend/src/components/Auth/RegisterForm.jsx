import AuthInput from "./AuthInput";

export default function RegisterForm({
  formData,
  setFormData,
  onSubmit,
  switchToLogin
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <AuthInput
        label="Nazwa użytkownika"
        type="text"
        name="name"
        placeholder="Wpisz nazwę użytkownika"
        formData={formData}
        setFormData={setFormData}
      />

      <AuthInput
        label="Email"
        type="email"
        name="email"
        placeholder="Wpisz email"
        formData={formData}
        setFormData={setFormData}
      />

      <AuthInput
        label="Hasło"
        type="password"
        name="password"
        placeholder="Wpisz hasło"
        formData={formData}
        setFormData={setFormData}
      />

      <div className="flex flex-col gap-4 mt-4">
        <button
          type="submit"
          className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl transition"
        >
          Zarejestruj się
        </button>
        <span className="text-gray-700 dark:text-gray-200 font-medium text-center">lub</span>
        <button
          type="button"
          onClick={switchToLogin}
          className="cursor-pointer w-full border-2 border-indigo-500 text-indigo-600 py-4 rounded-xl hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
        >
          Masz już konto?
        </button>
      </div>

    </form>
  );
}