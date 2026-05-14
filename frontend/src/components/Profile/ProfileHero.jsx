import { motion } from "framer-motion";
import ICON_MAP from "../../Utils/Maps/Icons";
import ProfileVerificationStatus from "./ProfileSecurityStatus"
const ProfileHero = ({ profile }) => {
  const ShieldIcon = ICON_MAP["shield"] || ICON_MAP["zap"];
  return (
    <section className="mb-10 bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800 color-transition">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex items-center gap-6 min-w-[350px]">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 text-4xl font-black shadow-2xl color-transition uppercase">
              {profile?.name?.charAt(0) || "U"}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-md border-2 border-white dark:border-slate-900 color-transition uppercase">
              Konto
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none color-transition">
              {profile?.name || "Użytkownik"}
            </h2>
          </div>
        </div>

        <ProfileVerificationStatus level={profile.verification_level} />

        <div className="flex gap-10">
          {[
            {
              val: profile?.createdAt
                ? new Date(profile.createdAt).getFullYear()
                : "—",
              label: "Dołączył",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`
      text-center
      color-transition
      ${item.border ? "border-x border-slate-100 dark:border-slate-800 px-10" : ""}
    `}
            >
              <p className="text-2xl font-black text-slate-900 dark:text-white color-transition">
                {String(item.val).slice(0, 4)}
              </p>

              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest color-transition">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileHero;
