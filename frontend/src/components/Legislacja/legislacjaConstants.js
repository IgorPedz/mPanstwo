export const TYPES = [
  { value: "all",         label: "Wszystkie" },
  { value: "rzadowy",     label: "Rządowe" },
  { value: "poselski",    label: "Poselskie" },
  { value: "senacki",     label: "Senackie" },
  { value: "obywatelski", label: "Obywatelskie" },
  { value: "prezydencki", label: "Prezydenckie" },
  { value: "pilny",       label: "Pilne" },
  { value: "inny",        label: "Inne" },
];

export const TYPE_BADGE = {
  rzadowy:     "bg-blue-100  dark:bg-blue-900/40  text-blue-700  dark:text-blue-300",
  poselski:    "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
  senacki:     "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300",
  obywatelski: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
  prezydencki: "bg-red-100   dark:bg-red-900/40   text-red-700   dark:text-red-300",
  pilny:       "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300",
  inny:        "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300",
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

export function formatDate(str) {
  if (!str) return null;
  const [y, m, d] = str.split("-");
  if (!y) return str;
  return `${d}.${m}.${y}`;
}
