import { motion } from "framer-motion";
import { containerVariants } from "../../Utils/Animations";
import { useState } from "react";

import ModalMessage from "../../components/Global/Modals/ModalMessage";
import NotificationsHeader from "../../components/Notifications/NotoficationHeader";
import NotificationFooter from "../../components/Notifications/NotoficationFooter";
import NotificationsList from "../../components/Notifications/NotoficationList";

import { useNotificationStore } from "../../store/useNotificationStore";
import { useUser } from "../../Contexts/UserContext";
import { useTranslation } from "react-i18next";
export default function NotificationsPage() {
  const { t } = useTranslation()
  const { user } = useUser();
  const [showClearModal, setShowClearModal] = useState(false);
  const notifications = useNotificationStore((s) => s.notifications);
  const clearRead = useNotificationStore((s) => s.clearRead);

  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);

  const handleClearHistory = () => {
    setShowClearModal(true);
  };

  const handleConfirmClear = () => {
    clearRead(user?.id);
    setShowClearModal(false);
  };

  return (
    <motion.div
      className="w-full min-h-screen p-8 color-transition"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="max-w-[1880px] mx-auto">
        <NotificationsHeader onClearHistory={handleClearHistory} />

        <NotificationsList
          title={t("notifications.new")}
          items={unread}
          emptyText={t("notifications.noNewNotifications")}
        />

        <NotificationsList
          title={t("notifications.history")}
          items={read}
          emptyText={t("notifications.noHistory")}
        />

        <NotificationFooter />

        <ModalMessage
          isOpen={showClearModal}
          title={t("notifications.clearHistory")}
          message={t("notifications.clearMessage")}
          confirmText={t("common.delete")}
          cancelText={t("common.cancel")}
          onCancel={() => setShowClearModal(false)}
          onConfirm={handleConfirmClear}
        />
      </div>
    </motion.div>
  );
}
