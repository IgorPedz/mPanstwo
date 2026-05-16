import AuthInput from "./AuthInput";
import PasswordStrength from "./PasswordStrength";

export default function RegisterForm({
  formData,
  setFormData,
  errors,
  handleSubmit,
  onSubmit,
  switchToLogin,
}) {
  const handleFormSubmit = handleSubmit(onSubmit, false);

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div className="space-y-2">
        <AuthInput
          label="Nazwa użytkownika"
          type="text"
          name="name"
          placeholder="Nazwa"
          formData={formData}
          setFormData={setFormData}
          error={errors.name}
        />

        <AuthInput
          label="Adres Email"
          type="email"
          name="email"
          placeholder="Email"
          formData={formData}
          setFormData={setFormData}
          error={errors.email}
        />

        <AuthInput
          label="Hasło"
          type="password"
          name="password"
          placeholder="Hasło"
          formData={formData}
          setFormData={setFormData}
          error={errors.password}
        />
      </div>

      <PasswordStrength password={formData.password} />

      <div className="flex flex-col gap-4 pt-4">
        <button
          type="submit"
          className="
            group relative cursor-pointer w-full
            bg-indigo-600 text-white py-5 rounded-2xl
            text-[12px] font-black uppercase tracking-[0.3em]
            border-2 border-slate-900
            transition-all duration-200 active:scale-[0.98] hover:bg-indigo-700
          "
        >
          Zarejestruj się
        </button>

        <div className="relative py-4 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="transition-colors w-full border-t-2 border-slate-100 dark:border-slate-800"></div>
          </div>
          <span className="transition-colors relative px-4 bg-white dark:bg-[#111827] text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Posiadasz już dostęp?
          </span>
        </div>

        <button
          type="button"
          onClick={switchToLogin}
          className="transition-colors
            cursor-pointer w-full
            bg-white dark:bg-slate-900 
            border-2 border-slate-900 dark:border-slate-100
            text-slate-900 dark:text-white py-5 rounded-2xl
            text-[12px] font-black uppercase tracking-[0.3em]
            shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)]
            hover:bg-slate-100 dark:hover:bg-slate-800
            transition-all active:scale-[0.98]
          "
        >
          Zaloguj się
        </button>
      </div>
    </form>
  );
}
