import { useMemo } from "react";

export default function PasswordStrength({ password }) {
  if(!password) return null
  const strength = useMemo(() => {

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) {
      return {
        score,
        label: "Słabe hasło",
        color: "bg-red-500",
        text: "text-red-500",
        width: "33%",
      };
    }

    if (score <= 3) {
      return {
        score,
        label: "Średnie hasło",
        color: "bg-yellow-500",
        text: "text-yellow-500",
        width: "66%",
      };
    }

    return {
      score,
      label: "Silne hasło",
      color: "bg-emerald-500",
      text: "text-emerald-500",
      width: "100%",
    };
  }, [password]);

  return (
    <div className="space-y-2">
      <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${strength.color}`}
          style={{ width: strength.width }}
        />
      </div>

      <div className="flex justify-between items-center">
        <span
          className={`text-[10px] uppercase tracking-widest font-bold ${strength.text}`}
        >
          {strength.label}
        </span>

        <span className="text-[10px] text-slate-400">
          min. 8 znaków
        </span>
      </div>
    </div>
  );
}