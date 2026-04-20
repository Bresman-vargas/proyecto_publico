import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import { Link, Outlet } from "react-router-dom";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { useState } from "react";

export default function Layout() {
  const { user, logout } = useAuth();
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="sticky top-0 h-screen overflow-y-auto z-60">
        <Sidebar expanded={expanded} setExpanded={setExpanded} />
      </aside>
      <div className="flex-1 flex flex-col">
        <Header className="sticky top-0 flex items-center justify-between px-5">
          <div
            className="flex items-center gap-4 w-full"
          >
            <button
              onClick={() => setExpanded(!expanded)}
              className="lg:hidden p-2 bg-bg-sec rounded-md border border-border"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
            {user ? (
              <p className="font-bold hidden md:block">
                ¡Hola de nuevo{" "}
                <span className="capitalize">{user.nombre || "user"}</span>! 👋
              </p>
            ) : (
              <p className="font-bold">¡Hola de nuevo DEV! 👋</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Link
              className="bg-bg-sec text-accent px-4 py-1 rounded-md border border-border hover:bg-accent hover:text-bg cursor-pointer "
              to="/home"
            >
              Home
            </Link>
            {user && (
              <button
                onClick={async () => await logout()}
                className="bg-bg-sec text-accent px-4 py-1 rounded-md border border-border hover:bg-accent hover:text-bg cursor-pointer "
              >
                Logout
              </button>
            )}
          </div>
        </Header>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
