  import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
  import { routes } from "./routes";
  import { AuthProvider, useAuth } from "./context/AuthContext";

  function App() {
    return (
      <AuthProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthProvider>
    );
  }

  function AppRouter() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg">
        <div className="animate-spin size-12 border-4 border-accent"></div>
      </div>
    );
  }

    return (
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.private && !isAuthenticated ? (
                <Navigate to="/login" replace />
              ) : route.restricted && isAuthenticated ? (
                <Navigate to="/feed" replace />
              ) : (
                <route.component />
              )
            }
          />
        ))}

        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    );
  }

export default App;
