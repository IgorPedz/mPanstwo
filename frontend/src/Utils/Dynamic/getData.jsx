export default function getData(rawData) {
  if (!rawData) return {};
  try {
    return typeof rawData === "string" ? JSON.parse(rawData) : rawData;
  } catch {
    return {};
  }
}
