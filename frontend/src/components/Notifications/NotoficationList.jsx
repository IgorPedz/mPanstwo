import NotificationItem from "./NotoficationItem";

export default function NotificationsList({ title, items, emptyText }) {
  return (
    <div className="mb-10">
      <h2 className="text-sm uppercase tracking-widest text-slate-400 mb-4">
        {title}
      </h2>

      <div className="space-y-3">
        {items.length > 0 ? (
          items.map((notif) => (
            <NotificationItem
              key={`${notif.id}-${notif.time}`}
              notif={notif}
            />
          ))
        ) : (
          <div className="py-10 text-center opacity-50 text-slate-400">
            {emptyText}
          </div>
        )}
      </div>
    </div>
  );
}