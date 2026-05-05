import { useUser } from "../Contexts/UserContext";
import useProfile from "../Hooks/useProfile";

import ProfileHero from "../components/Social/ProfileHero";
import ProfileCard from "../components/Social/ProfileCard";
import ChangeEmailCard from "../components/Social/ChangeEmailCard";
import ChangePasswordCard from "../components/Social/ChangePasswordCard";
import DeleteAccountCard from "../components/Social/DeleteAccountCard";
import ChangeNameCard from "../components/Social/ChangeNameCard";

const ProfilePage = () => {
  const { user: authUser } = useUser();
  const { profile, loading, error, updateProfile, changeEmail, changePassword, deleteAccount } = useProfile(authUser?.id);

  const stats = [
    { title: "Dni aktywności", value: 24, icon: "calendar", color: "gray" },
    { title: "Ostatnia aktywność", value: "2h temu", icon: "clock", color: "zinc" },
    { title: "Śledzone ustawy", value: 7, icon: "documents", color: "indigo" },
    { title: "Rola", value: "Ekspert", icon: "achievements", color: "purple" },
    { title: "Oddane głosy", value: 128, icon: "vote", color: "blue" },
    { title: "Napisane Opinie", value: 34, icon: "comments", color: "emerald" },
    { title: "Ukończone kursy", value: 6, icon: "courses", color: "purple" },
    { title: "Punkty reputacji", value: 860, icon: "star", color: "yellow" },
  ];

  if (loading) {
    return (
      <div className="p-6 space-y-6 min-h-screen flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Ładowanie profilu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6 min-h-screen flex items-center justify-center">
        <div className="text-red-500">Błąd: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 min-h-screen">
      <ProfileHero user={profile} updateProfile={updateProfile} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {stats.map((s, i) => (
          <ProfileCard key={i} {...s} />
        ))}
      </div>

      <div className="mt-12 space-y-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ustawienia konta</h2>
          <p className="text-gray-500 dark:text-gray-400">Zarządzaj swoimi danymi i bezpieczeństwem</p>
        </div>

        <ChangeEmailCard  changeEmail={changeEmail} />
        <ChangePasswordCard changePassword={changePassword} />
        <DeleteAccountCard deleteAccount={deleteAccount} />
        <ChangeNameCard updateProfile={updateProfile} />
      </div>
    </div>
  );
};

export default ProfilePage;
