import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import DashboardPage from "../pages/DashboardPage";
import AuthPage from "../pages/AuthPage";
import DocumentsPage from "../pages/DocumentsPage";
import ContactPage from "../pages/ContactPage";
import HelpPage from "../pages/HelpPage";
import ProfilePage from "../pages/ProfilePage";

import { UserProvider } from "../Contexts/UserContext";
import ProtectedRoute from "../Utils/ProtectedRoutes";
import PublicRoute from "../Utils/PublicRoutes";

import Layout from "../components/Layout/Layout";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>

          <Route
            path="/auth"
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            }
          />

          {/* 🔥 TU JEST KLUCZ */}
          <Route element={<Layout />}>

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/help" element={<HelpPage />} />

          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />

        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;