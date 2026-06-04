<<<<<<< HEAD
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

const DEV_MODE = false; // Cambiar a false en producción

const MOCK_USER = {
  id: "dev-user-123",
  username: "Developer_Harco",
  email: "dev@harco.com",
  role: "admin",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(DEV_MODE ? MOCK_USER : null);
  const [errors, setErrors] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    DEV_MODE ? true : false,
  );
  const [loading, setLoading] = useState(DEV_MODE ? false : true);

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
    setLoading(true);
    try {
      const res = await registerRequest(data);
      setUser(res.data);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error al registrar";
      setErrors(Array.isArray(errorMsg) ? errorMsg : [errorMsg]);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const login = async (data) => {
    setLoading(true);
    try {
      const res = await loginRequest(data);
      setUser(res.data);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Error al iniciar sesión";
      setErrors(Array.isArray(errorMsg) ? errorMsg : [errorMsg]);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (!DEV_MODE) {
        await logoutRequest();
      }
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log("Error al cerrar sesión");
    }
  };

  useEffect(() => {
    if (DEV_MODE) {
      return;
    }
    const checkLogin = async () => {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
        return;
      }

      try {
        const res = await verifyTokenRequest();
        if (!res.data) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
          setUser(res.data);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
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
        loading,
        devMode: DEV_MODE,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
=======
import {
  useCallback,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
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

const DEV_MODE = true; // Cambiar a false en producción

const MOCK_USER = {
  id: "dev-user-123",
  username: "Developer_Harco",
  email: "dev@harco.com",
  role: "admin",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(DEV_MODE ? MOCK_USER : null);
  const [errors, setErrors] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    DEV_MODE ? true : false,
  );
  const [loading, setLoading] = useState(DEV_MODE ? false : true);

  useEffect(() => {
    if (errors.length > 0) {
      const time = setTimeout(() => {
        setErrors([]);
      }, 5000);

      return () => clearTimeout(time);
    }
  }, [errors]);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const registar = async (data) => {
    setLoading(true);
    try {
      const res = await registerRequest(data);
      setUser(res.data);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      setErrors(Array.isArray(errorMsg) ? errorMsg : [errorMsg]);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const login = async (data) => {
    setLoading(true);
    try {
      const res = await loginRequest(data);
      setUser(res.data);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      setErrors(Array.isArray(errorMsg) ? errorMsg : [errorMsg]);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (!DEV_MODE) {
        await logoutRequest();
      }
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log("Error al cerrar sesión");
    }
  };

  useEffect(() => {
    if (DEV_MODE) {
      return;
    }
    const checkLogin = async () => {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
        return;
      }

      try {
        const res = await verifyTokenRequest();
        if (!res.data) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
          setUser(res.data);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
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
        loading,
        devMode: DEV_MODE,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
>>>>>>> main
