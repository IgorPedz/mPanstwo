import {
  DocumentTextIcon,
  CheckCircleIcon,
  ChatBubbleLeftEllipsisIcon,
  ShieldCheckIcon,
  BuildingLibraryIcon,
  BuildingOfficeIcon,
  ScaleIcon,
  InformationCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const SOURCE_ICONS = [
  BuildingLibraryIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  InformationCircleIcon,
  ScaleIcon,
  BuildingLibraryIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
];

const RELIABILITY_ICONS = [
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ChatBubbleLeftEllipsisIcon,
  InformationCircleIcon,
  ShieldCheckIcon,
];

const BADGE_COLOR =
  "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300";

export function getSources(t) {
  const items = t("facts.sources.items", { returnObjects: true });
  const badge = t("facts.sources.official");
  return items.map((item, i) => ({
    ...item,
    icon: SOURCE_ICONS[i],
    badge,
    badgeColor: BADGE_COLOR,
  }));
}

export function getReliability(t) {
  const items = t("facts.reliability.items", { returnObjects: true });
  return items.map((item, i) => ({
    ...item,
    icon: RELIABILITY_ICONS[i],
  }));
}
