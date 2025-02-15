import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem("token");
      setIsAuthenticated(Boolean(token));
      console.log("Auth Status:", { token, isAuthenticated: Boolean(token) });
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsAuthenticated(false);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();

    const handleAuthChange = () => checkAuthStatus();
    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  const login = (token) => {
    if (!token) {
      console.error("No token provided");
      return;
    }
    try {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      window.dispatchEvent(new Event("auth-change"));
      toast.success("Successfully logged in!");
    } catch (error) {
      console.error("Error during login:", error);
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      toast.error("Login failed");
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      window.dispatchEvent(new Event("auth-change"));
      toast.success("Successfully logged out!");
    } catch (error) {
      console.error("Error during logout:", error);
      setIsAuthenticated(false);
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        login,
        logout,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
