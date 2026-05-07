import Logo from "../Global/Logo";
import NavSections from "./NavSections";
import Settings from "../Global/Settings";
import LogOut from "../Global/LogOut";

export default function SidebarContent({ NavData, openSections, toggleSection, location, navigate }) {
  return (
    <>
      <div className="p-4">
        <Logo />
      </div>

      <nav className="flex-1 min-h-0 overflow-y-auto px-4 mt-6 space-y-2 custom-scrollbar">
        <NavSections
          NavData={NavData}
          openSections={openSections}
          toggleSection={toggleSection}
          location={location}
          navigate={navigate}
        />
      </nav>

      <div className="p-4 mt-auto border-t-2 border-slate-50 dark:border-slate-900 space-y-2 color-transition bg-slate-50/50 dark:bg-slate-900/20">
        <Settings />
        <LogOut />
      </div>
    </>
  );
}