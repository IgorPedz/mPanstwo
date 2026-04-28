import ICON_MAP from "../../Utils/Icons";
import ContactCard from "./ContactCard";

export default function ContactBar() {
  const EnvelopeIcon = ICON_MAP["contact"];
  const PhoneIcon = ICON_MAP["phone"];
  const MapPinIcon = ICON_MAP["map"];

  return (
    <div className="flex flex-col md:flex-row gap-6 -mt-24 px-6 md:px-16 relative z-10">
      <ContactCard
        Icon={EnvelopeIcon}
        title="E-mail"
        value="kontakt@twojadomena.pl"
        color="text-blue-500"
      />

      <ContactCard
        Icon={PhoneIcon}
        title="Telefon"
        value="+48 123 456 789"
        color="text-green-500"
      />

      <ContactCard
        Icon={MapPinIcon}
        title="Adres"
        value="ul. Przykładowa 12, 00-000 Miasto"
        color="text-red-500"
      />
    </div>
  );
}
