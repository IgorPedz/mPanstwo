import { Outlet, useLocation } from "react-router-dom";
import Nav from "../Nav/Nav";
import { useUser } from "../../Contexts/UserContext";
import PageWrapper from "../../Utils/PageWrapper";

export default function Layout() {
  const { user } = useUser();
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden">
      {user?.id && <Nav />}

      <main className="flex-1 h-full overflow-hidden relative">
        <PageWrapper key={location.pathname}>
          <div className="h-full overflow-y-auto">
            <Outlet />
          </div>
        </PageWrapper>
      </main>
    </div>
  );
}