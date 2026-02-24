import AuthInput from "./AuthInput";

export default function LoginForm({
  formData,
  setFormData,
  onSubmit,
  errors
}) {
  return (
    <form onSubmit={onSubmit}>

      <AuthInput
        label="Email"
        type="email"
        name="email"
        formData={formData}
        setFormData={setFormData}  // <- TO JEST KLUCZ
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

      <button
        type="submit"
        className="cursor-pointer w-full mt-4 bg-indigo-600 text-white py-2 rounded-xl"
      >
        Zaloguj się
      </button>
    </form>
  );
}