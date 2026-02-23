import React from "react";

export default function AuthInput({ label, type, value, onChange, placeholder, error }) {
  return (
    <div className="flex flex-col w-full">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none
          ${error ? "border-red-500" : "border-gray-300"}`}
      />
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
}