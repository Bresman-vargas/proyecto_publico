import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Forums from './pages/forums/Forums';
import Home from './pages/Home'

import NotFound from './pages/NotFound';
import Feed from './pages/Feed';
import Trending from './pages/Trending';

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
  { path: "/feed", component: Feed},
  { path: "/forums", component: Forums},
  { path: "/trending", component: Trending},

  { path: "/not-found", component: NotFound}
];