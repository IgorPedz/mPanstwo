import FAQItem from "./FAQItem";

export default function FAQList({ faqs, openIndex, onToggle }) {
  if (faqs.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        Brak pasujących pytań.
      </p>
    );
  }

  return (
    <div className="w-full space-y-4">
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          faq={faq} 
          isOpen={openIndex === index}
          onToggle={() => onToggle(index)}
        />
      ))}
    </div>
  );
}