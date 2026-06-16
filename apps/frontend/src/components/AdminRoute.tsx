import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

export const AdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  // Recuerda verificar si tu backend/JWT devuelve 'rol' o 'role'
  if (user?.rol !== "admin") {
    return <Navigate to="/explore" replace />; // Lo echa a explore si no es admin
  }

  return <Outlet />;
};