import { motion } from "framer-motion";
import { containerVariants } from "../../Utils/Animations";
import NotificationItem from "../../components/Notifications/NotoficationItem";
import NotificationsHeader from "../../components/Notifications/NotoficationHeader";
import NotificationFooter from "../../components/Notifications/NotoficationFooter";

export default function NotificationsPage() {
  const notifications = [
    { id: 1, type: "law", title: "Nowa Ustawa", body: "Projekt o ochronie lasów wpłynął do I czytania.", time: "12 min temu", urgent: true },
    { id: 2, type: "ranking", title: "Zmiana w Rankingu", body: "Twój śledzony poseł awansował o 4 pozycje.", time: "2 godz. temu", urgent: false },
    { id: 3, type: "achievement", title: "Osiągnięcie Odblokowane", body: "Gratulacje! Zdobyłeś status 'Analityk Sejmowy'.", time: "5 godz. temu", urgent: false },
    { id: 4, type: "survey", title: "Wyniki Ankiety", body: "Zakończono głosowanie w sprawie CPK. Zobacz wyniki.", time: "Wczoraj", urgent: false },
  ];

  const handleClearAll = () => {
    console.log("Czyszczenie powiadomień...");
  };

  return (
    <motion.div 
      className="w-full min-h-screen p-8 color-transition"
      variants={containerVariants} 
      initial="hidden" 
      animate="show"
    >
      <div className="max-w-[1880px] mx-auto">
        <NotificationsHeader onClearAll={handleClearAll} />

        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <NotificationItem key={notif.id} notif={notif} />
            ))
          ) : (
            <div className="py-20 text-center opacity-50 font-bold uppercase tracking-[0.3em] text-slate-400">
              Brak nowych powiadomień
            </div>
          )}
        </div>
          <NotificationFooter />
      </div>
    </motion.div>
  );
}