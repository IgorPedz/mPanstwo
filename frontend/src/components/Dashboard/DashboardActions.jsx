import ICON_MAP from "../../Utils/Icons";

export default function DashboardActions({ saveLayout, loadSavedLayout }) {
    const SaveIcon = ICON_MAP["check"] || CheckIcon;
    const CancelIcon = ICON_MAP["cancel"] || ArrowUturnLeftIcon;

    return (
        <div className="mt-6 flex justify-center gap-4 px-2">
            <button
                onClick={saveLayout}
                className="cursor-pointer flex items-center gap-2 rounded-full bg-blue-600 p-3 text-white hover:bg-blue-700 hover:-translate-y-1"
            >
                Zapisz
                <SaveIcon className="h-5 w-5" />
            </button>

            <button
                onClick={loadSavedLayout}
                className="cursor-pointer flex items-center gap-2 rounded-full border border-blue-600 text-blue-600 p-3 hover:bg-blue-800 hover:text-white hover:-translate-y-1"
            >
                Anuluj
                <CancelIcon className="h-5 w-5" />
            </button>
        </div>
    );
}