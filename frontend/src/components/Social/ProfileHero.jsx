import { useState } from "react";
import ICON_MAP from "../../Utils/Icons";

const ProfileHero = ({ user, setUser }) => {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(user);

  const UserIcon = ICON_MAP["user"];
  const SparklesIcon = ICON_MAP["sparkles"];
  const PencilIcon = ICON_MAP["pencil"];
  const CheckIcon = ICON_MAP["check"];

  const handleSave = () => {
    setUser(form);
    setEdit(false);
  };

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

        {/* BLOBS (fixed repaint-safe) */}
        <div className="absolute -top-16 -right-16 h-48 w-48 blur-3xl opacity-10 bg-blue-500 dark:bg-purple-500" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 blur-3xl opacity-10 bg-indigo-500 dark:bg-indigo-400" />

        <div className="relative z-10 flex flex-col items-center gap-5">

          {/* AVATAR */}
          <div className="
            h-20 w-20 rounded-full
            flex items-center justify-center
            border border-gray-200 dark:border-gray-800
            text-gray-700 dark:text-white
            transition-colors duration-200
          ">
            <UserIcon className="h-10 w-10" />
          </div>

          {!edit ? (
            <>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {user.name}
                <SparklesIcon className="h-5 w-5 text-yellow-400" />
              </h1>

              <p className="text-gray-500 dark:text-gray-300 text-sm">
                {user.email}
              </p>

              <span className="
                px-3 py-1 text-xs rounded-full
                border border-gray-200 dark:border-gray-800
                text-gray-600 dark:text-gray-300
                transition-colors duration-200
              ">
                {user.role}
              </span>

              <button
                onClick={() => setEdit(true)}
                className="
                  mt-4 flex items-center gap-2 px-4 py-2 rounded-xl
                  border border-gray-200 dark:border-gray-800
                  text-blue-600 dark:text-white
                  hover:border-gray-300 dark:hover:border-gray-700
                  transition-colors duration-200 cursor-pointer
                "
              >
                <PencilIcon className="h-4 w-4" />
                Edytuj profil
              </button>
            </>
          ) : (
            <div className="w-full space-y-3 mt-2">

              <input
                className="
                  w-full px-3 py-2 rounded-lg
                  border border-gray-300 dark:border-gray-700
                  bg-transparent text-gray-900 dark:text-white
                  outline-none
                  transition-colors duration-200
                "
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="
                  w-full px-3 py-2 rounded-lg
                  border border-gray-300 dark:border-gray-700
                  bg-transparent text-gray-900 dark:text-white
                  outline-none
                  transition-colors duration-200
                "
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <div className="flex gap-2 justify-center pt-2">

                <button
                  onClick={handleSave}
                  className="
                    flex items-center gap-1 px-4 py-2 rounded-xl
                    bg-green-500 hover:bg-green-600
                    text-white transition cursor-pointer
                  "
                >
                  <CheckIcon className="h-4 w-4" />
                  Zapisz
                </button>

                <button
                  onClick={() => setEdit(false)}
                  className="
                    px-4 py-2 rounded-xl
                    border border-gray-300 dark:border-gray-700
                    text-gray-700 dark:text-white
                    hover:border-gray-400 dark:hover:border-gray-600
                    transition-colors duration-200 cursor-pointer
                  "
                >
                  Anuluj
                </button>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProfileHero;