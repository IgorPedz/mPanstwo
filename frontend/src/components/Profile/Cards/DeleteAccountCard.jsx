import { useModalFlow } from "../../../hooks/useModalFlow";
import { useUser } from "../../../Contexts/UserContext";
import ICON_MAP from "../../../Utils/Maps/Icons";
import { ACCENT_MAP } from "../../../Utils/Maps/Accents";
import DeleteAccountFlow from "../flow/DeleteAccountFlow";
import ModalFlow from "../../Global/Modals/ModalFlow";

export default function DeleteAccountCard({ deleteAccount }) {
  const { logout } = useUser();
  const flow = useModalFlow(DeleteAccountFlow);
  const TrashIcon = ICON_MAP["trash"] || ICON_MAP["zap"];

  const gradientClasses = ACCENT_MAP["red"] || "from-red-700 to-red-500";

  const handleSubmit = async (data) => {
    const res = await deleteAccount(data.password);

    if (res.success) {
      setTimeout(() => logout(), 1200);
      return { success: true };
    }
    
    return { success: false, message: res.message };
  };

  return (
    <>
      <div
        onClick={() => flow.setOpen(true)}
        className="
          bg-white dark:bg-slate-900 p-8 rounded-[2rem] 
          border border-slate-200 dark:border-slate-800 shadow-sm 
          transition-all duration-500 color-transition group relative 
          overflow-hidden h-full cursor-pointer
        "
      >
        <div className="absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-10 group-hover:scale-110 transition-all duration-700 pointer-events-none text-red-600">
          <TrashIcon className="h-32 w-32" />
        </div>

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start mb-6">
            
            <div className={`
              p-4 rounded-2xl transition-all duration-500 color-transition
              bg-red-50 dark:bg-red-900/10 text-red-600
              group-hover:bg-gradient-to-br group-hover:shadow-lg group-hover:shadow-red-500/20
              ${gradientClasses.split(' ').map(c => `group-hover:${c}`).join(' ')}
            `}>
              <TrashIcon className="h-6 w-6" />
            </div>
            
            <div className="text-slate-300 group-hover:text-red-500 group-hover:translate-x-1 transition-all duration-300">
               <span className="text-2xl font-light">→</span>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black text-red-500/60 dark:text-red-400/60 uppercase tracking-[0.2em] mb-1 color-transition">
              Strefa Zagrożenia
            </p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter color-transition">
              Usuń Konto
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Trwałe usunięcie wszystkich danych z bazy systemu.
            </p>
          </div>
        </div>

        <div className={`
          absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full 
          transition-all duration-700 bg-gradient-to-r ${gradientClasses}
        `} />
      </div>

      <ModalFlow
        flow={DeleteAccountFlow}
        hook={flow}
        onSubmit={handleSubmit}
      />
    </>
  );
}