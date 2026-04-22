import { Outlet, useLocation } from "react-router-dom";
import Nav from "../Nav/Nav";
import { useUser } from "../../Contexts/UserContext";
import { AnimatePresence, motion } from "framer-motion";

export default function Layout() {
  const { user } = useUser();
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden">

      {user?.id && <Nav />}

      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

    </div>
  );
}