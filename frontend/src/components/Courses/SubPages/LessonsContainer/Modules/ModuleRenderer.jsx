import TextModule from "./TextModule";
import CardModule from "./CardModule";
import InfoModule from "./InfoModule";

export default function ModuleRenderer({ module }) {
  const content =
    typeof module.content === "string"
      ? JSON.parse(module.content)
      : module.content;

  switch (module.type) {
    case "text":
      return <TextModule data={content} />;

    case "card":
      return <CardModule data={content} />;

    case "info":
      return <InfoModule data={content} />;

    default:
      return (
        <div className="p-4 rounded-2xl border border-red-500/30 bg-red-500/10 text-red-300 color-transition">
          Nieznany moduł: {module.type}
        </div>
      );
  }
}