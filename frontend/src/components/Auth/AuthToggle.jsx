import React from "react";

export default function AuthToggle({ isLogin, setIsLogin }) {
  return (
    <p className="text-sm text-gray-600 text-center">
      {isLogin ? "Nie masz konta?" : "Masz już konto?"}{" "}
      <span
        onClick={() => setIsLogin(!isLogin)}
        className="text-blue-600 font-semibold cursor-pointer hover:underline"
      >
        {isLogin ? "Zarejestruj się" : "Zaloguj się"}
      </span>
    </p>
  );
}