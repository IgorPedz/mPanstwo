import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import AuthPage from "../pages/AuthPage";
import { UserProvider } from "../Contexts/UserContext";
import ProtectedRoute from "../Utils/ProtectedRoutes"
function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />

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