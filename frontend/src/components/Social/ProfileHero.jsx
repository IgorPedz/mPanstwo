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
    <div className="flex justify-center color-transition">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-8 text-center shadow-sm color-transition">

        {/* BACKGROUND */}
        <div className="absolute -top-16 -right-16 h-48 w-48 bg-blue-200 dark:bg-purple-500 blur-3xl opacity-20 color-transition" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 bg-indigo-200 dark:bg-indigo-500 blur-3xl opacity-20 color-transition" />

        <div className="relative z-10 flex flex-col items-center gap-5">

          {/* AVATAR */}
          <div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center border border-gray-200 dark:border-white/10 color-transition">
            <UserIcon className="h-10 w-10 text-gray-700 dark:text-white color-transition" />
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

              <span className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10">
                {user.role}
              </span>

              <button
                onClick={() => setEdit(true)}
                className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-white/10 hover:bg-blue-100 dark:hover:bg-white/20 text-blue-700 dark:text-white transition cursor-pointer"
              >
                <PencilIcon className="h-4 w-4" />
                Edytuj profil
              </button>
            </>
          ) : (
            <div className="w-full space-y-3 mt-2">

              <input
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 outline-none"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 outline-none"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <div className="flex gap-2 justify-center pt-2">

                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white transition cursor-pointer"
                >
                  <CheckIcon className="h-4 w-4" />
                  Zapisz
                </button>

                <button
                  onClick={() => setEdit(false)}
                  className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white transition cursor-pointer"
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