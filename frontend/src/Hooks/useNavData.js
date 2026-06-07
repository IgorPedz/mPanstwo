import { useTranslation } from "react-i18next";

export const useNavData = () => {
  const { t } = useTranslation();

  const sections = [
    {
      key: "main",
      title: t("nav.sections.main"),
      items: [
        { name: t("nav.items.dashboard"), icon: "dashboard", href: "/dashboard", activeFor: ["/ministry/", "/president", "/sejm", "/senat", "/clubs", "/instytucja/", "/courts/"] },
        { name: t("nav.items.legislation"), icon: "document", href: "/legislation", activeFor: ["/legislation/"] },
      ],
    },
    {
      key: "education",
      title: t("nav.sections.education"),
      items: [
        { name: t("nav.items.courses"), icon: "courses", href: "/courses" },
      ],
    },
    {
      key: "profile",
      title: t("profile.myProfile"),
      items: [
        { name: t("nav.items.myProfile"), icon: "profile", href: "/profile" },
        { name: t("nav.items.achievements"), icon: "achievements", href: "/achievements" },
        { name: t("nav.items.surveyBox"), icon: "survey", href: "/survey-box" },
        {
          name: t("nav.items.notifications"),
          icon: "notifications",
          href: "/notifications",
          badge: "notifications",
        },
      ],
    },
    {
      key: "page",
      title: t("nav.sections.page"),
      items: [
        { name: t("nav.items.documents"), icon: "documents", href: "/documents" },
        { name: t("nav.items.contact"), icon: "contact", href: "/contact" },
        { name: t("nav.items.help"), icon: "about", href: "/faq" },
        { name: t("nav.items.facts"), icon: "info", href: "/facts" },
      ],
    },
  ];

  return sections;
};