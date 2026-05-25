import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "../App/App.jsx";
import { UserProvider } from "../Contexts/UserContext.jsx";
import axios from "axios";
import "../i18n.js"; // Initialize i18n

axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);