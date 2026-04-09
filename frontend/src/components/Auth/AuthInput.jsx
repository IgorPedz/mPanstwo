export default function AuthInput({
  label,
  type = "text",
  name,
  placeholder,
  formData,
  setFormData,
}) {
  const handleChange = (e) => {
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col gap-1 mb-4">
      {label && (
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className={`
          px-4 py-2 rounded-xl border
          bg-gray-100 dark:bg-gray-700
          text-gray-800 dark:text-white
          border-gray-300 dark:border-gray-600
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          transition-all duration-200
        `}  
      />
    </div>
  );
}