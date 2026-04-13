import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

//verificamos que se pueda usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Debe estar dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children}) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const registar = async (data) => {
    try {
      const res = await registerRequest(data);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (data) => {
    try {
      const res = await loginRequest(data);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ registar, login, logout, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};