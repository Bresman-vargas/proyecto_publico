import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

export const AdminRoute = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <Loader />;

  if (!isAuthenticated || user?.rol !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};