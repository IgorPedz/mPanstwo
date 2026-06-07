export const TYPE_VALUES = [
  "all", "rzadowy", "poselski", "senacki",
  "obywatelski", "prezydencki", "pilny", "inny",
];

export function getTypes(t) {
  return TYPE_VALUES.map((value) => ({
    value,
    label: t(`institution.legislation.types.${value}`),
  }));
}

export function getTypeLabel(t, type) {
  return t(`institution.legislation.typeLabels.${type}`, {
    defaultValue: t("institution.legislation.typeLabels.inny"),
  });
}

export const TYPE_BADGE = {
  rzadowy:     "bg-blue-100  dark:bg-blue-900/40  text-blue-700  dark:text-blue-300",
  poselski:    "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
  senacki:     "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300",
  obywatelski: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
  prezydencki: "bg-red-100   dark:bg-red-900/40   text-red-700   dark:text-red-300",
  pilny:       "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300",
  inny:        "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300",
};

export const TYPE_GRADIENT = {
  rzadowy:     "from-blue-700   to-blue-500",
  poselski:    "from-green-700  to-green-500",
  senacki:     "from-purple-700 to-purple-500",
  obywatelski: "from-amber-700  to-amber-500",
  prezydencki: "from-red-700    to-red-500",
  pilny:       "from-orange-700 to-orange-500",
  inny:        "from-slate-600  to-slate-400",
};

export const TYPE_LABELS = {
  rzadowy:     "Rządowy",
  poselski:    "Poselski",
  senacki:     "Senacki",
  obywatelski: "Obywatelski",
  prezydencki: "Prezydencki",
  pilny:       "Pilny",
  inny:        "Inny",
};

/** Bezpośredni link do PDF z API Sejmu: /prints/{num}/{filename} */
export function getPdfUrl(printNum, filename) {
  return `https://api.sejm.gov.pl/sejm/term10/prints/${printNum}/${filename}`;
}

export function formatDate(str) {
  if (!str) return null;
  const date = new Date(str);
  if (isNaN(date.getTime())) return str;
  const d = String(date.getUTCDate()).padStart(2, "0");
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const y = date.getUTCFullYear();
  return `${d}.${m}.${y}`;
}
