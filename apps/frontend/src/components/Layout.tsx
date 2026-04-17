import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth()
  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header className="flex items-center justify-between px-5">
          {user ? (
            <p className="font-bold">¡Hola de nuevo <span className="capitalize">{user.nombre || 'user'}</span>! 👋</p>
          ) :  (
            <p className="font-bold">¡Hola de nuevo DEV! 👋</p>
          )}

          {user && (
            <button
              onClick={async () => await logout()}
              className="bg-bg-sec text-accent px-4 py-1 rounded-md border border-border hover:bg-accent hover:text-bg transition-colors"
            >
              
              Logout
            </button>
          )}
        </Header>
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
