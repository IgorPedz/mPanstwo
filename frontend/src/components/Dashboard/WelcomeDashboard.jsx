import { useUser } from "../../Contexts/UserContext";

export default function WelcomeDashboard() {
  const { user } = useUser();

  return (
    <div className="flex justify-between">
      <p
        className="text-2xl md:text-4xl text-blue-900 dark:text-blue-400 mb-4 color-transition animate-fade-in animate-text-pulse"
        style={{ fontFamily: "'Patrick Hand', cursive" }}
      >
        Witaj, {user.name}!
      </p>
    </div>
  );
}