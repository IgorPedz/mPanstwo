import AuthInput from "./AuthInput";

export default function RegisterForm({
  formData,
  setFormData,
  onSubmit,
  errors,
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
        errors={errors}
      />

      <AuthInput
        label="Email"
        type="email"
        name="email"
        placeholder="Wpisz email"
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />

      <AuthInput
        label="Hasło"
        type="password"
        name="password"
        placeholder="Wpisz hasło"
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />

      <div className="flex gap-20">
        <button
          type="submit"
          className="cursor-pointer w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl"
        >
          Zarejestuj się
        </button>

        <button
          type="button"
          onClick={switchToLogin}
          className="cursor-pointer w-full mt-4 border-2 border-indigo-500 text-indigo-600 py-4 rounded-xl hover:bg-indigo-50 dark:hover:bg-gray-800 dark:text-white transition"
        >
          Masz już konto?
        </button>
      </div>

    </form>
  );
}