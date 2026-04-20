import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forums from "./pages/forums/Forums";
import Home from "./pages/Home";

import Feed from "./pages/Feed";
import Trending from "./pages/Trending";
import { lazy } from "react";
import Discussions from "./pages/discussions/Discussions";
import DiscussionForm from "./pages/discussions/DiscussionForm";
import Prueba from "./pages/Prueba";

interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  private?: boolean; // Solo si está logueado
  restricted?: boolean; // Solo si NO está logueado (Login/Register)
}

export const routes: RouteConfig[] = [
  { path: "/home", component: Home },
  { path: "/login", component: Login, restricted: true },
  { path: "/register", component: Register, restricted: true },

  // --- RUTAS PROTEGIDAS ---
  { path: "/feed", component: Feed, private: true },
  { path: "/forums", component: Forums, private: true },
  { path: "/discussions", component: Discussions, private: true },
  { path: "/discussions-form", component: DiscussionForm, private: true },
  { path: "/trending", component: Trending, private: true },
  { path: "/papu", component: Prueba, private: true },

  { path: "/not-found", component: lazy(() => import("./pages/NotFound")) },
];
