import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useUser } from "../../Contexts/UserContext";
import useUserSecurity from "../../Hooks/useUserSecurity";

const calcScore = (isVerified, hasStrongPassword) => {
  if (isVerified && hasStrongPassword) return 100;
  if (isVerified || hasStrongPassword) return 50;
  return 0;
};

export default function ProfileSecurityStatus() {
  const { user } = useUser();

  const { fetchSecurity } = useUserSecurity();
  
  const [isVerified, setIsVerified] = useState(false);
  const [hasStrongPassword, setHasStrongPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user?.id) return;

      const res = await fetchSecurity(user.id);

      if (res?.success) {
        setIsVerified(Boolean(res.is_verified));
        setHasStrongPassword(Boolean(res.has_strong_password));
      }

      setLoading(false);
    };

    load();
  }, [fetchSecurity, user?.id]);

  const score = calcScore(isVerified, hasStrongPassword);

  if (loading) return null;

  return (
    <div className="w-full space-y-4 color-transition">

      {/* HEADER */}
      <div className="flex justify-between items-end">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 color-transition">
          <ShieldCheckIcon className="h-3 w-3" />
          Bezpieczeństwo konta
        </span>

        <span
          className={`
            text-sm font-black color-transition
            ${
              score === 100
                ? "text-emerald-500"
                : score === 50
                ? "text-yellow-500"
                : "text-red-500"
            }
          `}
        >
          {score}/100
        </span>
      </div>
      <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-full p-1 color-transition">
        <motion.div
          className={`h-full rounded-full color-transition ${
            score === 100
              ? "bg-emerald-500"
              : score === 50
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1 }}
        />
      </div>

      <div className="space-y-1 text-xs font-bold uppercase tracking-widest">

        <p
          className={`color-transition ${
            isVerified ? "text-emerald-500" : "text-red-500"
          }`}
        >
          {isVerified ? "ZWERYFIKOWANY" : "NIEZWERYFIKOWANY"}
        </p>

        <p
          className={`color-transition ${
            hasStrongPassword ? "text-emerald-500" : "text-red-500"
          }`}
        >
          {hasStrongPassword ? "SILNE HASŁO" : "BRAK SILNEGO HASŁA"}
        </p>

      </div>

    </div>
  );
}