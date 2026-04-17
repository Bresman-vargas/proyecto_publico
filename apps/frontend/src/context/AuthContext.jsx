import { createContext, useContext, useState, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  logoutRequest,
} from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Debe estar dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (errors.length > 0) {
      const time = setTimeout(() => {
        setErrors([]);
      }, 5000);

      return () => clearTimeout(time);
    }
  }, [errors]);

  const clearErrors = () => {
    setErrors([]);
  };

  const registar = async (data) => {
    try {
      const res = await registerRequest(data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      const errorMsg = error.response.data.message;
      setErrors(Array.isArray(errorMsg) ? errorMsg : [errorMsg]);
    }
  };

  const login = async (data) => {
    try {
      const res = await loginRequest(data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      const errorMsg = error.response.data.message;
      setErrors(Array.isArray(errorMsg) ? errorMsg : [errorMsg]);
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log("Error al cerrar sesión");
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await verifyTokenRequest();

        if (!res.data) {
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        registar,
        login,
        logout,
        clearErrors,
        errors,
        isAuthenticated,
        user,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
