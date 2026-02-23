import React from "react";

export default function AuthButton({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all disabled:bg-gray-300 disabled:text-gray-500"
    >
      {children}
    </button>
  );
}