import { useModalFlow } from "../../../Hooks/useModalFlow";
import ResetPasswordFlow from "./ResetPasswordFlow";
import ModalFlow from "../../Global/Modals/ModalFlow";
import ICON_MAP from "../../../Utils/Maps/Icons";
import { ACCENT_MAP } from "../../../Utils/Maps/Accents";
import axios from "axios";

export default function ResetPasswordCard() {
    const EnvelopeIcon = ICON_MAP["contact"];
    const flow = useModalFlow(ResetPasswordFlow);

    const gradientClasses = ACCENT_MAP["indigo"] || "from-indigo-700 to-indigo-500";

    const handleSubmit = async (data) => {
        try {
            const res = await axios.post("http://localhost:5000/reset-password", {
                email: data.email,
            });

            if (res.data?.success) return { success: true };

            return {
                success: false,
                message: res.data?.message || "Błąd wysyłki",
            };
        } catch (err) {
            return {
                success: false,
                message: "Błąd serwera",
            };
        }
    };

    return (
        <>
            <div
                onClick={() => flow.setOpen(true)}
            >
                <p className="hover:underline uppercase cursor-pointer text-[15px] font-gray-600 text-slate-900 dark:text-white tracking-tighter">
                    Nie pamiętam hasła
                </p>

                <div className={`
          absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full 
          transition-all duration-700 bg-gradient-to-r ${gradientClasses}
        `} />
            </div>

            <ModalFlow
                flow={ResetPasswordFlow}
                hook={flow}
                onSubmit={handleSubmit}
            />
        </>
    );
}