import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import AuthPage from "../pages/AuthPage";
import { UserProvider, useUser } from "../Contexts/UserContext";
import ProtectedRoute from "../Utils/ProtectedRoutes"
function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Auth */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Domyślnie */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;