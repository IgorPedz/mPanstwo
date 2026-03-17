import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import AuthPage from "../pages/AuthPage";
import DocumentsPage from "../pages/DocumentsPage";
import ContactPage from "../pages/ContactPage";
import HelpPage from "../pages/HelpPage";
import { UserProvider } from "../Contexts/UserContext";
import ProtectedRoute from "../Utils/ProtectedRoutes"
function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;