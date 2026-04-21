import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forums from "./pages/forums/Forums";
import Home from "./pages/Home";


import { lazy } from "react";
import Discussions from "./pages/discussions/Discussions";
import DiscussionForm from "./pages/discussions/DiscussionForm";
import Prueba from "./pages/forums/Prueba";
import Explore from "./pages/Explore";
import Comments from "./pages/comments/Comments";
import Settings from "./pages/Settings";
import Poll from "./pages/Poll";

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
  { path: "/explore", component: Explore, private: true },

  { path: "/discussions", component: Discussions, private: true },
  { path: "/discussions/new", component: DiscussionForm, private: true },
  { path: "/discussions/edit/:id", component: DiscussionForm, private: true },

  { path: "/comments", component: Comments, private: true },
  { path: "/settings", component: Settings, private: true },

  { path: "/forums", component: Forums, private: true },
  { path: "/papu", component: Prueba, private: true },

  { path: "/poll", component: Poll, private: true },

  { path: "/not-found", component: lazy(() => import("./pages/NotFound")) },
];
