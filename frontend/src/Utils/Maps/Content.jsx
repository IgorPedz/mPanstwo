import {
  DocumentTextIcon,
  CheckCircleIcon,
  ChatBubbleLeftEllipsisIcon,
  ShieldCheckIcon,
  BuildingLibraryIcon,
  BuildingOfficeIcon,
  ScaleIcon,
  InformationCircleIcon,
  ArrowTopRightOnSquareIcon,
  ClockIcon,
  ExclamationCircleIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

export const SOURCES = [
  {
    icon: BuildingLibraryIcon,
    name: "API Sejmu RP",
    url: "https://api.sejm.gov.pl",
    desc: "Oficjalne, publiczne API Kancelarii Sejmu. Udostępnia dane o drukach sejmowych, procesach legislacyjnych, posłach, głosowaniach i interpelacjach w czasie rzeczywistym.",
    badge: "Oficjalne",
    badgeColor:
      "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
  },
  {
    icon: DocumentTextIcon,
    name: "Druki sejmowe (ORKA)",
    url: "https://orka.sejm.gov.pl",
    desc: "Dokumenty PDF projektów ustaw pobierane bezpośrednio z systemu ORKA Sejmu RP. Zawierają pełne treści projektów, uzasadnienia i załączniki.",
    badge: "Oficjalne",
    badgeColor:
      "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
  },
  {
    icon: BuildingOfficeIcon,
    name: "Ministerstwa — gov.pl",
    url: "https://www.gov.pl",
    desc: "Portal Rządu RP. Dane o ministerstwach, strukturze rządu, kierownictwach i zakresie kompetencji poszczególnych resortów pobierane ze stron ministerstw.",
    badge: "Oficjalne",
    badgeColor:
      "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
  },
  {
    icon: ScaleIcon,
    name: "Naczelny Sąd Administracyjny",
    url: "https://www.nsa.gov.pl",
    desc: "NSA — sąd kontrolujący działalność administracji publicznej. Dane o strukturze, orzecznictwie i składzie sądu pobierane z oficjalnej strony instytucji.",
    badge: "Oficjalne",
    badgeColor:
      "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
  },
  {
    icon: BuildingLibraryIcon,
    name: "Sąd Najwyższy",
    url: "https://www.sn.pl",
    desc: "SN — najwyższy organ sądowy w sprawach karnych i cywilnych. Dane o składzie, izbach i orzecznictwie pobierane z oficjalnej strony Sądu Najwyższego.",
    badge: "Oficjalne",
    badgeColor:
      "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
  },
  {
    icon: ShieldCheckIcon,
    name: "Trybunał Konstytucyjny",
    url: "https://www.trybunal.gov.pl",
    desc: "TK — organ kontroli konstytucyjności prawa. Dane o sędziach, składzie i orzeczeniach pobierane z oficjalnej strony Trybunału Konstytucyjnego.",
    badge: "Oficjalne",
    badgeColor:
      "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
  },
  {
    icon: GlobeAltIcon,
    name: "Krajowa Rada Sądownictwa",
    url: "https://www.krs.pl",
    desc: "KRS — organ stojący na straży niezależności sądów i niezawisłości sędziów. Dane o składzie i działalności pobierane z oficjalnej strony Rady.",
    badge: "Oficjalne",
    badgeColor:
      "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
  },
];

export const RELIABILITY = [
  {
    icon: CheckCircleIcon,
    title: "Ograniczenia stron rządowych",
    desc: "Wyświetlamy wyłacznie informacje oficjalne, ale strony rządowe mogą mieć krótkie przerwy techniczne lub opóźnienia w aktualizacji danych. Zawsze sprawdzaj oficjalne źródła w przypadku wątpliwości.",
  },
  {
    icon: ClockIcon,
    title: "Cache 30 minut",
    desc: "Dane są odświeżane co 30 minut z oficjalnego API. Mogą istnieć krótkie rozbieżności między stanem faktycznym a wyświetlanymi informacjami.",
  },
  {
    icon: ExclamationCircleIcon,
    title: "Ograniczenia API",
    desc: "API Sejmu jest publiczne, ale może nie zawierać 100% danych w czasie rzeczywistym. W przypadku wątpliwości zawsze sprawdź oficjalną stronę sejm.gov.pl.",
  },
  {
    icon: ChatBubbleLeftEllipsisIcon,
    title: "Opinie użytkowników",
    desc: "Komentarze i opinie na platformie mPaństwo są tworzone przez użytkowników. Nie reprezentują stanowiska Sejmu ani żadnej instytucji państwowej.",
  },
];