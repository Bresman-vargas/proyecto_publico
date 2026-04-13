import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home'

import NotFound from './pages/NotFound';
import Prote from './pages/Prote';

interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
  private?: boolean;    // Solo si está logueado
  restricted?: boolean; // Solo si NO está logueado (Login/Register)
}

export const routes: RouteConfig[] = [
  { path: "/home", component: Home, exact: true },
  { path: "/login", component: Login,  exact: true, restricted: true},
  { path: "/register", component: Register, exact: true, restricted: true},
  { path: "/prote", component: Prote, exact: true, private: true},
  { path: "/not-found", component: NotFound, exact: true}
];