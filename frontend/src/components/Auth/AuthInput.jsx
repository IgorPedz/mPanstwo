export default function AuthInput({
  label,
  type = "text",
  name,
  placeholder,
  formData,
  setFormData,
  error,
}) {
  const handleChange = (e) => {
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col gap-1 mb-4 color-transition">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-600 dark:text-gray-300 color-transition">
          {label}
        </label>
      )}

      <input
        id={name}
        type={type}
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete={
          type === "password"
            ? "current-password"
            : type === "email"
            ? "email"
            : "off"
        }
        className="
          auth-input px-4 py-2 rounded-xl border
          bg-gray-100 dark:bg-gray-800
          text-gray-800 dark:text-white
          border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-1 focus:ring-indigo-500
          color-transition
        "
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />

      {error && (
        <p id={`${name}-error`} className="text-sm text-red-600 dark:text-red-400 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}