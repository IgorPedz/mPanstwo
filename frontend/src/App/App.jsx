import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/MainPages/DashboardPage";
import AuthPage from "../pages/AuthPages/AuthPage";
import DocumentsPage from "../pages/InfoPages/DocumentsPage";
import ContactPage from "../pages/InfoPages/ContactPage";
import FAQPage from "../pages/InfoPages/FAQPage";
import ProfilePage from "../pages/ProfilPages/ProfilePage";

import { UserProvider } from "../Contexts/UserContext";
import ProtectedRoute from "../Utils/Routes/ProtectedRoutes";
import PublicRoute from "../Utils/Routes/PublicRoutes";

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
            <Route path="/faq" element={<FAQPage />} />

          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />

        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;