import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import DashboardPage from "../pages/DashboardPage";
import AuthPage from "../pages/AuthPage";
import DocumentsPage from "../pages/DocumentsPage";
import ContactPage from "../pages/ContactPage";
import HelpPage from "../pages/HelpPage";

import { UserProvider } from "../Contexts/UserContext";
import ProtectedRoute from "../Utils/ProtectedRoutes";

import Layout from "../components/Layout/Layout";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>

          {/* AUTH */}
          <Route path="/auth" element={<AuthPage />} />

          {/* 🧱 LAYOUT WRAPPER (UI dla wszystkich stron) */}
          <Route element={<Layout />}>

            {/* 🔐 tylko dashboard wymaga loginu */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            {/* 🌍 public + logged w layout */}
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/help" element={<HelpPage />} />

          </Route>

          {/* fallback */}
          <Route path="*" element={<Navigate to="/dashboard" />} />

        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;