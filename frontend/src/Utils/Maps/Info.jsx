import {
  CheckCircleIcon,
  XMarkIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

const NOTIFICATION_CONFIG = {
  success: {
    base: "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
    accent: "bg-emerald-500",
    Icon: CheckCircleIcon,
  },

  error: {
    base: "bg-red-100 dark:bg-red-950 border-2 border-red-500 text-red-900 dark:text-red-200",
    accent: "bg-red-600",
    Icon: XMarkIcon,
  },

  info: {
    base: "bg-blue-50 dark:bg-blue-950/30 border border-blue-500/30 text-blue-700 dark:text-blue-300",
    accent: "bg-blue-500",
    Icon: InformationCircleIcon,
  },

  warning: {
    base: "bg-amber-50 dark:bg-amber-950/30 border border-amber-500/30 text-amber-700 dark:text-amber-300",
    accent: "bg-amber-500",
    Icon: ExclamationCircleIcon,
  },
};

export default NOTIFICATION_CONFIG;
