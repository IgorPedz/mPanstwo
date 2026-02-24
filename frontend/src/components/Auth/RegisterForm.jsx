import AuthInput from "./AuthInput";

export default function RegisterForm({
  formData,
  setFormData,
  onSubmit,
  errors
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col">

      <AuthInput
        label="Imię"
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

      <button
        type="submit"
        className="cursor-pointer w-full mt-4 bg-purple-600 hover:bg-purple-700 
        text-white py-2 rounded-xl transition"
      >
        Zarejestruj się
      </button>

    </form>
  );
}