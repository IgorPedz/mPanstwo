import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const savedUser = localStorage.getItem("mpanstwo-user");
    if (savedUser) setUser(JSON.parse(savedUser));
    else setUser(null);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("mpanstwo-user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mpanstwo-user");
    window.location.href = "/auth";
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);