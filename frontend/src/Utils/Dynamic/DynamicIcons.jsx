import ICON_MAP from "../Maps/Icons";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export default function DynamicIcon({ name, className }) {
  const key = name?.trim();

  const IconComponent =
    ICON_MAP?.[key] ||
    ICON_MAP?.[key?.toLowerCase()] ||
    ICON_MAP?.default ||
    QuestionMarkCircleIcon;

  return <IconComponent className={className} />;
}