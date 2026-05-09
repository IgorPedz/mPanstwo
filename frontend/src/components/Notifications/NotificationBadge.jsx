import { useNotificationStore } from "../../store/useNotificationStore";

export default function NavBadge({ type }) {
  const unreadCount = useNotificationStore((s) =>
    s.notifications.filter((n) => !n.read).length
  );

  if (type === "notifications" && unreadCount === 0) return null;

  if (type === "notifications") {
    return (
      <span
        className="
          absolute -top-1 -right-1
          bg-red-500 text-white
          text-[10px] font-black
          px-1.5 py-0.5
          rounded-full
          min-w-[18px]
          h-[18px]
          flex items-center justify-center
          leading-none
          shadow-lg
          pointer-events-none
          z-50
        "
      >
        {unreadCount > 99 ? "99+" : unreadCount}
      </span>
    );
  }

  return null;
}