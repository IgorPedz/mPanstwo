export default function formatDate (dateString)  {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
  }) + ' ' + date.getFullYear();
};