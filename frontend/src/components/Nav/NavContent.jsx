import Logo from "../Global/Logo";
import NavSections from "./NavSections";
import NavFooter from "./NavFooter";

export default function SidebarContent({
  NavData,
  openSection,
  toggleSection,
  location,
  navigate,
}) {
  return (
    <>
      {/* LOGO */}
      <div className="p-4">
        <Logo />
      </div>

      {/* NAVIGATION */}
      <nav
        className="
          flex-1 min-h-0 overflow-y-auto
          px-4 mt-6 space-y-2
          custom-scrollbar
        "
      >
        <NavSections
          NavData={NavData}
          openSection={openSection}
          toggleSection={toggleSection}
          location={location}
          navigate={navigate}
        />
      </nav>

      {/* FOOTER */}
      <NavFooter />
    </>
  );
}