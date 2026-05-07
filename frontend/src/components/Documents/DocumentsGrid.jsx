import { DocumentArrowDownIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import DocumentCard from "./DocumentsCard";

export default function DocumentsGrid({ documents }) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 color-transition">
      {documents.map((doc, index) => (
        <DocumentCard key={index} doc={doc} />
      ))}
    </div>
  );
}