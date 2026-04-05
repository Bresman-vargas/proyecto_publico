import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProtectedPage from "./pages/ProtectedPage";

interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
  private?: boolean;    // Solo si está logueado
  restricted?: boolean; // Solo si NO está logueado (Login/Register)
}

export const routes: RouteConfig[] = [
  { path: "/home", component: Home, exact: true },
  { path: "/register", component: Register, exact: true, restricted: true },
  { path: "/login", component: Login, exact: true, restricted: true },
  { path: "/prote", component: ProtectedPage, exact: true, private: true }
];
