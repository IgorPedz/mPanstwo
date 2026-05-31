import TextModule from "./TextModule";
import CardModule from "./CardModule";
import InfoModule from "./InfoModule";

export default function ModuleRenderer({ module, text }) {
  switch (module.type) {
    case "text":
      return <TextModule text={text} />;

    case "card":
      return <CardModule text={text} />;

    case "info":
      return <InfoModule text={text} />;

    default:
      return (
        <div className="p-4 rounded-2xl border border-red-500/30 bg-red-500/10 text-red-300 color-transition">
          Nieznany moduł: {module.type}
        </div>
      );
  }
}