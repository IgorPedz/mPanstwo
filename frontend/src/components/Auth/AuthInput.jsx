import { useState } from "react";

export default function AuthInput({
  label,
  type = "text",
  name,
  placeholder,
  formData,
  setFormData,
  errors,
  validate, 
}) {
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (validate) {
      const error = validate(value);
      setErrorMessage(error || "");
    }
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
          ${errors?.[name] || errorMessage ? "border-red-500 focus:ring-red-500" : ""}
        `}  
      />

      {(errors?.[name] || errorMessage) && (
        <span className="text-xs text-red-500 mt-1">
          {errors?.[name] || errorMessage}
        </span>
      )}
    </div>
  );
}