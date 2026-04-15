import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home'

import NotFound from './pages/NotFound';
import Prote from './pages/Prote';
import Prueba from './pages/Prueba';

interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  private?: boolean;    // Solo si está logueado
  restricted?: boolean; // Solo si NO está logueado (Login/Register)
}

export const routes: RouteConfig[] = [
  { path: "/home", component: Home},
  { path: "/login", component: Login, restricted: true},
  { path: "/register", component: Register, restricted: true},

  // --- RUTAS PROTEGIDAS ---
  { path: "/prote", component: Prote, private: true},
  { path: "/prueba", component: Prueba, private: true},
  { path: "/not-found", component: NotFound}
];