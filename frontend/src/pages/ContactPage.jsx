import Footer from "../components/Info/Footer";
import heroImage from "../../public/images/heroImageContact.jpg";
import ReturnBtn from "../components/Info/ReturnBtn";
import ContactHero from "../components/Contact/ContactHero";
import ContactCards from "../components/Contact/ContactBar";
import ContactForm from "../components/Contact/ContactForm";
import { useUser } from "../Contexts/UserContext";

// --- MAIN PAGE ---
export default function ContactPage() {
  const { user } = useUser();
  const isLoggedIn = !!user?.id;

  return (
    <div
      className="space-y-6"
    >
      {!isLoggedIn && <ReturnBtn />}

      <ContactHero />
      <ContactCards />
      <ContactForm />

      {!isLoggedIn && <Footer />}
    </div>
  );
}
