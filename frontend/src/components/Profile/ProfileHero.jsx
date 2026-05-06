import { motion } from "framer-motion";
import ICON_MAP from "../../Utils/Maps/Icons";

const ProfileHero = ({ user }) => {
  const UserIcon = ICON_MAP["user"];

  return (
    <div className="flex justify-center color-transition">
      <motion.div
        className="
          relative w-full max-w-3xl
          rounded-2xl
          border border-gray-200 dark:border-gray-800
          bg-white/70 dark:bg-gray-900/60
          backdrop-blur-xl
          p-6 md:p-8
          shadow-sm
          color-transition
        "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* gradient line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500 rounded-t-2xl" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 color-transition">

          {/* LEFT */}
          <div className="flex items-center gap-4 color-transition">

            {/* Avatar */}
            <div className="
              h-16 w-16 rounded-xl
              flex items-center justify-center
              bg-gradient-to-br from-cyan-500 to-violet-600
              shadow-lg
              color-transition
            ">
              <UserIcon className="h-8 w-8 text-white" />
            </div>

            {/* Name + email */}
            <div className="color-transition">
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white color-transition">
                {user?.name || "Użytkownik"}
              </h1>

              <p className="text-sm text-gray-500 dark:text-gray-400 color-transition">
                {user?.email}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 color-transition">

            {/* Role badge */}
            <div className="
              px-3 py-1 rounded-lg text-sm font-medium
              bg-gray-100 dark:bg-gray-800
              text-gray-700 dark:text-gray-300
              color-transition
            ">
              {user?.role || "Brak roli"}
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 color-transition">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Aktywny
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default ProfileHero;