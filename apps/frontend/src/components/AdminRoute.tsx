import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

export const AdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (user?.rol !== "admin") {
    return <Navigate to="/explore" replace />;
  }

  return <Outlet />;
};