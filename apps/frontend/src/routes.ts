import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forums from "./pages/forums/Forums";
import Home from "./pages/Home";
import ForumDetail from "./pages/forums/ForumDetails";

import { lazy } from "react";
import Discussions from "./pages/discussions/Discussions";
import DiscussionForm from "./pages/discussions/DiscussionForm";
import newForum from "./pages/forums/newForum";
import Explore from "./pages/Explore";
import UserComments from "./pages/comments/UserComments";
import Settings from "./pages/Settings";
import Surveys from "./pages/surveys/Surveys";
import SurveyForm from "./pages/surveys/SurveyForm";
import Comments from "./pages/comments/Comments";

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

  { path: "/user-comments", component: UserComments, private: true },
  { path: "/comments/:id", component: Comments, private: true },
  
  { path: "/surveys", component: Surveys, private: true },
  { path: "/surveys/new", component: SurveyForm, private:true},
  { path: "/surveys/edit/:id", component: SurveyForm, private: true },
  
  { path: "/forums", component: Forums, private: true },
  { path: "/forum", component: ForumDetail, private: true },
  { path: "/newforum", component: newForum, private: true },
  { path: "/forums/:id", component: ForumDetail, private: true },
  
  { path: "/settings", component: Settings, private: true },

  { path: "/not-found", component: lazy(() => import("./pages/NotFound")) }
];


