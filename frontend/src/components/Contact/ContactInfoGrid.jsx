import ContactInfoCard from "./ContactInfoCard";

export default function ContactInfoGrid({ contactInfo = [] }) { // Dodałem domyślną pustą tablicę
  
  // Zabezpieczenie: jeśli contactInfo nie jest tablicą lub jest pusta
  if (!Array.isArray(contactInfo) || contactInfo.length === 0) {
    return (
      <div className="w-full p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] text-center color-transition">
        <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">
          Brak danych kontaktowych do wyświetlenia
        </p>
      </div>
    );
  }
  console.log(contactInfo)
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 color-transition">
      {contactInfo.map((info, idx) => (
        <ContactInfoCard key={idx} contactInfo={info} />
      ))}
    </div>
  );
}