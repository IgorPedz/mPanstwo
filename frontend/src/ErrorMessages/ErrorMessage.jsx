import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function ErrorMessage({ message, onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose(); 
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null; 

  return (
    <div className="fixed bottom-5 right-5 max-w-xs w-full z-50">
      <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg flex items-start gap-3 animate-slide-in">
        <div className="flex-1 text-sm">{message}</div>
        <button
          onClick={onClose}
          className="cursor-pointer ml-3 text-white/80 hover:text-white transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
