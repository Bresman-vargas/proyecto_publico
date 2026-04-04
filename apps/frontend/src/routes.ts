import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
}

export const routes: RouteConfig[] = [
  { path: "/home", component: Home, exact: true },
  { path: "/register", component: Register, exact: true },
  { path: "/login", component: Login, exact: true}
];
