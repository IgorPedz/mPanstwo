import { Outlet } from "react-router-dom";
import Nav from "../Nav/Nav";
import { useUser } from "../../Contexts/UserContext";

export default function Layout() {
    const { user } = useUser();
    
    return (
        <div className="flex h-screen">
            {user?.id && <Nav />}

            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>

        </div>
    );
}