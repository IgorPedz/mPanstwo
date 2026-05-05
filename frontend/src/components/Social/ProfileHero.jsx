import ICON_MAP from "../../Utils/Icons";

const ProfileHero = ({ user }) => {
  const UserIcon = ICON_MAP["user"];
  const SparklesIcon = ICON_MAP["sparkles"];

  return (
    <div className="flex justify-center">
      <div className="
        relative w-full max-w-2xl
        overflow-hidden rounded-2xl
        border border-gray-200 dark:border-gray-800
        text-gray-900 dark:text-white
        p-8 text-center shadow-sm
        transition-colors duration-200
      ">

        {/* tło dekoracyjne */}
        <div className="absolute -top-16 -right-16 h-48 w-48 blur-3xl opacity-10 bg-blue-500 dark:bg-purple-500" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 blur-3xl opacity-10 bg-indigo-500 dark:bg-indigo-400" />

        <div className="relative z-10 flex flex-col items-center gap-5">

          {/* avatar */}
          <div className="
            h-20 w-20 rounded-full
            flex items-center justify-center
            border border-gray-200 dark:border-gray-800
            text-gray-700 dark:text-white
          ">
            <UserIcon className="h-10 w-10" />
          </div>

          <h1 className="text-2xl font-bold flex items-center gap-2">
            {user?.name || "Użytkownik"}
            <SparklesIcon className="h-5 w-5 text-yellow-400" />
          </h1>
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            {user?.role || "Brak roli"}
          </p>
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            {user?.email}
          </p>

        </div>
      </div>
    </div>
  );
};

export default ProfileHero;